<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { auth, db } from '@/firebase'
import { doc, onSnapshot, collection, query, where } from "firebase/firestore"
import { useRouter } from 'vue-router'

const router = useRouter()
const userUid = ref('')
const userData = ref<any>(null)
const reports = ref<any[]>([])
const isPageLoading = ref(true) 

// Thống kê (Dữ liệu thật từ Firebase)
const stats = computed(() => {
  const total = reports.value.length
  const approved = reports.value.filter(r => r.status === 'approved').length
  const pending = reports.value.filter(r => r.status === 'pending').length
  const rejected = reports.value.filter(r => r.status === 'rejected').length
  const totalEarned = reports.value
    .filter(r => r.status === 'approved')
    .reduce((sum, r) => sum + (Number(r.reward) || 0), 0)

  return { total, approved, pending, rejected, totalEarned }
})

// ==========================================
// LOGIC MỐC DUY NHẤT: 10 ĐƠN DUYỆT THƯỞNG 300K
// ==========================================
const progress10 = computed(() => Math.min((stats.value.approved / 10) * 100, 100))
const canClaim10 = computed(() => stats.value.approved >= 10)

onMounted(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      userUid.value = user.uid
      
      onSnapshot(doc(db, "users", user.uid), (snap) => {
        if (snap.exists()) userData.value = snap.data()
      })
      
      const q = query(collection(db, "reports"), where("uid", "==", user.uid))
      onSnapshot(q, (snap) => {
        reports.value = snap.docs.map(d => d.data())
        isPageLoading.value = false
      })
    } else {
      router.push('/login')
    }
  })
})
</script>

<template>
  <div class="min-h-screen bg-transparent py-6 px-3 flex flex-col items-center font-black italic uppercase text-left selection:bg-pink-500/30">
    <div v-if="isPageLoading" class="text-pink-500 animate-pulse mt-10 text-xs tracking-widest font-black uppercase italic">ĐANG TẢI...</div>
    
    <div v-else class="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <button @click="router.back()" class="text-slate-500 hover:text-pink-500 flex items-center gap-1.5 text-[9px] mb-6 transition-colors tracking-[3px]">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg> 
        QUAY LẠI
      </button>

      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0] drop-shadow-sm mb-2">
          HỒ SƠ <span class="text-[#ED4E95]">CREATOR</span>
        </h1>
        <p class="text-slate-500 text-[11px] font-bold">Nơi lưu giữ hành trình sáng tạo của nàng tại Mây</p>
      </div>

      <div class="bg-white rounded-[30px] p-6 md:p-8 border border-pink-100 shadow-sm relative overflow-hidden">
        
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-pink-50 rounded-full blur-[50px] pointer-events-none"></div>

        <div class="flex items-center gap-4 pb-6 border-b border-pink-50 relative z-10">
          <div class="w-16 h-16 bg-gradient-to-tr from-[#ED4E95] to-[#A061F0] rounded-2xl flex items-center justify-center text-3xl shadow-md border border-white">
            👩‍💻
          </div>
          <div>
            <h2 class="text-xl md:text-2xl text-slate-800 tracking-tighter leading-none mb-1.5">{{ userData?.username || 'CREATOR MỚI' }}</h2>
            <div class="inline-flex items-center gap-1.5 bg-pink-50 text-pink-600 text-[9px] md:text-[10px] px-3 py-1 rounded-full border border-pink-200">
              <span class="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse"></span> HẠNG: THÀNH VIÊN VIP ✨
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-6 mb-6 relative z-10">
          <div class="bg-pink-50/50 p-4 md:p-5 rounded-2xl border border-pink-100 hover:shadow-sm transition-all text-center md:text-left">
            <p class="text-slate-500 text-[9px] tracking-[2px] mb-1">TỔNG NHUẬN BÚT</p>
            <p class="text-pink-600 text-2xl md:text-3xl tracking-tighter">{{ stats.totalEarned.toLocaleString() }}<span class="text-lg">đ</span></p>
          </div>
          <div class="bg-pink-50/50 p-4 md:p-5 rounded-2xl border border-pink-100 hover:shadow-sm transition-all text-center md:text-left">
            <p class="text-slate-500 text-[9px] tracking-[2px] mb-1">TỔNG JOB ĐÃ NỘP</p>
            <p class="text-slate-800 text-2xl md:text-3xl tracking-tighter">{{ stats.total }} <span class="text-sm tracking-normal text-slate-400">JOB</span></p>
          </div>
        </div>

        <div class="space-y-3 mb-8 relative z-10">
          <div class="flex justify-between items-center bg-green-50 p-4 rounded-xl border-l-4 border-emerald-400">
            <span class="text-slate-600 text-[11px] tracking-widest">ĐÃ ĐƯỢC DUYỆT</span>
            <span class="text-emerald-500 text-xl font-black italic tracking-tighter">{{ stats.approved }}</span>
          </div>
          <div class="flex justify-between items-center bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
            <span class="text-slate-600 text-[11px] tracking-widest">ĐANG CHỜ XỬ LÝ</span>
            <span class="text-yellow-600 text-xl font-black italic tracking-tighter">{{ stats.pending }}</span>
          </div>
          <div class="flex justify-between items-center bg-red-50 p-4 rounded-xl border-l-4 border-rose-400">
            <span class="text-slate-600 text-[11px] tracking-widest">ĐƠN BỊ TỪ CHỐI</span>
            <span class="text-rose-500 text-xl font-black italic tracking-tighter">{{ stats.rejected }}</span>
          </div>
        </div>

        <div class="pt-6 border-t border-pink-100 relative z-10">
          <h3 class="text-sm text-slate-800 mb-4 flex items-center gap-2">
            <span class="text-xl">🎁</span> NHIỆM VỤ THƯỞNG THÊM
          </h3>

          <div class="relative bg-gradient-to-br from-pink-50 to-purple-50 p-5 md:p-6 rounded-2xl border border-pink-200 overflow-hidden shadow-inner">
            
            <div class="flex justify-between items-end mb-4 relative z-10">
              <div>
                <h4 class="text-slate-800 text-[13px] md:text-sm tracking-tighter">THƯỞNG MỐC 10 JOB HOÀN THÀNH</h4>
                <p class="text-[#ED4E95] text-[10px] md:text-[12px] mt-1 tracking-widest font-black">+300.000Đ VÀO VÍ</p>
              </div>
              <span class="text-slate-500 text-[10px] md:text-[11px] bg-white px-2 py-1 rounded-md border border-pink-100">
                TIẾN ĐỘ: <strong class="text-pink-600">{{ stats.approved }}/10</strong>
              </span>
            </div>
            
            <div class="h-3 w-full bg-white rounded-full overflow-hidden shadow-inner border border-pink-100 relative z-10">
              <div class="h-full bg-gradient-to-r from-[#ED4E95] to-[#A061F0] transition-all duration-1000 relative" 
                   :style="{ width: progress10 + '%' }">
                <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <button v-if="canClaim10" class="mt-5 w-full py-3 md:py-4 bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white rounded-xl text-[11px] md:text-[13px] font-black tracking-widest hover:opacity-90 hover:shadow-lg transition-all active:scale-95 relative z-10">
              NHẬN THƯỞNG 300K NGAY!
            </button>
            <p v-else class="mt-5 text-center text-slate-500 text-[9px] md:text-[10px] tracking-widest relative z-10 bg-white/60 py-2 rounded-lg border border-pink-100/50">
              CHĂM CHỈ THÊM <span class="text-pink-600 text-[12px]">{{ Math.max(0, 10 - stats.approved) }}</span> JOB NỮA ĐỂ NHẬN THƯỞNG NÀNG NHÉ!
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-tighter { letter-spacing: -0.05em; }
</style>