<script setup lang="ts">
const emit = defineEmits(['contactSupport']);

const faqs = [
  {
    id: '01',
    question: 'KHI NÀO TÔI NHẬN ĐƯỢC NHUẬN BÚT?',
    answer: 'Nhuận bút sẽ được tự động cộng vào ví Mây Freelance của nàng trong vòng 1-24h ngay sau khi sản phẩm/bài viết được nhãn hàng duyệt thành công.'
  },
  {
    id: '02',
    question: 'HẠN MỨC RÚT TIỀN TỐI THIỂU LÀ BAO NHIÊU?',
    answer: 'Nàng có thể rút tiền bất cứ lúc nào khi số dư đạt từ 200.000đ trở lên. Hỗ trợ rút về mọi ngân hàng Việt Nam, 24/7 kể cả cuối tuần.'
  },
  {
    id: '03',
    question: 'CÓ THỂ NHẬN NHIỀU JOB CÙNG LÚC KHÔNG?',
    answer: 'Hoàn toàn được nàng nhé! Tùy vào thời gian rảnh, nàng có thể nhận nhiều công việc (Viết bài, Edit Video...) để gia tăng thu nhập tối đa.'
  },
  {
    id: '04',
    question: 'TẠI SAO BÀI NỘP CỦA TÔI BỊ TỪ CHỐI?',
    answer: 'Thường do hình ảnh nghiệm thu bị mờ, cắt ghép, hoặc nội dung bài viết copy từ nguồn khác. Hãy làm cẩn thận theo đúng yêu cầu của từng Job nhé.'
  }
];
</script>

<template>
  <section class="space-y-6 pt-6">
    <div class="flex items-center gap-3 px-1">
      <div class="w-1.5 h-6 bg-[#ED4E95] rounded-full shadow-[0_0_10px_rgba(237,78,149,0.4)]"></div>
      <h3 class="text-lg md:text-3xl text-slate-800 tracking-tighter italic font-black uppercase">GÓC <span class="text-[#ED4E95]">GIẢI ĐÁP</span></h3>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div v-for="faq in faqs" :key="faq.id" 
           class="bg-white border border-pink-100 rounded-[24px] p-6 md:p-8 hover:shadow-md transition-all group relative overflow-hidden">
        
        <div class="absolute -right-6 -top-6 w-24 h-24 bg-pink-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>

        <div class="relative z-10">
          <p class="text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-[10px] md:text-[11px] font-black tracking-widest uppercase mb-2">
            #{{ faq.id }}. {{ faq.question }}
          </p>
          <p class="text-slate-500 text-[11px] md:text-[13px] font-medium leading-relaxed">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>