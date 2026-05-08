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

// Hàm copy đa năng dùng chung (Đã sửa Popup thành màu Trắng Hồng)
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
      position: 'top-end',
      background: '#ffffff',
      color: '#ED4E95',
      iconColor: '#ED4E95'
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
        position: 'top-end',
        background: '#ffffff',
        color: '#ED4E95',
        iconColor: '#ED4E95'
      })
    } catch (err) {
      alert('Lỗi sao chép, hãy copy thủ công nhé!')
    }
    document.body.removeChild(textArea)
  })
}
</script>

<template>
  <div class="min-h-screen bg-transparent text-slate-700 p-4 md:p-8 font-black italic uppercase text-left lowercase-none">
    
    <div class="flex justify-between items-center mb-8 max-w-4xl mx-auto border-b border-pink-100 pb-4">
      <button @click="router.back()" class="text-[10px] tracking-[3px] text-slate-400 hover:text-pink-500 transition-all flex items-center gap-1">
        <span class="text-base font-light not-italic font-sans">✕</span> QUAY LẠI
      </button>
      <span class="text-[10px] tracking-[4px] text-pink-400 opacity-80">HƯỚNG DẪN CHI TIẾT</span>
    </div>

    <div class="max-w-4xl mx-auto space-y-10">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-black italic tracking-tighter leading-none mb-5 drop-shadow-sm text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0]">
          {{ currentJob.title }}
        </h1>
        <div class="bg-pink-50 border border-pink-200 rounded-full px-6 py-2.5 w-max mx-auto flex items-center gap-2 shadow-sm">
          <span class="text-pink-500 text-xl">✨</span>
          <span class="text-pink-600 text-base md:text-lg font-black italic uppercase tracking-tighter">
            CÁT-XÊ: {{ currentJob.reward }}
          </span>
        </div>
        
        <div v-if="currentJob.warning" class="mt-6 max-w-xl mx-auto bg-rose-50 border border-rose-200 rounded-2xl p-4 shadow-sm animate-in fade-in zoom-in duration-500">
          <div class="flex items-start gap-3">
            <span class="text-rose-500 text-xl animate-pulse">⚠️</span>
            <p class="text-rose-500 text-[11px] md:text-xs font-black uppercase italic tracking-[1px] leading-relaxed text-left">
              {{ currentJob.warning }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-[40px] border border-pink-100 p-6 md:p-10 shadow-sm relative overflow-hidden">
        <div class="absolute -left-10 -top-10 w-40 h-40 bg-purple-50 rounded-full blur-[40px] pointer-events-none"></div>

        <div class="text-center space-y-5 relative z-10">
          
          <div v-if="['msb-bank', 'vpbank', 'tpbank', 'app-chung-khoan'].includes(route.params.id as string)"
               class="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 md:p-5 flex items-start gap-3 md:gap-4 shadow-sm relative overflow-hidden animate-in fade-in duration-700">
            
            <div class="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-orange-400"></div>
            <div class="text-2xl md:text-3xl animate-bounce mt-1">💡</div>

            <div class="text-left">
              <h4 class="text-amber-600 font-black italic uppercase text-[12px] md:text-sm tracking-widest mb-1.5">
                MẸO KIẾM TIỀN CHO NÀNG:
              </h4>
              <p class="text-slate-600 text-[11px] md:text-[13px] font-medium leading-relaxed normal-case">
                Nếu nàng đã đăng ký APP này rồi, có thể <strong class="text-amber-600 italic">giới thiệu bạn bè / người thân đăng ký</strong> và chụp lại ảnh bằng chứng gửi lên hệ thống, nàng <strong class="text-amber-600 italic">vẫn được duyệt tiền</strong> bình thường nhé! ☁️
              </p>
            </div>
          </div>

          <button @click="showGuide = !showGuide" 
            class="group relative w-full flex items-center gap-4 bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 p-5 rounded-3xl transition-all mt-4 shadow-sm">
            <div class="text-4xl group-hover:scale-110 transition-transform">📖</div>
            <div class="text-left">
              <h3 class="text-lg text-slate-800 font-black italic leading-none mb-1 uppercase">XEM HƯỚNG DẪN VÀ LÀM THEO {{currentJob.steps?.length || 0}} BƯỚC </h3>
              <p class="text-pink-500 text-[8px] tracking-[1px] font-black uppercase italic">NHẤN ĐỂ MỞ TỪNG BƯỚC LÀM</p>
            </div>
          </button>
        </div>

        <div v-if="showGuide" class="mt-8 pt-8 border-t border-pink-100 space-y-8 animate-in fade-in duration-500 relative z-10">
          <div v-for="step in currentJob.steps" :key="step.id" class="relative pl-10">
            
            <div class="absolute left-4 top-0 bottom-0 w-[2px] bg-pink-100"></div>
            
            <div class="absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-to-tr from-[#ED4E95] to-[#A061F0] text-white flex items-center justify-center text-sm font-black shadow-md shadow-pink-200">
              {{ step.id }}
            </div>

            <div class="pb-8">
              <h4 class="text-pink-600 text-base md:text-lg italic font-black mb-2 uppercase tracking-tight">
                {{ step.title }}
              </h4>
              <p class="text-slate-600 text-xs italic normal-case font-medium leading-relaxed mb-5">
                {{ step.content }}
              </p>

              <div v-if="step.copyContents" class="mb-8 space-y-4 max-w-lg">
                <div v-for="(item, index) in step.copyContents" :key="index" class="bg-pink-50/50 border border-pink-100 rounded-2xl p-4 shadow-sm">
                  <p class="text-[10px] text-pink-500 font-black mb-2 tracking-[2px] uppercase italic border-b border-pink-100 pb-2">⭐ {{ item.label }}</p>
                  <div class="text-slate-700 text-xs normal-case italic font-medium mb-4 whitespace-pre-wrap leading-relaxed select-all">
                    {{ item.text }}
                  </div>
                  <button @click="handleCopy(item.text)" 
                    class="w-full bg-white hover:bg-pink-50 text-pink-600 border border-pink-200 px-4 py-3 rounded-xl text-[11px] font-black transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2">
                    📋 SAO CHÉP {{ item.label }}
                  </button>
                </div>
              </div>

              <div v-if="step.referralLink" class="mb-6 max-w-md">
                <div class="bg-pink-50 border border-pink-100 p-2 rounded-xl flex items-center gap-2 shadow-sm">
                  <input readonly :value="step.referralLink" 
                    class="flex-1 bg-transparent border-none text-[10px] text-pink-600 font-black italic px-2 outline-none overflow-hidden text-ellipsis whitespace-nowrap" />
                  <button @click="handleCopy(step.referralLink)" 
                    class="bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white px-4 py-2 rounded-lg text-[10px] font-black transition-all active:scale-95 shadow-sm">
                    SAO CHÉP LINK
                  </button>
                </div>
              </div>

              <div v-if="step.downloadLink" class="mb-6">
                <a :href="step.downloadLink" target="_blank"
                  class="inline-flex items-center justify-center text-center w-full md:w-auto gap-3 bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white px-8 py-4 rounded-xl text-[12px] font-black uppercase hover:shadow-lg hover:opacity-90 transition-all active:scale-95">
                  {{ step.buttonText || 'TẢI APP NGAY ➔' }}
                </a>
              </div>

              <div class="flex flex-col md:flex-row gap-6 items-start">
                <div v-if="step.img" class="w-full md:max-w-[400px] rounded-2xl overflow-hidden border border-pink-100 shadow-md bg-white">
                  <img :src="baseUrl + step.img" class="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
                </div>

                <div v-if="step.note" class="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-2xl flex-1 shadow-sm">
                  <p class="text-purple-500 text-[10px] font-black tracking-[2px] mb-2 uppercase italic">Thông tin quan trọng</p>
                  <h5 class="text-purple-700 text-lg md:text-xl font-black italic leading-tight uppercase">{{ step.note }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="bg-white rounded-[40px] border border-pink-100 p-8 md:p-10 text-center shadow-sm mb-20 relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-pink-50 rounded-full blur-[30px] pointer-events-none"></div>
        
        <h2 class="text-lg text-pink-400 font-black italic mb-6 tracking-wide uppercase opacity-80 relative z-10">BẠN ĐÃ LÀM XONG?</h2>
        <button @click="router.push('/submit-report')" 
          class="relative z-10 w-full bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white py-5 rounded-2xl text-[14px] md:text-xl font-black italic uppercase shadow-md hover:shadow-lg hover:opacity-90 transition-all active:scale-95 tracking-widest">
          NỘP BẰNG CHỨNG NGAY ✨
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