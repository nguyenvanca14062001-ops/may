<script setup lang="ts">
import { jobsData } from '@/data/jobs'; 

defineProps<{ 
  username: string; 
  isLoggedIn: boolean; 
  userBalance: number;
  totalWithdrawn?: number 
}>();

const emit = defineEmits(['receiveJob', 'contactSupport', 'routerPush']);

const handleJobClick = (id: string) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(50);
  }
  emit('receiveJob', id);
}

// BƯỚC 4: Đã thêm bgIcon để làm Watermark chìm
const userStats = [
  { label: 'SỐ DƯ KHẢ DỤNG', key: 'balance', unit: 'Đ', color: 'text-blue-500', icon: '💰', bgIcon: '💸' },
  { label: 'TỔNG ĐÃ RÚT', key: 'withdrawn', unit: 'Đ', color: 'text-rose-400/90', icon: '💸', bgIcon: '🏦' },
  { label: 'CẤP BẬC TÀI KHOẢN', key: 'rank', value: 'THÀNH VIÊN', unit: '', color: 'text-white/90', icon: '👑', bgIcon: '🏆' },
  { label: 'THU NHẬP TUẦN NÀY', key: 'weekly', value: '0', unit: 'Đ', color: 'text-emerald-400/90', icon: '📈', bgIcon: '📊' }
];

const getJobIcon = (id: string) => {
  if (id === 'google-map') return { type: 'svg', content: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>', colorClass: 'text-[#090e17]' };
  if (id === 'app-chung-khoan') return { type: 'svg', content: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline></svg>', colorClass: 'text-white' };
  
  const config: Record<string, { t: string, c: string }> = { 
    'vpbank': { t: 'VPB', c: 'text-emerald-500' }, 
    'tpbank': { t: 'TPB', c: 'text-purple-500' },
    'msb-bank': { t: 'MSB', c: 'text-white' }, 
    'join-zalo': { t: 'ZALO', c: 'text-blue-400' },
    'dang-bai-threads': { t: 'TH', c: 'text-[#090e17]' },
    'luot-xem-threads': { t: 'VIEW', c: 'text-white' }, 
    'referral-program': { t: 'REF', c: 'text-[#090e17]' }
  };
  const res = config[id] || { t: 'JOB', c: 'text-slate-400' };
  return { type: 'text', content: res.t, colorClass: res.c };
};

// BƯỚC 3: Sửa lại text mô tả cho chuẩn ngôn ngữ App
const getShortDesc = (id: string) => {
    const desc: Record<string, string> = {
        'google-map': 'Đánh giá địa điểm nhận thưởng ngay', 
        'app-chung-khoan': 'Đăng ký tài khoản & KYC đơn giản',
        'vpbank': 'Mở tài khoản số đẹp VPBank', 
        'tpbank': 'Mở tài khoản TPBank Mobile', 
        'msb-bank': 'Nhận quà tặng khi mở thẻ MSB',
        'dang-bai-threads': 'Đăng bài viết lên Threads nhận tiền', 
        'luot-xem-threads': 'Tăng tương tác cho bài viết Threads', 
        'referral-program': 'Mời bạn bè tham gia nhận hoa hồng', 
        'join-zalo': 'Vào nhóm cộng đồng nhận thông báo mới'
    };
    return desc[id] || 'Làm nhiệm vụ ngay';
}
</script>

<template>
  <!-- Đã gỡ bỏ cái font-black uppercase italic ép buộc toàn cục đi -->
  <div class="space-y-4 animate-in fade-in duration-700 text-left">
    
    <div class="flex flex-col lg:flex-row gap-3">
      <!-- BANNER CHÀO MỪNG -->
      <section class="lg:w-2/3 relative bg-gradient-to-br from-[#111726] to-[#0d121f] rounded-[30px] border border-slate-800/60 p-6 md:p-10 overflow-hidden flex items-center min-h-[200px] md:min-h-[400px] shadow-2xl">
        
        <div class="absolute -right-20 -top-20 w-[300px] h-[300px] bg-blue-600/15 rounded-full blur-[90px]"></div>
        
        <div class="relative z-10 space-y-4 w-full md:w-[65%]">
          <div class="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 text-[9px] md:text-[10px] px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> ONLINE
          </div>
          
          <h1 class="text-2xl md:text-5xl text-white leading-tight tracking-tighter uppercase font-black italic">
            CHÀO MỪNG,<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 text-3xl md:text-6xl">
              {{ username.toUpperCase() }}
            </span>
          </h1>
          
          <div class="border-l-4 border-blue-600 pl-4 max-w-2xl space-y-2">
            <p class="text-slate-300 text-[12px] md:text-[15px] font-medium leading-relaxed">
              Nền tảng kiếm tiền Online minh bạch. Rút tiền nhanh gọn 24/7 về mọi ngân hàng.
            </p>
            <p class="text-rose-400 text-[10px] md:text-[13px] font-bold tracking-wide">
              ⚠️ CẢNH BÁO: Nghiêm cấm gian lận hoặc gửi bằng chứng giả. Khóa vĩnh viễn nếu vi phạm.
            </p>
          </div>
          
          <div class="pt-3 flex flex-wrap gap-2 md:gap-3">
            <button v-if="!isLoggedIn" @click="emit('routerPush', '/login')" class="bg-blue-600 hover:bg-blue-500 text-white w-full md:w-auto px-8 py-3.5 rounded-xl text-[10px] md:text-[12px] shadow-xl shadow-blue-900/40 uppercase font-black italic transition-all active:scale-95">
              ĐĂNG KÝ / ĐĂNG NHẬP NGAY
            </button>
            <template v-else>
              <button @click="emit('contactSupport', 'facebook')" class="flex-1 md:flex-none justify-center bg-[#1877F2] hover:bg-blue-600 text-white px-5 py-3.5 rounded-xl text-[10px] md:text-[12px] shadow-xl shadow-blue-900/40 uppercase font-black italic transition-all active:scale-95 flex items-center gap-2 border border-white/10">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                FANPAGE
              </button>
              <button @click="emit('contactSupport', 'zalo')" class="flex-1 md:flex-none justify-center bg-white hover:bg-slate-200 text-[#0068FF] px-5 py-3.5 rounded-xl text-[10px] md:text-[12px] shadow-xl shadow-white/10 uppercase font-black italic transition-all active:scale-95 flex items-center gap-2 border border-slate-200">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" class="w-4 h-4 md:w-5 md:h-5" />
                NHÓM KÍN
              </button>
            </template>
          </div>
        </div>

        <div class="absolute right-5 lg:right-10 top-0 bottom-0 hidden md:flex items-center justify-center pointer-events-none">
          <div class="relative animate-jump-cycle">
            <div class="absolute inset-0 bg-blue-500/30 rounded-full blur-[70px]"></div>
            <div class="text-[120px] lg:text-[150px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] filter contrast-125 saturate-150 rotate-12">🚀</div>
          </div>
        </div>
      </section>

      <!-- Ô THỐNG KÊ (ĐÃ ĐỘ HIỆU ỨNG KÍNH + CHÂN CHỮ BASELINE) -->
      <div class="lg:w-1/3 grid grid-cols-2 gap-3">
        <div v-for="stat in userStats" :key="stat.label" 
             class="bg-gradient-to-b from-[#1a2333]/80 to-[#111726]/90 border border-slate-800/60 border-t-slate-700/80 rounded-[25px] p-4 md:p-5 flex flex-col justify-between min-h-[110px] md:min-h-[180px] relative overflow-hidden shadow-2xl group">
          
          <div class="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 text-6xl md:text-8xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none grayscale">
            {{ stat.bgIcon }}
          </div>

          <p class="text-slate-500 text-[8px] md:text-[10px] tracking-[1px] font-bold uppercase relative z-10">{{ stat.label }}</p>
          
          <div class="relative z-10 mt-auto">
            <!-- Items-baseline giúp chữ Đ chạm sát đáy cùng với con số -->
            <p class="font-black italic tracking-tighter flex items-baseline" :class="stat.color">
                <span class="text-xl md:text-4xl leading-none">
                  {{ stat.key === 'balance' ? userBalance.toLocaleString() : (stat.key === 'rank' ? stat.value : (totalWithdrawn || 0).toLocaleString()) }}
                </span>
                <span v-if="stat.key !== 'rank'" class="text-[9px] md:text-[12px] ml-1 uppercase font-bold opacity-80 not-italic">đ</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- DANH SÁCH CÔNG VIỆC -->
    <section class="space-y-4 pt-2">
      <div class="flex items-center gap-3 px-1">
        <div class="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
        <h3 class="text-lg md:text-3xl text-white tracking-tighter italic font-black uppercase">CÔNG VIỆC <span class="text-emerald-500">HOT</span></h3>
      </div>
      
      <div class="bg-[#111726]/40 border border-slate-800/50 rounded-[30px] p-3 md:p-8 shadow-inner">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(j, id, index) in jobsData" :key="id" @click="handleJobClick(id as string)" 
            class="relative p-5 md:p-7 rounded-[28px] border transition-all duration-500 flex flex-col group cursor-pointer active:scale-95 shadow-2xl overflow-hidden"
            :class="[
              id === 'referral-program' 
                ? 'bg-gradient-to-br from-yellow-600/10 to-orange-600/5 border-yellow-500/50 ring-1 ring-yellow-500/20' 
                : id === 'msb-bank'
                ? 'bg-gradient-to-br from-red-600/10 to-rose-600/5 border-red-500/50 ring-1 ring-red-500/20'
                : id === 'app-chung-khoan'
                ? 'bg-gradient-to-br from-blue-600/10 to-indigo-600/5 border-blue-500/50 ring-1 ring-blue-500/20'
                : id === 'google-map'
                ? 'bg-gradient-to-br from-cyan-600/10 to-teal-600/5 border-cyan-500/50 ring-1 ring-cyan-500/20'
                : id === 'dang-bai-threads' || id === 'luot-xem-threads'
                ? 'bg-gradient-to-br from-purple-600/10 to-fuchsia-600/5 border-purple-500/50 ring-1 ring-purple-500/20'
                : 'bg-[#0d121f] border-slate-800 hover:border-slate-600'
            ]"
          >
            <div class="absolute -top-1 -right-1 z-20 flex items-center gap-1 text-[9px] md:text-[10px] tracking-widest px-3 py-1.5 rounded-bl-2xl rounded-tr-[27px] font-black italic uppercase border border-white/10 shadow-lg"
                 :class="[
                    id === 'referral-program' || id === 'app-chung-khoan' || id === 'msb-bank' ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' : 
                    id === 'google-map' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' :
                    id === 'dang-bai-threads' || id === 'luot-xem-threads' ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white' :
                    'bg-slate-800 text-slate-300' 
                 ]">
              {{ id === 'referral-program' || id === 'app-chung-khoan' || id === 'msb-bank' ? 'SIÊU HOT 🚀' : (j.badge ? j.badge + ' 🔥' : 'CƠ BẢN') }}
            </div>

            <div class="flex justify-between items-start mb-4 relative z-10">
              <div v-if="getJobIcon(id as string).type === 'svg'" 
                   class="w-12 h-12 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-110" 
                   :class="[
                      id === 'app-chung-khoan' ? 'bg-blue-500 border-white/20 text-white shadow-blue-500/30' : 
                      id === 'google-map' ? 'bg-cyan-400 border-white/20 shadow-cyan-500/30 text-[#090e17]' : 
                      'bg-[#111726] border-slate-800 text-cyan-400'
                   ]" 
                   v-html="getJobIcon(id as string).content">
              </div>
              <div v-else class="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg border transition-transform group-hover:scale-110"
                   :class="[
                      id === 'referral-program' ? 'bg-yellow-500 border-white/20 shadow-yellow-500/30' : 
                      id === 'msb-bank' ? 'bg-red-500 border-white/20 shadow-red-500/30' : 
                      id === 'dang-bai-threads' ? 'bg-purple-500 border-white/20 shadow-purple-500/30' :
                      id === 'luot-xem-threads' ? 'bg-fuchsia-500 border-white/20 shadow-fuchsia-500/30' :
                      'bg-[#111726] border-slate-800'
                   ]">
                <span :class="['font-black text-sm md:text-xl italic', getJobIcon(id as string).colorClass]">
                  {{ getJobIcon(id as string).content }}
                </span>
              </div>
              
              <span class="text-4xl md:text-6xl font-black opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" 
                    :class="['referral-program', 'msb-bank', 'app-chung-khoan', 'google-map', 'dang-bai-threads', 'luot-xem-threads'].includes(id as string) ? 'text-white' : 'text-slate-500'">
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>
            </div>
            
            <h4 class="text-[13px] md:text-lg text-white font-black italic uppercase leading-tight mb-1"
                :class="{'text-yellow-400': id === 'referral-program', 'text-red-400': id === 'msb-bank', 'text-blue-400': id === 'app-chung-khoan', 'text-cyan-400': id === 'google-map', 'text-purple-400': id === 'dang-bai-threads', 'text-fuchsia-400': id === 'luot-xem-threads' }">
              {{ j.title }}
            </h4>
            
            <!-- Đã fix thành font thường, dễ đọc hơn -->
            <p class="text-[10px] md:text-[13px] text-slate-400 font-medium line-clamp-2 leading-relaxed mb-4 mt-1">
               {{ getShortDesc(id as string) }}
            </p>
            
            <div class="mt-auto">
              <p class="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Thưởng ngay:</p>
              <p class="font-black text-xl md:text-3xl tracking-tighter italic leading-none" :class="j.color">
                {{ j.reward }}
              </p>
            </div>
            
            <button class="w-full mt-4 py-3 md:py-4 rounded-xl text-[10px] md:text-[11px] font-black italic uppercase transition-all shadow-md"
              :class="[
                id === 'referral-program' ? 'bg-yellow-500 text-[#090e17] border border-white/20' :
                id === 'msb-bank' ? 'bg-red-600 hover:bg-red-500 text-white border border-white/20' :
                id === 'app-chung-khoan' ? 'bg-blue-600 text-white border border-white/10' :
                id === 'google-map' ? 'bg-cyan-500 text-[#090e17] border border-white/20' :
                id === 'dang-bai-threads' ? 'bg-purple-600 text-white border border-white/10' :
                id === 'luot-xem-threads' ? 'bg-fuchsia-600 text-white border border-white/10' :
                'bg-[#1a2333] text-white border border-white/5'
              ]"
            >
              BẮT ĐẦU ⚡
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>