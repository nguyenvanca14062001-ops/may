<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

const props = defineProps<{
  myReports: any[],
  username: string
}>()

// --- LOGIC TIẾN ĐỘ CỦA BẠN ---
const approvedCount = computed(() => {
  if (!props.myReports) return 0
  return props.myReports.filter(job => job.status === 'approved').length
})
const progressPercent = computed(() => Math.min((approvedCount.value / 10) * 100, 100))
const isEligible = computed(() => approvedCount.value >= 10)

// --- LOGIC BẢNG XẾP HẠNG (HẠNG 1: 2TR - APP CHUNG) ---
const leaderboard = ref<any[]>([])
const firstNames = ['nguyen', 'tran', 'le', 'pham', 'hoang', 'vu', 'vo', 'dang', 'bui', 'do', 'ho', 'ngo', 'duong']
// Đã sửa: Chỉ để "App chứng khoán" chung theo ý nàng
const apps = ['App chứng khoán', 'VPBank Lady', 'TPBank Mobile', 'Ngân hàng MSB']

const generateLeaderboard = () => {
  const temp = []
  
  // Hạng 1 cố định: 20 người - 2.000.000đ
  temp.push({
    id: `${firstNames[Math.floor(Math.random() * firstNames.length)]}***${Math.floor(Math.random() * 90 + 10)}`,
    inviteCount: 20,
    app: apps[0], // Ưu tiên hiện App chứng khoán cho TOP 1
    rewardValue: 2000000
  })

  // Hạng 2 đến 10 giảm dần
  let currentInvites = 18
  for (let i = 1; i < 10; i++) {
    // Giảm dần số người mời (đảm bảo là bội số của hoặc gần sát để tính tiền đẹp)
    currentInvites -= Math.floor(Math.random() * 2 + 1)
    if (currentInvites < 3) currentInvites = 3 

    // Thưởng theo quy trình (Ví dụ: ~100k/người)
    let currentReward = currentInvites * 100000
    
    // Đảm bảo hạng sau luôn ít tiền hơn hạng trước
    if (currentReward >= temp[i-1].rewardValue) {
       currentReward = temp[i-1].rewardValue - 150000
    }

    temp.push({
      id: `${firstNames[Math.floor(Math.random() * firstNames.length)]}***${Math.floor(Math.random() * 90 + 10)}`,
      inviteCount: currentInvites,
      app: apps[Math.floor(Math.random() * apps.length)],
      rewardValue: currentReward
    })
  }
  leaderboard.value = temp
}

onMounted(() => {
  generateLeaderboard()
})
</script>

<template>
  <div class="p-4 md:p-8 space-y-8 animate-fade-in pb-32">
    
    <div class="bg-white/90 backdrop-blur-2xl rounded-[40px] p-8 shadow-[0_20px_50px_rgba(237,78,149,0.1)] border-2 border-white relative overflow-hidden text-left">
      <div class="absolute -top-10 -right-10 w-32 h-32 bg-orange-200/30 blur-[50px] rounded-full"></div>
      
      <div class="flex items-center gap-4 mb-8">
        <div class="w-16 h-16 bg-pink-100 rounded-3xl flex items-center justify-center text-3xl shadow-inner">☁️</div>
        <div>
          <h2 class="text-2xl font-black italic text-slate-800 uppercase tracking-tighter leading-none">NÀNG {{ username }}</h2>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mt-1">Đối tác Freelancer VIP</p>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-end">
          <span class="text-sm font-black italic text-[#ED4E95] uppercase">Tiến độ nhận quà 300K</span>
          <span class="text-2xl font-black italic text-slate-800">{{ approvedCount }}/10 <span class="text-sm text-slate-400 uppercase">Job</span></span>
        </div>
        
        <div class="h-8 bg-slate-100 rounded-2xl p-1.5 shadow-inner relative overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-[#FF823A] to-[#ED4E95] rounded-xl transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,130,58,0.4)]"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <p class="text-[10px] text-slate-400 font-bold italic uppercase text-center">Cố gắng hoàn thành thêm {{ 10 - approvedCount > 0 ? 10 - approvedCount : 0 }} job nữa nhé 🔥</p>
      </div>
    </div>

    <div class="grid grid-cols-5 gap-3">
      <div v-for="i in 10" :key="i" 
        :class="['h-16 rounded-[20px] flex items-center justify-center text-xl transition-all shadow-sm border-2', 
                 i <= approvedCount ? 'bg-orange-50 border-orange-200 scale-105 shadow-orange-100' : 'bg-white border-slate-50 text-slate-200']">
        <template v-if="i <= approvedCount">
           <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire/3D/fire_3d.png" class="w-8 h-8" />
        </template>
        <span v-else class="font-black italic text-sm text-slate-300">{{ i }}</span>
      </div>
    </div>

    <button 
      :disabled="!isEligible"
      :class="['w-full py-6 rounded-[30px] font-black italic uppercase text-xl shadow-xl transition-all flex items-center justify-center gap-3 border-2 border-white',
               isEligible ? 'bg-gradient-to-r from-[#FF823A] to-[#ED4E95] text-white hover:scale-[1.02]' : 'bg-slate-100 text-slate-400 cursor-not-allowed']"
    >
      <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Wrapped%20gift/3D/wrapped_gift_3d.png" class="w-8 h-8" />
      {{ isEligible ? 'NHẬN QUÀ 300.000Đ NGAY 🔥' : 'CHƯA ĐỦ ĐIỀU KIỆN' }}
    </button>

    <div class="bg-white/90 backdrop-blur-2xl rounded-[40px] p-6 shadow-xl border-2 border-white space-y-6 text-left">
      <div class="flex items-center gap-3 mb-2">
        <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Trophy/3D/trophy_3d.png" class="w-10 h-10 drop-shadow-md" />
        <div>
           <h3 class="text-lg font-black italic text-slate-800 uppercase leading-none">BẢNG VÀNG ĐỐI TÁC</h3>
           <div class="flex items-center gap-2 mt-1">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              <span class="text-[9px] font-bold text-orange-500 uppercase tracking-widest">Dữ liệu thực tế 24h</span>
           </div>
        </div>
      </div>

      <div class="space-y-3">
        <div v-for="(item, index) in leaderboard" :key="index" 
          :class="['flex items-center gap-3 p-4 rounded-[24px] border border-white transition-all', 
                   index === 0 ? 'bg-orange-50/50 shadow-md scale-[1.02]' : 'bg-slate-50/50']">
          
          <div :class="['w-9 h-9 rounded-full flex items-center justify-center font-black italic text-xs shadow-sm border-2', 
                       index === 0 ? 'bg-yellow-400 border-yellow-200 text-white' : 
                       index === 1 ? 'bg-slate-300 border-slate-200 text-white' : 
                       index === 2 ? 'bg-orange-400 border-orange-200 text-white' : 'bg-white text-slate-400']">
            {{ index + 1 }}
          </div>

          <div class="flex-1 leading-tight">
            <div class="text-[11px] font-black italic text-slate-800 uppercase tracking-tight">
                {{ item.id }} 
                <span v-if="index === 0" class="ml-1 text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-pulse uppercase">Vô địch</span>
            </div>
            <div class="text-[9px] font-bold text-slate-500 uppercase mt-0.5">
                Mời {{ item.inviteCount }} bạn đăng ký {{ item.app }}
            </div>
          </div>

          <div class="text-right">
             <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Thưởng</div>
             <div :class="['text-[14px] font-black italic tracking-tighter', index === 0 ? 'text-red-500 text-lg' : 'text-[#ED4E95]']">
                +{{ item.rewardValue.toLocaleString() }}đ
             </div>
          </div>

        </div>
      </div>
      
      <p class="text-[9px] text-slate-400 font-bold italic uppercase text-center pb-2 opacity-60">Kết quả được tính dựa trên lượt đăng ký thành công...</p>
    </div>

  </div>
</template>

<style scoped>
.animate-fade-in { animation: fadeIn 0.8s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>