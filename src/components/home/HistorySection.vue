<script setup lang="ts">
defineProps<{ 
  isLoggedIn: boolean; 
  isDataLoading: boolean; 
  myReports: any[] 
}>();
</script>

<template>
  <section v-if="isLoggedIn" id="history-section" class="space-y-10 scroll-mt-32 font-black italic uppercase italic">
    <div class="flex items-center gap-4 text-left font-black italic uppercase italic">
      <div class="w-2.5 h-10 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] font-black italic uppercase italic"></div>
      <h3 class="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none font-black italic uppercase italic font-black">LỊCH SỬ <span class="text-blue-500 font-black italic uppercase italic font-black">HOẠT ĐỘNG</span></h3>
    </div>

    <div v-if="isDataLoading" class="space-y-5 font-black italic uppercase italic">
      <div v-for="n in 3" :key="n" class="bg-[#111726] p-8 rounded-[40px] border border-slate-800 animate-pulse font-black italic uppercase italic h-28"></div>
    </div>

    <div v-else-if="myReports.length === 0" class="bg-[#111726] p-16 rounded-[50px] border border-slate-800 text-center shadow-inner opacity-50 font-black italic uppercase italic">
       <p class="text-slate-600 text-xs tracking-[4px] font-black italic uppercase italic font-black">CHƯA CÓ GIAO DỊCH NÀO</p>
    </div>

    <div v-else class="space-y-5 font-black italic uppercase italic">
      <div v-for="r in myReports" :key="r.id" class="bg-[#111726] p-8 rounded-[40px] border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-slate-700 transition-all shadow-xl font-black italic uppercase italic">
        
        <div class="space-y-1 font-black italic uppercase italic text-left">
          <p class="text-[9px] text-blue-500 tracking-[3px] font-black uppercase italic uppercase italic font-black">{{ r.displayTime || r.createdAt?.split('T')[0] || 'VỪA XONG' }}</p>
          
          <!-- HIỂN THỊ TÊN: RÚT TIỀN HOẶC TÊN NHIỆM VỤ -->
          <h4 class="text-white text-lg font-black tracking-tight leading-none italic uppercase italic uppercase italic font-black">
            {{ r.type === 'withdraw' ? '🏦 RÚT TIỀN VỀ VÍ' : r.jobName }}
          </h4>
          
          <!-- THÔNG TIN KÈM THEO -->
          <p v-if="r.type === 'withdraw'" class="text-[10px] text-slate-400 opacity-80 mt-2 font-black italic uppercase italic leading-tight italic uppercase italic font-black">{{ r.bankInfo }}</p>
          <p v-if="r.status === 'rejected'" class="text-[10px] text-red-500 lowercase opacity-80 mt-2 font-black italic uppercase italic leading-tight italic uppercase italic font-black">Lý do: {{ r.note || 'Sai thông tin' }}</p>
        </div>

        <div class="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end font-black italic uppercase italic">
          <div class="text-right leading-none font-black italic uppercase italic">
            
            <!-- ĐỔI MÀU: RÚT LÀ ĐỎ (-), NHIỆM VỤ LÀ XANH (+) -->
            <p :class="r.type === 'withdraw' ? 'text-red-400' : 'text-emerald-400'" class="font-black text-2xl italic tracking-tighter leading-none font-black italic uppercase italic font-black">
              {{ r.type === 'withdraw' ? '-' : '+' }}{{ (r.type === 'withdraw' ? r.amount : r.reward)?.toLocaleString() }}đ
            </p>
          </div>
          
          <div :class="['px-6 py-3 rounded-2xl text-[10px] tracking-[2px] font-black italic border transition-all uppercase italic uppercase italic font-black', r.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : r.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20']">
            {{ r.status === 'pending' ? 'ĐANG CHỜ' : r.status === 'approved' ? 'THÀNH CÔNG' : 'THẤT BẠI' }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>