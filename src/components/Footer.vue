<script setup lang="ts">
// Footer cho Mây Freelance - Bản dứt điểm lỗi dính cột Mobile
</script>

<template>
  <footer class="bg-white/90 backdrop-blur-xl border-t border-pink-100 pt-20 pb-48 md:pb-16 relative overflow-hidden z-10">
    <div class="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-pink-50/80 to-transparent pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 relative z-10">
      
      <div class="flex flex-col md:grid md:grid-cols-3 gap-20 md:gap-12 lg:gap-24">

        <div class="flex flex-col items-center md:items-start text-center md:text-left">
          <div class="flex items-center gap-4 mb-6">
            <img src="/images/may-logo.png" alt="Mây Freelance" class="w-16 h-14 object-contain mix-blend-multiply">
            <div class="leading-none text-left">
              <h3 class="text-2xl md:text-3xl font-black italic text-slate-800 uppercase tracking-tighter">MÂY <span class="text-pink-500">FREELANCE</span></h3>
              <span class="text-[10px] text-slate-400 font-bold uppercase tracking-[3px]">Creator Hub Platform</span>
            </div>
          </div>
          <p class="text-slate-500 text-sm leading-relaxed font-medium max-w-xs px-2 md:px-0">
            Nền tảng kết nối Creator & Freelancer sành điệu. Nơi biến thời gian rảnh của nàng thành thu nhập thực tế.
          </p>
          <span class="font-black text-pink-400 italic mt-6 block tracking-widest uppercase text-xs">UY TÍN - MINH BẠCH - BẢO MẬT</span>
        </div>

        <div class="flex flex-col items-center md:items-start">
          <h4 class="text-[11px] font-black italic text-slate-800 uppercase tracking-[4px] mb-8 flex items-center gap-3">
            <div class="w-2 h-4 bg-pink-400 rounded-full"></div>
            ĐỐI TÁC GIẢI NGÂN
          </h4>
          <div class="grid grid-cols-2 gap-4 w-full max-w-[280px] md:flex md:flex-wrap md:max-w-none">
            <span class="flex items-center justify-center h-12 bg-white border border-pink-100 rounded-2xl text-[10px] font-black italic text-[#A50064] shadow-sm uppercase">MOMO</span>
            <span class="flex items-center justify-center h-12 bg-white border border-pink-100 rounded-2xl text-[10px] font-black italic text-[#1D3E8E] shadow-sm uppercase">MB Bank</span>
            <span class="flex items-center justify-center h-12 bg-white border border-pink-100 rounded-2xl text-[10px] font-black italic text-[#00602F] shadow-sm uppercase">Vietcombank</span>
            <span class="flex items-center justify-center h-12 bg-white border border-pink-100 rounded-2xl text-[10px] font-black italic text-[#005BAB] shadow-sm uppercase">ACB</span>
            <span class="flex items-center justify-center h-12 bg-white border border-pink-100 rounded-2xl text-[10px] font-black italic text-[#722282] shadow-sm uppercase">TPBank</span>
            <span class="flex items-center justify-center h-12 bg-white border border-pink-100 rounded-2xl text-[10px] font-black italic text-[#1A1F71] shadow-sm uppercase">VISA</span>
          </div>
        </div>

        <div class="flex flex-col items-center md:items-start">
          <h4 class="text-[11px] font-black italic text-slate-800 uppercase tracking-[4px] mb-8 flex items-center gap-3">
            <div class="w-2 h-4 bg-[#A061F0] rounded-full"></div>
            HỖ TRỢ NÀNG
          </h4>
          <div class="flex flex-col gap-5 w-full max-w-[300px]">
            <a href="#" class="flex items-center justify-center gap-4 bg-[#0084FF] text-white py-4.5 px-6 rounded-2xl shadow-xl active:scale-95 transition-all font-black italic text-[13px] uppercase tracking-wider">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.923 1.503 5.518 3.829 7.21v3.313c0 .385.429.616.757.408l3.435-2.18c1.233.342 2.56.526 3.979.526 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.093 12.35l-2.617-2.793-5.097 2.793 5.61-5.965 2.617 2.793 5.097-2.793-5.61 5.965z"/></svg>
              Chat Messenger
            </a>
            <a href="#" class="flex items-center justify-center gap-4 bg-white border-2 border-slate-100 text-[#0068FF] py-4.5 px-6 rounded-2xl shadow-md active:scale-95 transition-all font-black italic text-[13px] uppercase tracking-wider">
              <span class="font-bold text-xl leading-none">Zalo</span>
              Nhóm Hỗ Trợ
            </a>
          </div>
        </div>

      </div>

      <div class="border-t border-pink-100/50 mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="text-center md:text-left">
          <p class="text-[10px] text-slate-400 font-bold tracking-[3px] uppercase">
            Copyright © 2026 <span class="text-pink-500 font-black italic">MÂY FREELANCE</span>
          </p>
          <p class="text-[9px] text-slate-300 font-bold uppercase mt-1">All rights reserved.</p>
        </div>
        <div class="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-widest bg-white/50 px-4 py-2 rounded-full border border-white">
          <span>Made with</span>
          <span class="animate-pulse text-pink-500 text-xl">💖</span>
          <span>for Creators</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.py-4\.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
</style>