<script setup lang="ts">
/**
 * SIDEBAR COMPONENT - MÂY FREELANCE (FIXED TAGS)
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
 <div v-if="isMenuOpen" @click="emit('toggleMenu')" class="fixed inset-0 bg-pink-900/20 z-[110] lg:hidden backdrop-blur-sm"></div>

 <aside :class="[
    'fixed lg:sticky top-0 left-0 h-screen w-[260px] md:w-[280px] bg-white border-r border-pink-100 flex flex-col transition-transform duration-300 z-[120] shadow-xl lg:shadow-none overflow-y-auto selection:bg-pink-500/30 font-black italic text-left uppercase',
    isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
 ]">
   
    <div class="py-5 px-4 flex flex-col items-center justify-center border-b border-pink-50 shrink-0">
      <div @click="navigateTo('/')" class="text-center cursor-pointer hover:scale-105 transition-transform">
        <h1 class="text-slate-800 text-3xl font-black tracking-tighter drop-shadow-sm">
          MÂY <span class="text-pink-500">FREELANCE</span>
        </h1>
        <p class="text-[9px] text-pink-400 tracking-[4px] mt-0.5 font-bold">CREATOR HUB</p>
      </div>
    </div>

    <div class="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
      <p class="text-slate-400 text-[9px] tracking-[3px] px-3 mb-1.5 opacity-60 italic">TRANG CHÍNH</p>

      <button @click="navigateTo('/')" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] bg-pink-50 border border-pink-200 text-pink-600 text-[13px] font-bold shadow-sm mb-0.5 transition-all active:scale-95">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect></svg>
        Trang Chủ
      </button>

      <button @click="navigateTo('/profile', true)" class="w-full relative flex items-center gap-3 px-4 py-3 rounded-[14px] bg-gradient-to-r from-pink-500/10 to-purple-500/5 border border-pink-300 hover:bg-pink-100 text-pink-600 text-[13px] font-black transition-all group my-2">
        <div class="absolute -top-2 -right-1 z-20 flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[7px] px-2 py-1 rounded-bl-xl rounded-tr-lg font-black italic animate-bounce shadow-md">
          SIÊU HOT 🔥
        </div>
        <svg class="w-4 h-4 shrink-0 text-pink-500 group-hover:scale-110 transition-transform animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Nhận Quà 300k
      </button>

      <button @click="navigateTo('/profile', true)" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-pink-50 text-slate-600 text-[13px] font-bold hover:text-pink-600 transition-all">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        Hồ Sơ Cá Nhân
      </button>

      <button @click="navigateTo('/submit-report', true)" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-pink-50 text-slate-600 text-[13px] font-bold hover:text-pink-600 transition-all">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><polyline points="9 15 11 17 15 13"></polyline></svg>
        Gửi Bằng Chứng
      </button>

      <button @click="handleHistoryClick" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-pink-50 text-slate-600 text-[13px] font-bold hover:text-pink-600 transition-all">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>
        Nhật ký sáng tạo
      </button>

      <button @click="navigateTo('/withdraw', true)" class="w-full flex items-center gap-3 px-4 py-2.5 rounded-[14px] hover:bg-pink-50 text-slate-600 text-[13px] font-bold hover:text-pink-600 transition-all">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        Rút Cát-xê
      </button>

      <p class="text-slate-400 text-[9px] tracking-[3px] px-3 mb-1.5 mt-3 border-t border-pink-50 pt-3 opacity-60 italic">DANH SÁCH CÔNG VIỆC</p>

      <button @click="navigateTo('/job/katinat-threads')" class="w-full relative flex items-center justify-between px-3 py-3 rounded-[18px] bg-red-50 border-2 border-red-200 hover:border-red-400 transition-all group mb-2 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-red-500 flex items-center justify-center shadow-sm shrink-0"><span class="text-white font-black text-[12px]">🥤</span></div>
          <div class="text-left"><span class="text-red-700 text-[11px] block leading-none mb-1">KATINAT</span><span class="text-slate-400 text-[12px] normal-case font-bold">Cát-xê 50k</span></div>
        </div>
        <div class="bg-gradient-to-r from-red-500 to-orange-500 px-1 py-0.5 rounded-md border border-red-200">
           <span class="text-[7px] text-white font-black">HOT 🔥</span>
        </div>
      </button>

      <button @click="navigateTo('/job/product-review')" class="w-full relative flex items-center justify-between px-3 py-3 rounded-[18px] bg-rose-50 border-2 border-rose-100 hover:border-rose-300 transition-all group mb-4 shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-rose-400 flex items-center justify-center shadow-sm shrink-0"><span class="text-white font-black text-[12px]">💄</span></div>
          <div class="text-left"><span class="text-rose-700 text-[11px] block leading-none mb-1">REVIEWER</span><span class="text-slate-400 text-[12px] normal-case font-bold">Cát-xê 60k</span></div>
        </div>
        <div class="bg-gradient-to-r from-rose-400 to-pink-500 px-1 py-0.5 rounded-md border border-rose-200">
           <span class="text-[7px] text-white font-black">HOT 🔥</span>
        </div>
      </button>

      <div class="space-y-1 border-t border-pink-50 pt-3 pb-4">
        <button v-for="item in [
          {id: 'google-map-katinat', label: 'Map x Katinat', tag: '📍', color: 'text-cyan-500'},
          {id: 'share-fanpage-cosmetics', label: 'Seeding Mỹ Phẩm', tag: '💬', color: 'text-pink-500'},
          {id: 'write-content', label: 'Viết Blog/Content', tag: '✍️', color: 'text-pink-500'},
          {id: 'edit-video', label: 'Edit Video CapCut', tag: '🎬', color: 'text-purple-500'},
          {id: 'app-chung-khoan', label: 'App Chứng Khoán', tag: '📈', color: 'text-blue-500'},
          {id: 'vpbank', label: 'Mở ví Lady VPBank', tag: 'VPB', color: 'text-emerald-600'},
          {id: 'tpbank', label: 'Ambassador TPBank', tag: 'TPB', color: 'text-purple-600'},
          {id: 'msb-bank', label: 'Cộng tác viên MSB', tag: 'MSB', color: 'text-red-500'}
        ]" :key="item.id" @click="navigateTo('/job/' + item.id)" class="w-full flex items-center justify-between px-3 py-2 rounded-[14px] hover:bg-pink-50 text-slate-600 hover:text-pink-600 transition-all group">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-lg bg-white border border-pink-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-all shrink-0"><span :class="[item.color, 'font-black text-[10px]']">{{item.tag}}</span></div>
            <span class="text-[11px] font-bold">{{item.label}}</span>
          </div>
          <div class="bg-gradient-to-r from-pink-400 to-purple-500 px-1.5 py-0.5 rounded-md scale-90">
            <span class="text-[7px] text-white font-black">HOT 🔥</span>
          </div>
        </button>
      </div>
    </div> <div class="p-4 border-t border-pink-50 bg-pink-50/30 shrink-0">
      <div v-if="isLoggedIn">
        <button @click="emit('logout')" class="w-full py-2.5 text-slate-400 hover:text-red-500 text-[10px] font-black tracking-[2px] transition-colors border border-pink-100 hover:border-red-300 hover:bg-red-50 rounded-xl bg-white shadow-sm">
          ĐĂNG XUẤT
        </button>
      </div>
      <div v-else class="text-center py-1 text-[9px] text-pink-300 opacity-80 tracking-widest uppercase font-black">
        MÂY FREELANCE
      </div>
    </div>
 </aside>
</template>

<style scoped>
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #fce7f3; border-radius: 10px; }
.normal-case { text-transform: none; }
.animate-pulse { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .7; transform: scale(1.05); } }
</style>