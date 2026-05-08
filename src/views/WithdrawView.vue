<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from "firebase/auth"
import { collection, addDoc, doc, onSnapshot, serverTimestamp, query, where } from "firebase/firestore"
import Swal from 'sweetalert2'

const router = useRouter()
const isLoggedIn = ref(false)
const isLoading = ref(false)
const userBalance = ref(0)
const userUid = ref('')

const amount = ref('')
const bankInfo = ref('')

// --- THÔNG SỐ TIẾN ĐỘ ---
const approvedJobsCount = ref(0) // Số job đã được admin duyệt
const TARGET_JOBS = 8 // Mục tiêu 8 job mới được rút

const progressPercentage = computed(() => {
  return Math.min((approvedJobsCount.value / TARGET_JOBS) * 100, 100)
})

const canWithdraw = computed(() => approvedJobsCount.value >= TARGET_JOBS)

// --- LOGIC BUFF LỊCH SỬ ẢO ---
const ctvHistory = ref<any[]>([])
const hoList = ['NGUYỄN', 'TRẦN', 'LÊ', 'PHẠM', 'HOÀNG', 'VŨ', 'ĐẶNG', 'BÙI', 'ĐỔ', 'HỒ']
const generateFakeOrder = (isNew = false) => {
  const ho = hoList[Math.floor(Math.random() * hoList.length)]
  const tail = Math.floor(Math.random() * 90) + 10
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: `${ho} ***${tail}`,
    time: isNew ? 'VỪA XONG' : `${Math.floor(Math.random() * 20) + 1} PHÚT TRƯỚC`,
    amount: `+${(Math.floor(Math.random() * 10) + 2) * 100000}đ`,
    status: 'THÀNH CÔNG'
  }
}

onMounted(() => {
  // Chạy lịch sử ảo
  for (let i = 0; i < 5; i++) ctvHistory.value.push(generateFakeOrder())
  setInterval(() => {
    ctvHistory.value.unshift(generateFakeOrder(true))
    ctvHistory.value.pop()
  }, 8000)

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true
      userUid.value = user.uid
      
      // 1. Lấy số dư tài khoản
      onSnapshot(doc(db, "users", user.uid), (docSnap) => {
        if (docSnap.exists()) userBalance.value = docSnap.data().balance || 0
      })

      // 2. Đếm số Job đã được DUYỆT (approved)
      const q = query(
        collection(db, "reports"), 
        where("uid", "==", user.uid), 
        where("status", "==", "approved")
      )
      
      onSnapshot(q, (snapshot) => {
        approvedJobsCount.value = snapshot.size
      })

    } else {
      router.push('/login')
    }
  })
})

const submitWithdraw = async () => {
  if (!canWithdraw.value) {
    Swal.fire({
      icon: 'error',
      title: 'CHƯA ĐỦ TIẾN ĐỘ!',
      text: `Nàng cần hoàn thành ít nhất ${TARGET_JOBS} Job được duyệt mới có thể rút Cát-xê nhé.`,
      confirmButtonColor: '#ED4E95'
    })
    return
  }

  const numAmount = Number(amount.value)
  if (!amount.value || !bankInfo.value) { 
    alert('⚠️ NÀNG VUI LÒNG ĐIỀN ĐỦ THÔNG TIN NHÉ!'); 
    return 
  }
  
  if (numAmount > userBalance.value) { 
    alert(`⚠️ SỐ DƯ CỦA NÀNG KHÔNG ĐỦ!`); 
    return 
  }

  isLoading.value = true
  try {
    await addDoc(collection(db, "withdrawals"), {
      uid: userUid.value,
      amount: numAmount,
      bankInfo: bankInfo.value,
      status: 'pending',
      createdAt: serverTimestamp()
    })
    
    amount.value = ''; bankInfo.value = ''
    
    Swal.fire({
      icon: 'success',
      title: 'ĐÃ LÊN ĐƠN RÚT CÁT-XÊ!',
      html: `<p style="color: #64748b; font-size: 14px;">Kế toán Mây sẽ kiểm tra và giải ngân cho nàng sớm nhất nhé!</p>`,
      confirmButtonText: 'NÀNG ĐÃ HIỂU',
      confirmButtonColor: '#ED4E95',
      background: '#ffffff'
    }).then(() => router.push('/'))

  } catch (error: any) {
    alert('❌ LỖI HỆ THỐNG: ' + error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-transparent py-10 px-4 md:px-0 flex flex-col items-center font-sans">
    
    <div class="w-full max-w-2xl relative">
      <button @click="router.push('/')" class="text-slate-500 hover:text-pink-500 flex items-center gap-2 text-xs font-black italic uppercase transition-colors mb-8 tracking-widest">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        QUAY LẠI
      </button>

      <div class="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-pink-100 relative overflow-hidden">
        
        <div class="text-center mb-10">
          <h1 class="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0] drop-shadow-sm mb-2">
            RÚT CÁT-XÊ 💸
          </h1>
          <p class="text-slate-500 text-[11px] mt-2 tracking-[2px] font-bold uppercase">
            SỐ DƯ KHẢ DỤNG: <span class="text-pink-600 font-black text-lg">{{ userBalance.toLocaleString() }}Đ</span>
          </p>
        </div>

        <div class="space-y-6 relative z-10">
          <div class="bg-pink-50/50 border border-pink-100 rounded-3xl p-5">
            <div class="flex justify-between items-end mb-3">
              <span class="text-[#ED4E95] text-[10px] font-black uppercase italic tracking-widest">Tiến độ rút tiền</span>
              <span class="text-slate-600 text-[11px] font-bold">{{ approvedJobsCount }}/{{ TARGET_JOBS }} Job Đã Duyệt</span>
            </div>
            <div class="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner border border-pink-100">
              <div class="h-full bg-gradient-to-r from-[#ED4E95] to-[#A061F0] transition-all duration-700 shadow-lg" 
                   :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <p v-if="!canWithdraw" class="text-[9px] text-pink-400 font-bold italic mt-3 text-center uppercase tracking-wider leading-relaxed">
              *Nàng cần hoàn thành thêm {{ TARGET_JOBS - approvedJobsCount }} Job nữa để mở khóa tính năng rút
            </p>
            <p v-else class="text-[9px] text-emerald-500 font-black italic mt-3 text-center uppercase tracking-wider animate-pulse">
              ✨ Chúc mừng! Nàng đã đủ điều kiện rút cát-xê ✨
            </p>
          </div>

          <div class="space-y-2 text-left">
            <label class="text-[#ED4E95] text-[10px] tracking-[2px] font-black italic uppercase ml-1">SỐ TIỀN MUỐN RÚT</label>
            <input v-model="amount" type="number" placeholder="Nhập số tiền..." 
                   :disabled="!canWithdraw"
                   class="w-full bg-pink-50/50 border border-pink-100 rounded-2xl p-5 text-slate-800 outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all font-black italic disabled:opacity-50 shadow-sm" />
          </div>

          <div class="space-y-2 text-left">
            <label class="text-[#ED4E95] text-[10px] tracking-[2px] font-black italic uppercase ml-1">THÔNG TIN NHẬN TIỀN</label>
            <textarea v-model="bankInfo" placeholder="Tên ngân hàng - Số tài khoản - Tên chủ tài khoản..." 
                      :disabled="!canWithdraw"
                      class="w-full bg-pink-50/50 border border-pink-100 rounded-2xl p-5 h-28 text-slate-800 outline-none focus:border-pink-400 transition-all font-black italic resize-none disabled:opacity-50 shadow-sm"></textarea>
          </div>

          <button @click="submitWithdraw" :disabled="isLoading || !canWithdraw" 
                  class="w-full mt-4 bg-gradient-to-r from-[#ED4E95] to-[#A061F0] hover:opacity-90 text-white py-5 rounded-2xl text-[14px] md:text-lg font-black italic uppercase shadow-md transition-all active:scale-95 disabled:grayscale">
            {{ isLoading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN RÚT TIỀN' }}
          </button>
        </div>
      </div>

      <div class="bg-white rounded-[40px] p-6 md:p-10 shadow-sm border border-pink-100 mt-8 overflow-hidden">
        <h3 class="text-slate-800 text-lg md:text-xl font-black italic uppercase tracking-tighter flex items-center gap-3 mb-8">
          <div class="w-1.5 h-6 bg-[#ED4E95] rounded-full"></div>
          LỊCH SỬ RÚT TIỀN GẦN ĐÂY
        </h3>

        <div class="space-y-3">
          <div v-for="item in ctvHistory" :key="item.id" 
               class="bg-white p-4 rounded-[20px] border border-pink-50 flex items-center justify-between group transition-all duration-500">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center text-[#ED4E95] text-lg shadow-sm">👩‍💻</div>
              <div class="text-left leading-tight">
                <p class="text-slate-800 font-black italic uppercase text-[12px] md:text-sm">{{ item.name }}</p>
                <p class="text-slate-400 text-[8px] md:text-[9px] font-black italic uppercase">{{ item.time }}</p>
              </div>
            </div>
            <div class="text-right leading-tight">
              <p class="text-pink-600 font-black italic text-base md:text-lg">{{ item.amount }}</p>
              <p class="text-emerald-500 text-[8px] font-black italic uppercase flex items-center justify-end gap-1">
                <span class="animate-pulse text-emerald-400">●</span> {{ item.status }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; margin: 0; 
}
.disabled\:grayscale:disabled {
  filter: grayscale(100%);
  opacity: 0.6;
  cursor: not-allowed;
}
</style>