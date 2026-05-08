<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from "firebase/auth"
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore"

const router = useRouter()
const isLoggedIn = ref(false)
const userUid = ref('')
const isLoading = ref(false)
const showSuccessModal = ref(false) 

// 1. DANH SÁCH CÔNG VIỆC ĐÃ CẬP NHẬT GIÁ MỚI VÀ THÊM MSB
const jobOptions = [
  { id: 'referral-program', name: 'GIỚI THIỆU BẠN BÈ (300K)', reward: 300000 },
  { id: 'app-chung-khoan', name: 'APP CHỨNG KHOÁN (125K)', reward: 125000 },
  { id: 'vpbank', name: 'ĐĂNG KÝ APP VPBANK (100K)', reward: 100000 },
  { id: 'tpbank', name: 'ĐĂNG KÝ APP TPBANK (100K)', reward: 100000 },
  { id: 'msb-bank', name: 'ĐĂNG KÝ APP MSB (100K)', reward: 100000 }, // THÊM MSB VÀO ĐÂY NÀY
  { id: 'luot-xem-threads', name: 'CÀY VIEW THREADS (50K)', reward: 50000 },
  { id: 'dang-bai-threads', name: 'ĐĂNG BÀI THREADS (25K)', reward: 25000 },
  { id: 'google-map', name: 'ĐÁNH GIÁ GOOGLE MAP (25K)', reward: 25000 },
  { id: 'join-zalo', name: 'THAM GIA NHÓM ZALO (10K)', reward: 10000 }
]

// FORM DATA
const selectedJob = ref(jobOptions[0]) 
const fullName = ref('') 
const phoneNumber = ref('') 
const images = ref<string[]>([]) 
const fileInput = ref<HTMLInputElement | null>(null)

// --- KIỂM TRA XEM CÓ PHẢI KÈO ÉP INBOX FANPAGE KHÔNG (THÊM MSB VÀO ĐÂY LUN) ---
const isFanpageTask = computed(() => ['vpbank', 'tpbank', 'msb-bank', 'app-chung-khoan', 'referral-program'].includes(selectedJob.value.id))

// --- LOGIC TỰ ĐỘNG HIỂN THỊ YÊU CẦU ẢNH THEO TỪNG JOB ---
const imageRequirementText = computed(() => {
  const jobId = selectedJob.value.id;
  if (jobId === 'referral-program') {
    return "YÊU CẦU 4 ẢNH (2 ẢNH NHẬP MÃ + 2 ẢNH ĐĂNG NHẬP)";
  } else if (jobId === 'app-chung-khoan' || jobId === 'vpbank' || jobId === 'tpbank' || jobId === 'msb-bank') {
    return "YÊU CẦU ÍT NHẤT 2 ẢNH (ẢNH NHẬP MÃ + ẢNH ĐĂNG NHẬP)";
  }
  return "TẢI LÊN ẢNH CHỤP MÀN HÌNH BẰNG CHỨNG";
})

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      userUid.value = user.uid
    } else {
      router.push('/login')
    }
  })
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

// THUẬT TOÁN NÉN ẢNH
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 600
        const scaleSize = MAX_WIDTH / img.width
        canvas.width = MAX_WIDTH
        canvas.height = img.height * scaleSize
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6)
        resolve(compressedBase64)
      }
    }
  })
}

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return
  const files = Array.from(target.files)
  
  if (images.value.length + files.length > 5) {
    alert('⚠️ CHỈ ĐƯỢC UPLOAD TỐI ĐA 5 ẢNH!')
    return
  }

  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    const compressedImage = await compressImage(file)
    images.value.push(compressedImage)
  }
  target.value = ''
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
}

// LOGIC GỬI ĐƠN VÀ CHẶN BÀO TIỀN
const submitReport = async () => {
  if (!fullName.value || !phoneNumber.value || images.value.length === 0) {
    alert('⚠️ VUI LÒNG NHẬP ĐỦ THÔNG TIN VÀ TẢI ẢNH XÁC THỰC!')
    return
  }

  // --- LOGIC CHẶN CỨNG SỐ LƯỢNG ẢNH ĐÂY NHÉ ĐẠI CA ---
  if (selectedJob.value.id === 'referral-program' && images.value.length < 4) {
    alert('⚠️ BẠN CẦN TẢI LÊN ĐỦ 4 ẢNH CHO NHIỆM VỤ GIỚI THIỆU BẠN BÈ!');
    return;
  }

  const twoImageJobs = ['app-chung-khoan', 'vpbank', 'tpbank', 'msb-bank'];
  if (twoImageJobs.includes(selectedJob.value.id) && images.value.length < 2) {
    alert(`⚠️ NHIỆM VỤ ${selectedJob.value.name.split(' (')[0]} BẮT BUỘC PHẢI TẢI LÊN ÍT NHẤT 2 ẢNH!`);
    return;
  }

  isLoading.value = true
  try {
    const qSpam = query(
      collection(db, "reports"),
      where("uid", "==", userUid.value),
      where("status", "==", "pending")
    )
    const snapshotSpam = await getDocs(qSpam)
    if (snapshotSpam.docs.length >= 3) {
      alert("⚠️ HỆ THỐNG TẠM KHÓA: Bạn đang có 3 đơn chờ duyệt. Vui lòng chờ Admin xử lý trước khi gửi thêm!")
      isLoading.value = false
      return 
    }

    const oneTimeJobs = ['google-map', 'dang-bai-threads', 'luot-xem-threads', 'join-zalo']
    
    if (oneTimeJobs.includes(selectedJob.value.id)) {
      const qJob = query(
        collection(db, "reports"),
        where("uid", "==", userUid.value)
      )
      const snapshotJob = await getDocs(qJob)
      
      const alreadyDone = snapshotJob.docs.some(doc => {
        const data = doc.data()
        const isMatch = data.jobId === selectedJob.value.id || 
                       (selectedJob.value.id === 'google-map' && (data.jobName === "ĐÁNH GIÁ GOOGLE MAP (15K)" || data.jobName === "Đánh giá Google Map (25K)"))
        return isMatch && (data.status === 'approved' || data.status === 'pending')
      })

      if (alreadyDone) {
        alert(`⚠️ ĐÃ ĐẠT GIỚI HẠN: Công việc "${selectedJob.value.name.split(' (')[0]}" mỗi tài khoản chỉ được nhận thưởng 1 lần duy nhất!`)
        isLoading.value = false
        return
      }
    }

    await addDoc(collection(db, "reports"), {
      uid: userUid.value,
      jobId: selectedJob.value.id,
      jobName: selectedJob.value.name,
      reward: selectedJob.value.reward,
      fullName: fullName.value.toUpperCase(),
      phoneRef: phoneNumber.value,
      images: images.value,
      status: 'pending',
      createdAt: serverTimestamp()
    })

    showSuccessModal.value = true
  } catch (error: any) {
    alert('❌ LỖI HỆ THỐNG: ' + error.message)
  } finally {
    isLoading.value = false
  }
}

const closeAndGoHome = () => {
  showSuccessModal.value = false
  router.push('/')
}

const openFanpage = () => {
  window.open('https://www.facebook.com/mmopro123/', '_blank')
  closeAndGoHome()
}
</script>

<template>
  <div class="min-h-screen bg-[#090e17] py-10 px-4 md:px-0 flex flex-col items-center font-black italic uppercase relative">
    
    <div class="w-full max-w-xl relative animate-in fade-in slide-in-from-bottom-4 duration-700">
      <!-- NÚT TRỞ LẠI -->
      <button @click="router.back()" class="text-slate-500 hover:text-white flex items-center gap-2 text-[10px] tracking-[3px] transition-colors mb-8">
        <span class="font-sans not-italic">✕</span> TRỞ LẠI
      </button>

      <h1 class="text-4xl md:text-6xl text-white tracking-tighter leading-none mb-10 drop-shadow-xl">
        NỘP <span class="text-blue-500">BẰNG CHỨNG</span>
      </h1>

      <div class="space-y-5 bg-[#111726]/50 p-6 md:p-10 rounded-[30px] border border-slate-800/50 shadow-2xl">
        
        <!-- CHỌN CÔNG VIỆC -->
        <div class="space-y-2 text-left">
          <label class="text-blue-500 text-[10px] tracking-[2px] ml-1 opacity-70">CÔNG VIỆC HOÀN THÀNH</label>
          <div class="relative">
            <select v-model="selectedJob" class="w-full bg-[#0d121f] border border-slate-800 focus:border-blue-500 rounded-[20px] py-4 px-6 text-white outline-none appearance-none cursor-pointer text-sm">
              <option v-for="job in jobOptions" :key="job.id" :value="job">{{ job.name }}</option>
            </select>
            <span class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs font-sans not-italic">⌄</span>
          </div>
        </div>

        <!-- NHẬP HỌ TÊN -->
        <div class="space-y-2 text-left">
          <label class="text-blue-500 text-[10px] tracking-[2px] ml-1 opacity-70">HỌ VÀ TÊN XÁC THỰC</label>
          <input 
            v-model="fullName" 
            type="text" 
            placeholder="NHẬP HỌ TÊN CHÍNH XÁC CỦA BẠN..." 
            class="w-full bg-[#0d121f] border border-slate-800 focus:border-blue-500 rounded-[20px] py-4 px-6 text-white outline-none placeholder:text-slate-700 placeholder:normal-case shadow-inner text-sm"
          />
        </div>

        <!-- NHẬP SĐT -->
        <div class="space-y-2 text-left">
          <label class="text-blue-500 text-[10px] tracking-[2px] ml-1 opacity-70">SĐT ĐỐI SOÁT</label>
          <input 
            v-model="phoneNumber" 
            type="text" 
            placeholder="SỐ ĐIỆN THOẠI LÀM VIỆC..." 
            class="w-full bg-[#0d121f] border border-slate-800 focus:border-blue-500 rounded-[20px] py-4 px-6 text-white outline-none placeholder:text-slate-700 placeholder:normal-case shadow-inner text-sm"
          />
        </div>

        <!-- UPLOAD HÌNH ẢNH -->
        <div class="space-y-2 text-left mt-2">
          <label class="text-blue-500 text-[10px] tracking-[2px] ml-1 opacity-70">HÌNH ẢNH XÁC THỰC</label>
          <div 
            @click="triggerFileInput"
            class="w-full border-2 border-dashed border-slate-700/60 hover:border-blue-500/50 bg-[#0d121f]/30 rounded-[30px] py-12 px-6 flex flex-col items-center justify-center cursor-pointer transition-all group"
          >
            <div class="text-4xl group-hover:scale-110 transition-transform mb-3">📸</div>
            <!-- CẬP NHẬT CHỮ HIỂN THỊ DỰA THEO CÔNG VIỆC -->
            <p :class="[
                 'text-[10px] tracking-[2px] transition-colors uppercase text-center',
                 ['referral-program', 'app-chung-khoan', 'vpbank', 'tpbank', 'msb-bank'].includes(selectedJob.id) 
                   ? 'text-rose-400 font-black' 
                   : 'text-slate-500 group-hover:text-white'
               ]">
              {{ imageRequirementText }}
            </p>
          </div>
          <input type="file" ref="fileInput" @change="handleFileUpload" multiple accept="image/*" class="hidden" />

          <!-- Preview ảnh -->
          <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div v-for="(img, index) in images" :key="index" class="relative group rounded-[18px] overflow-hidden border border-slate-800 bg-[#0d121f] aspect-square">
              <img :src="img" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <button @click.stop="removeImage(index)" class="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-[10px] font-sans not-italic z-10">✕</button>
            </div>
          </div>
        </div>

        <!-- NÚT GỬI -->
        <button 
          @click="submitReport" 
          :disabled="isLoading" 
          class="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[20px] text-xl font-black italic shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          {{ isLoading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN GỬI ĐƠN' }}
        </button>

      </div>
    </div>

    <!-- MODAL POPUP CHÚC MỪNG -->
    <Transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 backdrop-blur-md">
        <div class="absolute inset-0 bg-black/80"></div>
        <div class="relative bg-[#111726] border border-blue-500/30 w-full max-w-sm rounded-[40px] p-8 text-center shadow-[0_0_50px_rgba(37,99,235,0.2)] animate-in zoom-in duration-300">
          <div class="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span class="text-4xl">✅</span>
          </div>
          <h2 class="text-2xl text-white font-black italic tracking-tighter mb-2 uppercase">Gửi đơn thành công!</h2>
          
          <!-- NẾU LÀ CÁC KÈO TO (APP/NGÂN HÀNG/GIỚI THIỆU) -> BẮT IB FANPAGE -->
          <div v-if="isFanpageTask">
            <p class="text-slate-400 text-[10px] normal-case font-bold leading-relaxed mb-6 italic">
              Bằng chứng đã được ghi nhận vào hệ thống.<br/>
              Đối với chiến dịch này, vui lòng <span class="text-[#1877F2] font-black">Nhắn tin Fanpage</span> để Admin đối soát và duyệt đơn ngay cho bạn nhé!
            </p>
            <button 
              @click="openFanpage"
              class="w-full bg-[#1877F2] flex items-center justify-center gap-2 text-white py-4 rounded-2xl text-sm font-black uppercase tracking-[2px] hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-900/40 mb-3"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              NHẮN TIN FANPAGE
            </button>
            <button 
              @click="closeAndGoHome"
              class="w-full bg-transparent text-slate-500 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[2px] hover:text-white transition-all"
            >
              ĐỂ SAU
            </button>
          </div>

          <!-- NẾU LÀ CÁC CÔNG VIỆC KHÁC -> CHỜ 1 TIẾNG NHƯ CŨ -->
          <div v-else>
            <p class="text-slate-400 text-[10px] normal-case font-bold leading-relaxed mb-8 italic">
              Hệ thống đã nhận được bằng chứng của bạn.<br/>
              Vui lòng đợi khoảng <span class="text-blue-500 font-black">1 giờ</span> để Admin xét duyệt và cộng tiền vào ví tài khoản.
            </p>
            <button 
              @click="closeAndGoHome"
              class="w-full bg-blue-600 text-white py-4 rounded-2xl text-sm font-black uppercase tracking-[2px] hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/40"
            >
              ĐÃ HIỂU
            </button>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

select {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 0.8rem;
}
</style>