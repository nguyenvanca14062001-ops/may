<script setup lang="ts">
// Chỉ giữ lại logic FAQ, xóa bỏ phần Footer sơ sài để không bị lặp với App.vue
const emit = defineEmits(['contactSupport']);
const faqs = [
  { id: '01', q: 'KHI NÀO TÔI NHẬN ĐƯỢC TIỀN?', a: 'TIỀN THƯỞNG SẼ CỘNG VÀO VÍ TRONG VÒNG 1 GIỜ NGAY SAU KHI NỘP ẢNH BẰNG CHỨNG HỢP LỆ.' },
  { id: '02', q: 'RÚT TIỀN TỐI THIỂU LÀ BAO NHIÊU?', a: 'HẠN MỨC RÚT TỐI THIỂU TỪ 200.000Đ VỀ MỌI NGÂN HÀNG VIỆT NAM 24/7.' },
  { id: '03', q: 'LÀM NHIỀU VIỆC CÙNG LÚC ĐƯỢC KHÔNG?', a: 'HOÀN TOÀN ĐƯỢC! BẠN CÓ THỂ THỰC HIỆN TẤT CẢ NHIỆM VỤ HIỂN THỊ ĐỂ GIA TĂNG THU NHẬP.' },
  { id: '04', q: 'TẠI SAO BẰNG CHỨNG BỊ TỪ CHỐI?', a: 'VUI LÒNG ĐẢM BẢO ẢNH CHỤP MÀN HÌNH RÕ NÉT, KHÔNG CẮT GHÉP VÀ LÀM ĐÚNG YÊU CẦU.' }
];
</script>

<template>
  <!-- FAQ - PHẦN NÀY SẼ HIỆN DƯỚI LỊCH SỬ HOẠT ĐỘNG -->
  <section class="space-y-10 font-black italic uppercase mt-20 mb-20">
    <div class="flex items-center gap-4">
      <div class="w-2.5 h-10 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]"></div>
      <h3 class="text-3xl md:text-5xl text-white tracking-tighter uppercase italic leading-none font-black">
        GIẢI ĐÁP <span class="text-blue-500">THẮC MẮC</span>
      </h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div 
        v-for="f in faqs" 
        :key="f.id" 
        class="bg-[#111726]/40 p-10 rounded-[40px] border border-slate-800/50 hover:bg-[#111726]/60 transition-all group"
      >
        <p class="text-blue-500 text-xs font-black italic uppercase tracking-widest mb-4">
          #{{ f.id }}. {{ f.q }}
        </p>
        <p class="text-slate-500 text-sm italic font-black uppercase leading-relaxed group-hover:text-slate-300 transition-colors opacity-70">
          {{ f.a }}
        </p>
      </div>
    </div>
  </section>

  <!-- ĐÃ XOÁ PHẦN FOOTER SƠ SÀI Ở ĐÂY ĐỂ TRÁNH LẶP LẠI VỚI APP.VUE -->
</template>

<style scoped>
/* Thêm một chút padding để tách biệt với các section khác nếu cần */
section {
  scroll-margin-top: 100px;
}
</style>