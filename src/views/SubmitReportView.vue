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

// 1. DANH SÁCH CÔNG VIỆC CHUẨN "MÂY FREELANCE"
const jobOptions = [
  { id: 'katinat-threads', name: 'KATINAT x THREADS (50K)', reward: 50000 },
  { id: 'google-map-katinat', name: 'MAP x KATINAT (30K)', reward: 30000 },
  { id: 'share-fanpage-cosmetics', name: 'TƯƠNG TÁC PAGE MỸ PHẨM (30K)', reward: 30000 },
  { id: 'write-content', name: 'VIẾT BLOG/CONTENT (50K)', reward: 50000 },
  { id: 'edit-video', name: 'EDIT VIDEO CAPCUT (80K)', reward: 80000 },
  { id: 'product-review', name: 'REVIEWER MỸ PHẨM (60K)', reward: 60000 },
  { id: 'app-chung-khoan', name: 'TRẢI NGHIỆM CHỨNG KHOÁN (125K)', reward: 125000 },
  { id: 'vpbank', name: 'MỞ VÍ LADY VPBANK (100K)', reward: 100000 },
  { id: 'tpbank', name: 'AMBASSADOR TPBANK (100K)', reward: 100000 },
  { id: 'msb-bank', name: 'CỘNG TÁC VIÊN MSB (100K)', reward: 100000 }
]

// FORM DATA
const selectedJob = ref(jobOptions[0]) 
const fullName = ref('') 
const phoneNumber = ref('') 
const images = ref<string[]>([]) 
const fileInput = ref<HTMLInputElement | null>(null)

// --- CHỈ GIỮ LẠI 1 KHAI BÁO BIẾN NÀY ---
const isFanpageTask = computed(() => [
  'vpbank', 
  'tpbank', 
  'msb-bank', 
  'app-chung-khoan', 
  'edit-video'
].includes(selectedJob.value.id))

// --- LOGIC YÊU CẦU ẢNH THEO TỪNG JOB ---
const imageRequirementText = computed(() => {
  const jobId = selectedJob.value.id;
  if (['app-chung-khoan', 'vpbank', 'tpbank', 'msb-bank'].includes(jobId)) {
    return "YÊU CẦU ÍT NHẤT 2 ẢNH (ẢNH NHẬP MÃ + ẢNH ĐĂNG NHẬP)";
  }
  return "TẢI LÊN ẢNH CHỤP MÀN HÌNH HOẶC THÀNH QUẢ NGHIỆM THU";
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
    alert('⚠️ NÀNG CHỈ ĐƯỢC TẢI LÊN TỐI ĐA 5 ẢNH THÔI NHÉ!')
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

// LOGIC GỬI ĐƠN VÀ KIỂM TRA GIỚI HẠN
const submitReport = async () => {
  if (!fullName.value || !phoneNumber.value || images.value.length === 0) {
    alert('⚠️ NÀNG VUI LÒNG ĐIỀN ĐỦ THÔNG TIN VÀ TẢI ẢNH NGHIỆM THU NHÉ!')
    return
  }

  const twoImageJobs = ['app-chung-khoan', 'vpbank', 'tpbank', 'msb-bank'];
  if (twoImageJobs.includes(selectedJob.value.id) && images.value.length < 2) {
    alert(`⚠️ JOB ${selectedJob.value.name.split(' (')[0]} BẮT BUỘC PHẢI CÓ ÍT NHẤT 2 ẢNH NÀNG NHA!`);
    return;
  }

  isLoading.value = true
  try {
    // 1. Kiểm tra đơn đang chờ (Chống spam)
    const qSpam = query(
      collection(db, "reports"),
      where("uid", "==", userUid.value),
      where("status", "==", "pending")
    )
    const snapshotSpam = await getDocs(qSpam)
    if (snapshotSpam.docs.length >= 3) {
      alert("⚠️ MÂY TẠM KHÓA: Nàng đang có 3 đơn chờ duyệt. Vui lòng chờ kế toán xử lý xong mới gửi tiếp được nha!")
      isLoading.value = false
      return 
    }

    // 2. Kiểm tra giới hạn từng Job
    const qCheckLimit = query(
      collection(db, "reports"),
      where("uid", "==", userUid.value),
      where("jobId", "==", selectedJob.value.id)
    )
    const snapshotLimit = await getDocs(qCheckLimit)
    const validReports = snapshotLimit.docs.filter(doc => doc.data().status !== 'rejected')
    const count = validReports.length

    // Danh sách job giới hạn 1 lần (1-6)
    const singleTimeJobs = ['katinat-threads', 'google-map-katinat', 'share-fanpage-cosmetics', 'write-content', 'edit-video', 'product-review']

    if (singleTimeJobs.includes(selectedJob.value.id)) {
      if (count >= 1) {
        alert(`⚠️ ĐÃ ĐẾN GIỚI HẠN: Job này mỗi tài khoản chỉ được nhận cát-xê 1 lần duy nhất nàng nha!`)
        isLoading.value = false
        return
      }
    } else {
      // Nhóm Bank/Chứng khoán giới hạn 3 lần
      if (count >= 3) {
        alert(`⚠️ ĐÃ ĐẠT TỐI ĐA: Job này nàng đã nộp đủ 3 lần rồi. Cảm ơn nàng nhiều nhé!`)
        isLoading.value = false
        return
      }
    }

    // 3. Gửi đơn
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
  <div class="min-h-screen bg-transparent py-10 px-4 md:px-0 flex flex-col items-center font-sans relative text-left uppercase font-black italic">
    
    <div class="w-full max-w-xl relative animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      <button @click="router.back()" class="text-slate-500 hover:text-pink-500 flex items-center gap-2 text-[10px] transition-colors mb-8">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        TRỞ LẠI
      </button>

      <div class="mb-10 text-center">
        <h1 class="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0] drop-shadow-sm mb-2">
          NỘP NGHIỆM THU 📸
        </h1>
        <p class="text-slate-500 text-[12px] font-bold normal-case">Gửi hình ảnh hoàn thành công việc để Mây duyệt tiền cho nàng nhé!</p>
      </div>

      <div class="space-y-6 bg-white p-6 md:p-10 rounded-[40px] border border-pink-100 shadow-sm relative overflow-hidden">
        <div class="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl pointer-events-none z-0"></div>

        <div class="space-y-2 text-left relative z-10">
          <label class="text-pink-500 text-[10px] tracking-[2px] font-black uppercase italic ml-1">CHỌN JOB ĐÃ LÀM</label>
          <div class="relative">
            <select v-model="selectedJob" class="w-full bg-pink-50/50 border border-pink-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-2xl py-4 px-5 text-slate-800 outline-none appearance-none cursor-pointer font-bold transition-all">
              <option v-for="job in jobOptions" :key="job.id" :value="job">{{ job.name }}</option>
            </select>
          </div>
        </div>

        <div class="space-y-2 text-left relative z-10">
          <label class="text-pink-500 text-[10px] tracking-[2px] font-black uppercase italic ml-1">HỌ VÀ TÊN XÁC THỰC</label>
          <input 
            v-model="fullName" 
            type="text" 
            placeholder="NHẬP HỌ TÊN THẬT CỦA NÀNG..." 
            class="w-full bg-pink-50/50 border border-pink-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-2xl py-4 px-5 text-slate-800 outline-none placeholder:text-slate-400 placeholder:normal-case font-bold transition-all"
          />
        </div>

        <div class="space-y-2 text-left relative z-10">
          <label class="text-pink-500 text-[10px] tracking-[2px] font-black uppercase italic ml-1">Số điện thoại </label>
          <input 
            v-model="phoneNumber" 
            type="text" 
            placeholder="ĐỂ MÂY TIỆN ĐỐI SOÁT..." 
            class="w-full bg-pink-50/50 border border-pink-100 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 rounded-2xl py-4 px-5 text-slate-800 outline-none placeholder:text-slate-400 placeholder:normal-case font-bold transition-all"
          />
        </div>

        <div class="space-y-2 text-left mt-4 relative z-10">
          <label class="text-pink-500 text-[10px] tracking-[2px] font-black uppercase italic ml-1">HÌNH ẢNH XÁC THỰC</label>
          <div @click="triggerFileInput" class="w-full border-2 border-dashed border-pink-300 bg-pink-50/50 hover:bg-pink-100/60 rounded-[30px] py-10 px-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
            <div class="text-4xl group-hover:scale-110 transition-transform mb-2">☁️</div>
            <p class="text-[10px] tracking-[1px] uppercase text-center font-black italic text-[#ED4E95] mb-1">{{ imageRequirementText }}</p>
            <p class="text-[9px] text-slate-400 font-bold uppercase normal-case">(Nhấn vào đây để tải ảnh lên)</p>
          </div>
          <input type="file" ref="fileInput" @change="handleFileUpload" multiple accept="image/*" class="hidden" />

          <div v-if="images.length > 0" class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            <div v-for="(img, index) in images" :key="index" class="relative group rounded-2xl overflow-hidden border border-pink-100 bg-pink-50 aspect-square shadow-sm">
              <img :src="img" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <button @click.stop="removeImage(index)" class="absolute top-2 right-2 w-6 h-6 bg-rose-500 hover:bg-rose-600 rounded-full flex items-center justify-center text-white text-[10px] font-sans not-italic z-10 shadow-md">✕</button>
            </div>
          </div>
        </div>

        <button @click="submitReport" :disabled="isLoading" class="w-full mt-6 bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white py-5 rounded-2xl text-[14px] md:text-lg font-black italic uppercase shadow-md hover:shadow-lg hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 tracking-widest relative z-10">
          {{ isLoading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN GỬI ĐƠN' }}
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 z-[5000] flex items-center justify-center p-4 backdrop-blur-md">
        <div class="absolute inset-0 bg-pink-900/40" @click="closeAndGoHome"></div>
        <div class="relative bg-white border border-pink-200 w-full max-w-sm rounded-[40px] p-8 text-center shadow-[0_0_50px_rgba(237,78,149,0.2)] animate-in zoom-in duration-300">
          <div class="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100"><span class="text-4xl text-green-500 font-sans not-italic">✨</span></div>
          <h2 class="text-2xl text-slate-800 font-black italic tracking-tighter mb-2 uppercase">Gửi đơn thành công!</h2>
          <div v-if="isFanpageTask">
            <p class="text-slate-500 text-[11px] normal-case font-medium leading-relaxed mb-6">Bằng chứng đã được gửi đến hệ thống của Mây.<br/>Đối với chiến dịch này, nàng vui lòng <strong class="text-[#1877F2]">Nhắn tin Fanpage</strong> để kế toán duyệt nhanh nhé!</p>
            <button @click="openFanpage" class="w-full bg-[#1877F2] flex items-center justify-center gap-2 text-white py-4 rounded-2xl text-[12px] font-black uppercase hover:bg-blue-600 transition-all active:scale-95 mb-3">NHẮN TIN FANPAGE</button>
            <button @click="closeAndGoHome" class="w-full bg-transparent text-slate-400 py-2 text-[10px] font-black uppercase">ĐỂ SAU</button>
          </div>
          <div v-else>
            <p class="text-slate-500 text-[11px] normal-case font-medium leading-relaxed mb-8">Mây đã nhận được bằng chứng của nàng.<br/>Vui lòng đợi một chút để kế toán xét duyệt nhé!</p>
            <button @click="closeAndGoHome" class="w-full bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white py-4 rounded-2xl text-[12px] font-black uppercase shadow-md">NÀNG ĐÃ HIỂU</button>
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
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.2rem center;
  background-size: 0.8rem;
}
</style>