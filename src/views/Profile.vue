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
  <div class="min-h-screen bg-[#090e17] py-6 px-3 flex flex-col items-center font-black italic uppercase text-left selection:bg-blue-500/30">
    <div v-if="isPageLoading" class="text-blue-500 animate-pulse mt-10 text-xs">ĐANG TẢI...</div>
    
    <div v-else class="w-full max-w-2xl">
      <!-- Nút Quay lại sát lên trên -->
      <button @click="router.back()" class="text-slate-500 hover:text-white flex items-center gap-1.5 text-[9px] mb-4 transition-colors tracking-[2px]">
        <span class="font-sans not-italic text-sm leading-none">✕</span> TRỞ LẠI
      </button>

      <!-- Tiêu đề bóp nhỏ lại -->
      <h1 class="text-2xl text-white mb-5 tracking-tighter drop-shadow-lg">HỒ SƠ <span class="text-blue-500">CÁ NHÂN</span></h1>

      <!-- Card chính -->
      <div class="bg-[#111726] rounded-3xl p-4 md:p-6 border border-slate-800/50 shadow-2xl relative overflow-hidden">
        
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/5 rounded-full blur-[50px]"></div>

        <!-- Info cơ bản -->
        <div class="flex items-center gap-4 pb-4 border-b border-slate-800/50 relative z-10">
          <div class="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">👤</div>
          <div>
            <h2 class="text-lg text-white leading-none mb-1.5">{{ userData?.username || 'MEMBER' }}</h2>
            <div class="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-400 text-[8px] px-2 py-0.5 rounded-full border border-blue-500/20">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> CẤP BẬC: THÀNH VIÊN VIP
            </div>
          </div>
        </div>

        <!-- Grid thống kê -->
        <div class="grid grid-cols-2 gap-2 mt-4 mb-4 relative z-10">
          <div class="bg-[#090d14] p-3 md:p-4 rounded-2xl border border-slate-800/50 shadow-inner">
            <p class="text-slate-500 text-[8px] tracking-[1px] mb-1">TỔNG THU NHẬP</p>
            <p class="text-emerald-400 text-lg md:text-xl tracking-tighter">{{ stats.totalEarned.toLocaleString() }}Đ</p>
          </div>
          <div class="bg-[#090d14] p-3 md:p-4 rounded-2xl border border-slate-800/50 shadow-inner">
            <p class="text-slate-500 text-[8px] tracking-[1px] mb-1">ĐƠN ĐÃ NỘP</p>
            <p class="text-white text-lg md:text-xl tracking-tighter">{{ stats.total }}</p>
          </div>
        </div>

        <!-- Chi tiết trạng thái -->
        <div class="space-y-2 mb-6 relative z-10">
          <div class="flex justify-between items-center bg-[#090d14] p-3 rounded-xl border-l-4 border-emerald-500">
            <span class="text-slate-400 text-[10px]">ĐÃ ĐƯỢC DUYỆT</span>
            <span class="text-emerald-500 text-base font-black italic">{{ stats.approved }}</span>
          </div>
          <div class="flex justify-between items-center bg-[#090d14] p-3 rounded-xl border-l-4 border-yellow-500">
            <span class="text-slate-400 text-[10px]">ĐANG CHỜ XỬ LÝ</span>
            <span class="text-yellow-500 text-base font-black italic">{{ stats.pending }}</span>
          </div>
          <div class="flex justify-between items-center bg-[#090d14] p-3 rounded-xl border-l-4 border-red-500">
            <span class="text-slate-400 text-[10px]">ĐƠN BỊ TỪ CHỐI</span>
            <span class="text-red-500 text-base font-black italic">{{ stats.rejected }}</span>
          </div>
        </div>

        <!-- ============================================== -->
        <!-- KHỐI MỐC THƯỞNG NHIỆM VỤ: 10 ĐƠN / 300K -->
        <!-- ============================================== -->
        <div class="pt-5 border-t border-slate-800/50 relative z-10">
          <h3 class="text-xs text-white mb-4 flex items-center gap-2">
            <span class="text-lg">🎁</span> NHIỆM VỤ THƯỞNG THÊM
          </h3>

          <div class="relative bg-[#090d14] p-4 md:p-5 rounded-2xl border border-slate-800/50 overflow-hidden">
            <!-- Hiệu ứng sáng phía sau -->
            <div class="absolute top-0 right-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-[30px]"></div>
            
            <div class="flex justify-between items-end mb-3 relative z-10">
              <div>
                <h4 class="text-white text-[11px] md:text-sm tracking-tighter">THƯỞNG MỐC 10 ĐƠN</h4>
                <p class="text-emerald-400 text-[9px] md:text-[11px] mt-1 drop-shadow-sm">+300.000Đ TIỀN MẶT</p>
              </div>
              <span class="text-slate-500 text-[9px] md:text-[10px]">TIẾN ĐỘ: {{ stats.approved }}/10</span>
            </div>
            
            <!-- Thanh chạy -->
            <div class="h-2 w-full bg-[#111726] rounded-full overflow-hidden shadow-inner relative z-10">
              <div class="h-full bg-gradient-to-r from-emerald-600 to-teal-400 transition-all duration-1000 relative" 
                   :style="{ width: progress10 + '%' }">
                <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            
            <!-- Nút nhận -->
            <button v-if="canClaim10" class="mt-4 w-full py-2.5 bg-emerald-500 text-black rounded-lg text-[9px] font-black hover:scale-95 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] relative z-10">
              NHẬN THƯỞNG 300K NGAY
            </button>
            <p v-else class="mt-4 text-center text-slate-600 text-[8px] tracking-widest opacity-60 relative z-10">
              HOÀN THÀNH THÊM {{ Math.max(0, 10 - stats.approved) }} ĐƠN NỮA
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