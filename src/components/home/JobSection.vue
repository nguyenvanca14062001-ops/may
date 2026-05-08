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

// Cập nhật màu sắc cho các ô thống kê
const userStats = [
  { label: 'SỐ DƯ KHẢ DỤNG', key: 'balance', unit: 'Đ', color: 'text-pink-600', icon: '💰', bgIcon: '💸' },
  { label: 'TỔNG ĐÃ RÚT', key: 'withdrawn', unit: 'Đ', color: 'text-purple-600', icon: '💸', bgIcon: '🏦' },
  { label: 'CẤP BẬC TÀI KHOẢN', key: 'rank', value: 'THÀNH VIÊN', unit: '', color: 'text-slate-700', icon: '👑', bgIcon: '🏆' },
  { label: 'THU NHẬP TUẦN NÀY', key: 'weekly', value: '0', unit: 'Đ', color: 'text-emerald-500', icon: '📈', bgIcon: '📊' }
];

const getJobIcon = (id: string) => {
  const config: Record<string, { t: string, c: string }> = { 
    'katinat-threads': { t: '🥤', c: 'text-white' },
    'google-map-katinat': { t: '📍', c: 'text-white' },
    'share-fanpage-cosmetics': { t: '💬', c: 'text-white' },
    'msb-bank': { t: 'MSB', c: 'text-white' }, 
    'app-chung-khoan': { t: '📈', c: 'text-white' },
    'vpbank': { t: 'VPB', c: 'text-white' }, 
    'tpbank': { t: 'TPB', c: 'text-white' },
    'write-content': { t: '✍️', c: 'text-white' },
    'edit-video': { t: '🎬', c: 'text-white' },
    'product-review': { t: '💄', c: 'text-white' }
  };
  const res = config[id] || { t: '✨', c: 'text-white' };
  return { type: 'text', content: res.t, colorClass: res.c };
};

const getShortDesc = (id: string) => {
    const desc: Record<string, string> = {
        'katinat-threads': 'Lan tỏa chiến dịch Dệt Gấm Vóc Tự Hào cực viral của Katinat', 
        'google-map-katinat': 'Đánh giá 5 sao cho cửa hàng Katinat trên Google Map',
        'share-fanpage-cosmetics': 'Để lại bình luận xinh xắn và chia sẻ bài viết của nhãn hàng',
        'msb-bank': 'Trở thành cộng tác viên mở thẻ ngân hàng MSB online',
        'app-chung-khoan': 'Tải App đăng ký tài khoản thành công , nhận thưởng ',
        'vpbank': 'Mở ví tài khoản số đẹp dành riêng cho phái đẹp VPBank', 
        'tpbank': 'Đăng ký nhanh gọn, nhận thưởng tinh tế từ ngân hàng VPBANK',
        'write-content': 'Viết bài chia sẻ cảm nhận, mẹo hay trên blog của Mây',
        'edit-video': 'Biến những clip thô thành video triệu view trên Tiktok/Reels',
        'product-review': 'Nhận sample mỹ phẩm, chụp ảnh và feedback xinh xắn'
    };
    return desc[id] || 'Công việc tự do, làm tại nhà cực chill';
}
</script>

<template>
  <div class="space-y-6 animate-in fade-in duration-700 text-left lowercase-none">
    
    <div class="pt-2 pb-6 border-b border-pink-100/60">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black italic tracking-tighter uppercase mb-2">
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0] drop-shadow-sm">
          ☁️ MÂY FREELANCE
        </span>
      </h1>
      <h2 class="text-[#ED4E95] text-sm md:text-lg font-black tracking-[0.1em] uppercase italic mb-4">
        Làm việc chill chill - Tiền về ting ting ✨
      </h2>
      <p class="text-slate-500 text-[11px] md:text-[14px] font-medium leading-relaxed max-w-4xl bg-white/50 p-4 rounded-2xl border border-pink-50">
        Nền tảng dành riêng cho hội chị em Creator, KOC và Freelancer sành điệu. Thoải mái lựa chọn các Job "nhẹ nhàng" như: <strong>Viết Blog, Edit Video, Review Sản phẩm...</strong> Không gò bó thời gian, tự do sáng tạo và gia tăng thu nhập mỗi ngày!
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-4">
      <section class="lg:w-2/3 relative bg-gradient-to-br from-[#ED4E95] to-[#A061F0] rounded-[30px] p-6 md:p-10 overflow-hidden flex items-center min-h-[200px] md:min-h-[400px] shadow-lg">
        
        <div class="absolute -right-20 -top-20 w-[300px] h-[300px] bg-white/20 rounded-full blur-[90px]"></div>
        
        <div class="relative z-10 space-y-4 w-full md:w-[65%]">
          <div class="inline-flex items-center gap-1.5 bg-white/20 text-white text-[9px] md:text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> ONLINE
          </div>
          
          <h1 class="text-2xl md:text-5xl text-white leading-tight tracking-tighter uppercase font-black italic">
            CHÀO MỪNG,<br/>
            <span class="text-white text-3xl md:text-6xl drop-shadow-md">
              {{ username.toUpperCase() }}
            </span>
          </h1>
          
          <div class="border-l-4 border-white/50 pl-4 max-w-2xl space-y-2">
            <p class="text-white/90 text-[12px] md:text-[15px] font-medium leading-relaxed">
              Khám phá các góc sáng tạo hôm nay. Chăm chỉ chạy số, nhận nhuận bút đầy túi nàng nhé!
            </p>
            <p class="text-yellow-200 text-[10px] md:text-[13px] font-bold tracking-wide">
              ⚠️ CẢNH BÁO: Nghiêm cấm copy nội dung hoặc hình ảnh ảo. Khóa vĩnh viễn nếu vi phạm.
            </p>
          </div>
          
          <div class="pt-3 flex flex-wrap gap-2 md:gap-3">
            <button v-if="!isLoggedIn" @click="emit('routerPush', '/login')" class="bg-white text-[#ED4E95] w-full md:w-auto px-8 py-3.5 rounded-xl text-[10px] md:text-[12px] shadow-lg uppercase font-black italic transition-all active:scale-95 hover:bg-pink-50">
              ĐĂNG KÝ / ĐĂNG NHẬP NGAY
            </button>
            <template v-else>
              <button @click="emit('contactSupport', 'facebook')" class="flex-1 md:flex-none justify-center bg-[#1877F2] text-white px-5 py-3.5 rounded-xl text-[10px] md:text-[12px] shadow-md uppercase font-black italic transition-all active:scale-95 flex items-center gap-2 hover:bg-blue-600">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                FANPAGE
              </button>
              <button @click="emit('contactSupport', 'zalo')" class="flex-1 md:flex-none justify-center bg-white text-[#0068FF] px-5 py-3.5 rounded-xl text-[10px] md:text-[12px] shadow-md uppercase font-black italic transition-all active:scale-95 flex items-center gap-2 border border-blue-100 hover:bg-blue-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" class="w-4 h-4 md:w-5 md:h-5" />
                NHÓM KÍN
              </button>
            </template>
          </div>
        </div>

        <div class="absolute right-5 lg:right-10 top-0 bottom-0 hidden md:flex items-center justify-center pointer-events-none">
          <div class="relative animate-jump-cycle">
            <div class="text-[120px] lg:text-[150px] filter drop-shadow-2xl rotate-12">☁️</div>
          </div>
        </div>
      </section>

      <div class="lg:w-1/3 grid grid-cols-2 gap-3">
        <div v-for="stat in userStats" :key="stat.label" 
             class="bg-white border border-pink-100 rounded-[25px] p-4 md:p-5 flex flex-col justify-between min-h-[110px] md:min-h-[180px] relative overflow-hidden shadow-sm group hover:shadow-md transition-all">
          
          <div class="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 text-6xl md:text-8xl opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 pointer-events-none grayscale">
            {{ stat.bgIcon }}
          </div>

          <p class="text-slate-400 text-[8px] md:text-[10px] tracking-[1px] font-bold uppercase relative z-10">{{ stat.label }}</p>
          
          <div class="relative z-10 mt-auto">
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

    <section class="space-y-4 pt-6">
      <div class="flex items-center gap-3 px-1">
        <div class="w-1.5 h-6 bg-[#ED4E95] rounded-full shadow-[0_0_10px_rgba(237,78,149,0.4)]"></div>
        <h3 class="text-lg md:text-3xl text-slate-800 tracking-tighter italic font-black uppercase">GÓC SÁNG TẠO <span class="text-[#ED4E95]">HOT</span></h3>
      </div>
      
      <div class="bg-white/50 border border-pink-100 rounded-[30px] p-3 md:p-8 shadow-sm">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div v-for="(j, id, index) in jobsData" :key="id" @click="handleJobClick(id as string)" 
            class="relative p-5 md:p-7 rounded-[28px] bg-white border border-pink-50 transition-all duration-300 flex flex-col group cursor-pointer active:scale-95 shadow-sm hover:shadow-md hover:border-pink-200 overflow-hidden"
          >
            <div class="absolute -top-1 -right-1 z-20 flex items-center gap-1 text-[9px] md:text-[10px] tracking-widest px-3 py-1.5 rounded-bl-2xl rounded-tr-[27px] font-black italic uppercase text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md">
              {{ (j.badge ? j.badge : 'HOT') }}
            </div>

            <div class="flex justify-between items-start mb-4 relative z-10">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 border border-white/20 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 text-white text-2xl" 
                   v-html="getJobIcon(id as string).content">
              </div>
              
              <span class="text-4xl md:text-6xl font-black opacity-[0.05] group-hover:opacity-[0.1] transition-opacity text-pink-500">
                {{ (index + 1).toString().padStart(2, '0') }}
              </span>
            </div>
            
            <h4 class="text-[13px] md:text-lg text-slate-800 font-black italic uppercase leading-tight mb-1 group-hover:text-pink-600 transition-colors">
              {{ j.title }}
            </h4>
            
            <p class="text-[10px] md:text-[13px] text-slate-500 font-medium line-clamp-2 leading-relaxed mb-4 mt-1">
               {{ getShortDesc(id as string) }}
            </p>
            
            <div class="mt-auto">
             <p class="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cát-xê:</p>
              <p class="font-black text-xl md:text-3xl tracking-tighter italic leading-none text-pink-600">
                {{ j.reward }}
              </p>
            </div>
            
            <button class="w-full mt-4 py-3 md:py-4 rounded-xl text-[10px] md:text-[11px] font-black italic uppercase transition-all shadow-md bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white hover:opacity-90">
              NHẬN JOB ⚡
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Giữ nguyên các hiệu ứng cần thiết */
.animate-jump-cycle {
  animation: jump 3s ease-in-out infinite;
}
@keyframes jump {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-20px) rotate(15deg); }
}
</style>