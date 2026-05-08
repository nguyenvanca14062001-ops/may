<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isLoggedIn: boolean;
  isDataLoading: boolean;
  myReports: any[];
}>();

const displayHistory = computed(() => {
  return props.myReports.slice(0, 10); // Chỉ hiện 10 giao dịch gần nhất cho mượt
})
</script>

<template>
  <section class="space-y-4 pt-6">
    <div class="flex items-center gap-3 px-1">
      <div class="w-1.5 h-6 bg-[#ED4E95] rounded-full shadow-[0_0_10px_rgba(237,78,149,0.4)]"></div>
      <h3 class="text-lg md:text-3xl text-slate-800 tracking-tighter italic font-black uppercase">NHẬT KÝ <span class="text-[#ED4E95]">SÁNG TẠO</span></h3>
    </div>

    <div v-if="!isLoggedIn" class="bg-white border border-pink-100 rounded-[30px] p-10 text-center shadow-sm">
      <p class="text-slate-400 font-bold italic">Vui lòng đăng nhập để xem nhật ký của nàng nhé!</p>
    </div>
    
    <div v-else-if="isDataLoading" class="bg-white border border-pink-100 rounded-[30px] p-10 text-center shadow-sm">
      <p class="text-pink-500 font-bold italic animate-pulse">Đang tải dữ liệu...</p>
    </div>
    
    <div v-else-if="myReports.length === 0" class="bg-white border border-pink-100 rounded-[30px] p-10 text-center shadow-sm">
      <div class="text-4xl mb-3">☁️</div>
      <p class="text-slate-400 font-bold italic">Nàng chưa có hoạt động nào. Nhận Job ngay thôi!</p>
    </div>

    <div v-else class="space-y-3">
      <div v-for="item in displayHistory" :key="item.id" 
           class="bg-white border border-pink-50 hover:border-pink-200 rounded-[20px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all">
        
        <div class="flex items-start gap-3 md:gap-4">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-lg md:text-xl shrink-0 shadow-sm"
               :class="item.type === 'withdraw' ? 'bg-gradient-to-tr from-purple-100 to-indigo-100 text-purple-600' : 'bg-gradient-to-tr from-pink-100 to-rose-100 text-pink-500'">
            {{ item.type === 'withdraw' ? '💸' : '✨' }}
          </div>
          
          <div>
            <p class="text-[9px] md:text-[10px] text-slate-400 font-black tracking-widest mb-1">{{ item.displayTime }}</p>
            <h4 class="text-sm md:text-base text-slate-800 font-black italic uppercase leading-tight">
              {{ item.type === 'withdraw' ? 'RÚT TIỀN VỀ VÍ' : item.jobName || 'NHIỆM VỤ SÁNG TẠO' }}
            </h4>
            <p class="text-[10px] md:text-[11px] text-slate-500 font-medium mt-0.5" v-if="item.type === 'withdraw'">
              {{ item.bankName }} - {{ item.bankNumber }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-1 pl-14 md:pl-0">
          <span class="font-black text-lg md:text-xl italic tracking-tighter"
                :class="item.type === 'withdraw' ? 'text-slate-700' : 'text-[#ED4E95]'">
            {{ item.type === 'withdraw' ? '-' : '+' }}{{ Number(item.amount || item.reward || 0).toLocaleString() }}<span class="text-[12px]">đ</span>
          </span>
          
          <div class="px-3 py-1 rounded-md text-[9px] font-black tracking-widest uppercase"
               :class="{
                 'bg-yellow-50 text-yellow-600 border border-yellow-200': item.status === 'pending',
                 'bg-green-50 text-emerald-600 border border-green-200': item.status === 'approved' || item.status === 'success',
                 'bg-red-50 text-red-500 border border-red-200': item.status === 'rejected'
               }">
            {{ item.status === 'pending' ? 'ĐANG CHỜ' : (item.status === 'approved' || item.status === 'success' ? 'THÀNH CÔNG' : 'TỪ CHỐI') }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>