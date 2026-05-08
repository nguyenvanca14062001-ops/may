<script setup lang="ts">
/**
 * SIDEBAR COMPONENT - MMO PRO (FULL CODE - NO LOOP)
 * TỐI ƯU PHÂN CẤP VIP & HIỆU ỨNG HOT GLOW
 */

defineProps<{ 
 isLoggedIn: boolean; 
 isMenuOpen: boolean; 
 username: string; 
 userBalance: number 
}>();

const emit = defineEmits([
 'toggleMenu', 
 'logout', 
 'routerPush', 
 'requireAuth', 
 'scrollToHistory', 
 'contactSupport'
]);

const handleHistoryClick = () => {
 emit('scrollToHistory');
}

const navigateTo = (path: string, authRequired = false) => {
 if (authRequired) {
   emit('requireAuth', path);
 } else {
   emit('routerPush', path);
 }
}
</script>

<template>
 <div v-if="isMenuOpen" @click="emit('toggleMenu')" class="fixed inset-0 bg-black/80 z-[110] lg:hidden backdrop-blur-sm"></div>

 <aside :class="[
   'fixed lg:sticky top-0 left-0 h-screen w-[260px] md:w-[280px] bg-[#111726] border-r border-slate-800/50 flex flex-col transition-transform duration-300 z-[120] shadow-2xl lg:shadow-none overflow-y-auto selection:bg-blue-500/30 font-black italic text-left uppercase',
   isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
 ]">
   
   <!-- PHẦN 1: LOGO -->
   <div class="py-5 px-4 flex flex-col items-center justify-center border-b border-slate-800/50 shrink-0">
     <div @click="navigateTo('/')" class="text-center cursor-pointer hover:scale-105 transition-transform">
       <h1 class="text-white text-3xl font-black tracking-tighter drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
         MMO <span class="text-blue-500">PRO</span>
       </h1>
       <p class="text-[9px] text-slate-500 tracking-[4px] mt-0.5 font-bold">SYSTEM HUB</p>
     </div>
   </div>

   <!-- PHẦN 2: DANH SÁCH MENU CHÍNH -->
   <div class="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
     <p class="text-slate-500 text-[9px] tracking-[3px] px-3 mb-1.5 opacity-60 italic">TRANG CHÍNH</p>

     <button @click="navigateTo('/')" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] bg-[#1a233a] border border-blue-500/30 text-blue-500 text-[13px] font-bold shadow-inner mb-0.5 transition-all active:scale-95">
       <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>
       Trang Chủ
     </button>

     <button @click="navigateTo('/profile', true)" class="w-full relative flex items-center gap-3 px-4 py-3 rounded-[14px] bg-gradient-to-r from-orange-600/10 to-red-600/5 border border-orange-500/40 hover:bg-orange-500/20 text-orange-400 text-[13px] font-black transition-all group my-2 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
       <div class="absolute -top-2 -right-1 z-20 flex items-center gap-1 bg-gradient-to-r from-orange-600 to-red-600 text-white text-[7px] px-2 py-1 rounded-bl-xl rounded-tr-lg font-black italic animate-bounce shadow-lg shadow-red-900/60">
         SIÊU HOT 🔥
       </div>
       <svg class="w-4 h-4 shrink-0 text-orange-500 group-hover:scale-110 transition-transform animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
       Nhận Quà 300k
     </button>

     <button @click="navigateTo('/profile', true)" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-[#151b2b] text-slate-400 text-[13px] font-bold hover:text-white transition-all">
       <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
       Hồ Sơ Cá Nhân
     </button>

     <button @click="navigateTo('/submit-report', true)" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-[#151b2b] text-slate-400 text-[13px] font-bold hover:text-white transition-all">
       <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="9 15 11 17 15 13"></polyline></svg>
       Gửi Bằng Chứng
     </button>

     <button @click="handleHistoryClick" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-[#151b2b] text-slate-400 text-[13px] font-bold hover:text-white transition-all">
       <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
       Lịch Sử Hoạt Động
     </button>

     <button @click="navigateTo('/withdraw', true)" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-[#151b2b] text-slate-400 text-[13px] font-bold hover:text-white transition-all">
       <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
       Rút Tiền
     </button>

     <!-- KHU VỰC CÔNG VIỆC -->
     <p class="text-slate-500 text-[9px] tracking-[3px] px-3 mb-1.5 mt-3 border-t border-slate-800/50 pt-3 opacity-60 italic">DANH SÁCH CÔNG VIỆC </p>

     <!-- ========================================== -->
     <!-- NHÓM VIP (01 & 02) -->
     <!-- ========================================== -->
     
     <!-- 01. GIỚI THIỆU -->
     <button @click="navigateTo('/job/referral-program')" class="w-full relative flex items-center justify-between px-3 py-3 rounded-[18px] bg-gradient-to-r from-yellow-600/20 to-orange-600/5 border-2 border-yellow-500/50 hover:border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.15)] transition-all group mb-2">
       <div class="flex items-center gap-3">
         <div class="w-8 h-8 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform shrink-0"><span class="text-[#090e17] font-black text-[9px]">REF</span></div>
         <div class="text-left"><span class="text-yellow-400 text-[11px] block leading-none mb-1">Giới Thiệu</span><span class="text-white/40 text-[12px] normal-case font-bold">Thưởng 300k</span></div>
       </div>
       <div class="relative flex items-center justify-center px-1.5 py-0.5">
         <div class="absolute inset-0 bg-red-600 blur-[4px] rounded-full animate-pulse"></div>
         <div class="relative z-10 flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 border border-yellow-300 px-1 py-0.5 rounded-md">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </div>
     </button>

     <!-- 02. APP CHỨNG KHOÁN -->
     <button @click="navigateTo('/job/app-chung-khoan')" class="w-full relative flex items-center justify-between px-3 py-3 rounded-[18px] bg-gradient-to-r from-blue-600/20 to-indigo-600/5 border-2 border-blue-500/50 hover:border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all group mb-4">
       <div class="flex items-center gap-3">
         <div class="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform shrink-0"><span class="text-white font-black text-[9px]">APP</span></div>
         <div class="text-left"><span class="text-blue-400 text-[11px] block leading-none mb-1">APP CHỨNG KHOÁN </span><span class="text-white/40 text-[12px] normal-case font-bold">Nhận 125k</span></div>
       </div>
       <div class="relative flex items-center justify-center px-1.5 py-0.5">
         <div class="absolute inset-0 bg-red-600 blur-[4px] rounded-full animate-pulse"></div>
         <div class="relative z-10 flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 border border-yellow-300 px-1 py-0.5 rounded-md">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </div>
     </button>

     <!-- ========================================== -->
     <!-- NHÓM THƯỜNG (03 ĐẾN 08) -->
     <!-- ========================================== -->
     <div class="space-y-1 border-t border-slate-800/30 pt-3">
       
       <!-- 03. GOOGLE MAP -->
       <button @click="navigateTo('/job/google-map')" class="w-full flex items-center justify-between px-3 py-2 rounded-[14px] hover:bg-[#151b2b] text-slate-400 hover:text-white transition-all group">
         <div class="flex items-center gap-3">
           <div class="w-7 h-7 rounded-lg bg-[#0d121f] border border-slate-700/50 flex items-center justify-center shadow-md group-hover:scale-110 transition-all shrink-0"><span class="text-emerald-500 font-black text-[8px]">MAP</span></div>
           <span class="text-[11px] font-bold">Google Map</span>
         </div>
         <div class="flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 px-1.5 py-0.5 rounded-md border border-yellow-400/30 scale-90">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </button>

       <!-- 04. THREADS -->
       <button @click="navigateTo('/job/dang-bai-threads')" class="w-full flex items-center justify-between px-3 py-2 rounded-[14px] hover:bg-[#151b2b] text-slate-400 hover:text-white transition-all group">
         <div class="flex items-center gap-3">
           <div class="w-7 h-7 rounded-lg bg-[#0d121f] border border-slate-700/50 flex items-center justify-center shadow-md group-hover:scale-110 transition-all shrink-0"><span class="text-white font-black text-[8px]">TH</span></div>
           <span class="text-[11px] font-bold">Đăng bài Threads</span>
         </div>
         <div class="flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 px-1.5 py-0.5 rounded-md border border-yellow-400/30 scale-90">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </button>

       <!-- 05. VIEW THREADS -->
       <button @click="navigateTo('/job/luot-xem-threads')" class="w-full flex items-center justify-between px-3 py-2 rounded-[14px] hover:bg-[#151b2b] text-slate-400 hover:text-white transition-all group">
         <div class="flex items-center gap-3">
           <div class="w-7 h-7 rounded-lg bg-[#0d121f] border border-pink-500/40 flex items-center justify-center shadow-md group-hover:scale-110 transition-all shrink-0"><span class="text-pink-500 font-black text-[8px]">VIEW</span></div>
           <span class="text-[11px] font-bold">Lượt xem Threads</span>
         </div>
         <div class="flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 px-1.5 py-0.5 rounded-md border border-yellow-400/30 scale-90">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </button>

       <!-- 06. ZALO -->
       <button @click="navigateTo('/job/join-zalo')" class="w-full flex items-center justify-between px-3 py-2 rounded-[14px] hover:bg-[#151b2b] text-slate-400 hover:text-white transition-all group">
         <div class="flex items-center gap-3">
           <div class="w-7 h-7 rounded-lg bg-[#0d121f] border border-slate-700/50 flex items-center justify-center shadow-md group-hover:scale-110 transition-all shrink-0"><span class="text-blue-400 font-black text-[8px]">ZALO</span></div>
           <span class="text-[11px] font-bold">Nhóm Zalo</span>
         </div>
         <div class="flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 px-1.5 py-0.5 rounded-md border border-yellow-400/30 scale-90">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </button>

       <!-- 07. VPBANK -->
       <button @click="navigateTo('/job/vpbank')" class="w-full flex items-center justify-between px-3 py-2 rounded-[14px] hover:bg-[#151b2b] text-slate-400 hover:text-white transition-all group">
         <div class="flex items-center gap-3">
           <div class="w-7 h-7 rounded-lg bg-[#0d121f] border border-slate-700/50 flex items-center justify-center shadow-md group-hover:scale-110 transition-all shrink-0"><span class="text-emerald-500 font-black text-[8px]">VPB</span></div>
           <span class="text-[11px] font-bold">APP VPBank</span>
         </div>
         <div class="flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 px-1.5 py-0.5 rounded-md border border-yellow-400/30 scale-90">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </button>

       <!-- 08. TPBANK -->
       <button @click="navigateTo('/job/tpbank')" class="w-full flex items-center justify-between px-3 py-2 rounded-[14px] hover:bg-[#151b2b] text-slate-400 hover:text-white transition-all group">
         <div class="flex items-center gap-3">
           <div class="w-7 h-7 rounded-lg bg-[#0d121f] border border-slate-700/50 flex items-center justify-center shadow-md group-hover:scale-110 transition-all shrink-0"><span class="text-purple-500 font-black text-[8px]">TPB</span></div>
           <span class="text-[11px] font-bold">APP TPBank</span>
         </div>
         <div class="flex items-center gap-0.5 bg-gradient-to-r from-red-600 to-orange-500 px-1.5 py-0.5 rounded-md border border-yellow-400/30 scale-90">
           <span class="text-[7px] text-white font-black">HOT</span><span class="text-[9px]">🔥</span>
         </div>
       </button>
     </div>
   </div>

   <!-- PHẦN 3: ĐĂNG XUẤT -->
   <div class="p-4 border-t border-slate-800/50 bg-[#0d121f]/50 shrink-0">
     <div v-if="isLoggedIn">
       <button @click="emit('logout')" class="w-full py-2.5 text-slate-500 hover:text-red-400 text-[10px] font-black tracking-[2px] transition-colors border border-slate-800/50 hover:border-red-500/30 hover:bg-red-500/10 rounded-xl">
         ĐĂNG XUẤT
       </button>
     </div>
     <div v-else class="text-center py-1 text-[9px] text-slate-600 opacity-40 tracking-widest">
       MMO PRO SYSTEM
     </div>
   </div>
 </aside>
</template>

<style scoped>
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
.normal-case { text-transform: none; }
.animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .7; transform: scale(1.05); } }
</style>