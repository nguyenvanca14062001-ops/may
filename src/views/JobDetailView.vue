<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { jobsData } from '@/data/jobs'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const showGuide = ref(false)
const baseUrl = import.meta.env.BASE_URL

const currentJob = ref(jobsData[route.params.id as string] || jobsData['app-chung-khoan'])

onMounted(() => {
  const jobId = route.params.id as string
  if (jobId && jobsData[jobId]) {
    currentJob.value = jobsData[jobId]
  }
})

// Hàm copy đa năng dùng chung
const handleCopy = (text: string) => {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    Swal.fire({
      title: 'ĐÃ SAO CHÉP!',
      text: 'Đã lưu nội dung vào khay nhớ tạm.',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    })
  }).catch(() => {
    // Dự phòng cho trình duyệt lởm
    const textArea = document.createElement("textarea")
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      Swal.fire({
        title: 'ĐÃ SAO CHÉP!',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end'
      })
    } catch (err) {
      alert('Lỗi sao chép, hãy copy thủ công nhé!')
    }
    document.body.removeChild(textArea)
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#090e17] text-slate-300 p-4 md:p-8 font-black italic uppercase text-left">
    <!-- THANH ĐIỀU HƯỚNG -->
    <div class="flex justify-between items-center mb-8 max-w-4xl mx-auto border-b border-slate-800 pb-4">
      <button @click="router.back()" class="text-[10px] tracking-[3px] text-slate-500 hover:text-white transition-all flex items-center gap-1">
        <span class="text-base font-light not-italic font-sans">✕</span> QUAY LẠI
      </button>
      <span class="text-[10px] tracking-[4px] text-slate-600">HƯỚNG DẪN CHI TIẾT</span>
    </div>

    <div class="max-w-4xl mx-auto space-y-10">
      <!-- HEADER -->
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none mb-5 drop-shadow-lg">
          {{ currentJob.title }}
        </h1>
        <div class="bg-[#052e1f] border border-[#005c3c] rounded-full px-6 py-2.5 w-max mx-auto flex items-center gap-2 shadow-inner">
          <span class="text-[#f59e0b] text-xl">⚡</span>
          <span class="text-[#00df89] text-base md:text-lg font-black italic uppercase tracking-tighter">
            THƯỞNG: {{ currentJob.reward }}
          </span>
        </div>
        
        <!-- CẢNH BÁO CHỐNG GIAN LẬN (CHỈ HIỆN KHI CÓ WARNING TỪ FILE JOBS.TS) -->
        <div v-if="currentJob.warning" class="mt-6 max-w-xl mx-auto bg-[#1a0f14] border border-red-500/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-in fade-in zoom-in duration-500">
          <div class="flex items-start gap-3">
            <span class="text-red-500 text-xl animate-pulse">⚠️</span>
            <p class="text-red-500 text-[11px] md:text-xs font-black uppercase italic tracking-[1px] leading-relaxed text-left">
              {{ currentJob.warning }}
            </p>
          </div>
        </div>
      </div>

      <!-- VÙNG HƯỚNG DẪN -->
      <div class="bg-[#111726] rounded-[45px] border border-slate-800/50 p-6 md:p-10 shadow-2xl relative">
        <div class="text-center space-y-5">
          
          <!-- ========================================================= -->
          <!-- BẢNG MẸO TỰ ĐỘNG HIỆN DÀNH RIÊNG CHO 4 APP NGÂN HÀNG/CK -->
          <!-- ========================================================= -->
          <div v-if="['msb-bank', 'vpbank', 'tpbank', 'app-chung-khoan'].includes(route.params.id as string)"
               class="mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/5 border border-yellow-500/30 rounded-2xl p-4 md:p-5 flex items-start gap-3 md:gap-4 shadow-[0_0_20px_rgba(234,179,8,0.1)] relative overflow-hidden animate-in fade-in duration-700">
            
            <!-- Hiệu ứng vạch màu vàng nổi bật bên trái -->
            <div class="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-yellow-400 to-orange-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]"></div>

            <!-- Icon bóng đèn nảy nảy -->
            <div class="text-2xl md:text-3xl animate-bounce drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] mt-1">💡</div>

            <div class="text-left">
              <h4 class="text-yellow-400 font-black italic uppercase text-[12px] md:text-sm tracking-widest mb-1.5 drop-shadow-md">
                MẸO KIẾM TIỀN:
              </h4>
              <p class="text-slate-300 text-[11px] md:text-[13px] font-medium leading-relaxed normal-case">
                Nếu bạn đã đăng ký APP này rồi, có thể <span class="text-yellow-400 font-black italic text-[12px] md:text-[14px]">giới thiệu bạn bè / người thân đăng ký</span> và chụp lại ảnh bằng chứng gửi lên hệ thống, bạn <span class="text-yellow-400 font-black italic text-[12px] md:text-[14px]">vẫn được nhận hoa hồng</span> bình thường nhé! 🚀
              </p>
            </div>
          </div>
          <!-- ========================================================= -->

          <button @click="showGuide = !showGuide" 
            class="group relative w-full flex items-center gap-4 bg-[#0d121f] border-2 border-emerald-500/30 hover:border-emerald-500/60 p-5 rounded-3xl transition-all mt-4">
            <div class="text-4xl group-hover:scale-110 transition-transform">📖</div>
            <div class="text-left">
              <h3 class="text-lg text-white font-black italic leading-none mb-1 uppercase">XEM HƯỚNG DẪN VÀ LÀM THEO {{currentJob.steps?.length || 0}} BƯỚC </h3>
              <p class="text-[#00df89] text-[8px] tracking-[1px] font-black uppercase italic">NHẤN ĐỂ MỞ TỪNG BƯỚC LÀM</p>
            </div>
          </button>
        </div>

        <div v-if="showGuide" class="mt-8 pt-8 border-t border-slate-800/50 space-y-8 animate-in fade-in duration-500">
          <div v-for="step in currentJob.steps" :key="step.id" class="relative pl-10">
            <!-- ĐƯỜNG KẺ DỌC DẪN BƯỚC -->
            <div class="absolute left-4 top-0 bottom-0 w-[2px] bg-slate-700/30"></div>
            
            <!-- ICON SỐ BƯỚC -->
            <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#00df89] text-[#090e17] flex items-center justify-center text-sm font-black shadow-lg shadow-emerald-500/20">
              {{ step.id }}
            </div>

            <div class="pb-8">
              <h4 class="text-[#3b82f6] text-base md:text-lg italic font-black mb-2 uppercase tracking-tight">
                {{ step.title }}
              </h4>
              <p class="text-slate-400 text-xs italic normal-case opacity-80 leading-relaxed mb-5">
                {{ step.content }}
              </p>

              <!-- DANH SÁCH CÁC NỘI DUNG CẦN SAO CHÉP (Cho Threads) -->
              <div v-if="step.copyContents" class="mb-8 space-y-4 max-w-lg">
                <div v-for="(item, index) in step.copyContents" :key="index" class="bg-[#0d121f] border border-slate-700 rounded-2xl p-4 shadow-inner">
                  <p class="text-[10px] text-emerald-400 font-black mb-2 tracking-[2px] uppercase italic border-b border-slate-800 pb-2">⭐ {{ item.label }}</p>
                  <div class="text-slate-300 text-xs normal-case italic opacity-90 mb-4 whitespace-pre-wrap leading-relaxed select-all">
                    {{ item.text }}
                  </div>
                  <button @click="handleCopy(item.text)" 
                    class="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-[11px] font-black transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
                    📋 SAO CHÉP {{ item.label }}
                  </button>
                </div>
              </div>

              <!-- Ô SAO CHÉP LINK (Dành cho giới thiệu) -->
              <div v-if="step.referralLink" class="mb-6 max-w-md">
                <div class="bg-[#0d121f] border border-slate-700 p-2 rounded-xl flex items-center gap-2 shadow-xl">
                  <input readonly :value="step.referralLink" 
                    class="flex-1 bg-transparent border-none text-[10px] text-emerald-400 font-black italic px-2 outline-none overflow-hidden text-ellipsis whitespace-nowrap" />
                  <button @click="handleCopy(step.referralLink)" 
                    class="bg-emerald-500 hover:bg-emerald-600 text-[#090e17] px-4 py-2 rounded-lg text-[10px] font-black transition-all active:scale-95">
                    SAO CHÉP LINK
                  </button>
                </div>
              </div>

              <!-- NÚT TẢI APP / THAM GIA NHÓM -->
              <div v-if="step.downloadLink" class="mb-6">
                <a :href="step.downloadLink" target="_blank"
                  class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-[11px] font-black uppercase hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95">
                  {{ step.buttonText || 'TẢI APP NGAY ➔' }}
                </a>
              </div>

              <!-- MEDIA & NOTES -->
              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div v-if="step.img" class="w-full md:max-w-[400px] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl bg-slate-900">
                  <img :src="baseUrl + step.img" class="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
                </div>

                <div v-if="step.note" class="bg-[#0d121f] border-l-4 border-blue-500 p-6 rounded-2xl flex-1 shadow-lg">
                  <p class="text-blue-400 text-[10px] font-black tracking-[2px] mb-2 uppercase italic">Thông tin quan trọng</p>
                  <h5 class="text-white text-lg md:text-xl font-black italic leading-tight uppercase">{{ step.note }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER NỘP BẰNG CHỨNG -->
      <section class="bg-[#111726] rounded-[45px] border border-slate-800/50 p-8 md:p-10 text-center shadow-xl mb-20">
        <h2 class="text-lg text-slate-400 font-black italic mb-6 tracking-wide uppercase opacity-60">BẠN ĐÃ LÀM XONG?</h2>
        <button @click="router.push('/submit-report')" 
          class="w-full bg-[#00df89] hover:bg-[#00c578] text-[#090e17] py-5 rounded-2xl text-xl font-black italic uppercase shadow-[0_10px_40px_rgba(0,223,137,0.25)] transition-all active:scale-95">
          NỘP BẰNG CHỨNG NGAY
        </button>
      </section>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar { width: 0px; }
.animate-in { animation-duration: 0.5s; }
.zoom-in { animation: zoomIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>