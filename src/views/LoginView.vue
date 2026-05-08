<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import Swal from 'sweetalert2'

const router = useRouter()
const loginInput = ref('') 
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  if (!loginInput.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: 'NÀNG ƠI...',
      text: 'Nhập đủ tài khoản & mật khẩu nhé!',
      confirmButtonColor: '#ED4E95'
    })
    return
  }

  loading.value = true
  try {
    let emailToSignIn = loginInput.value.trim().toLowerCase()

    if (!emailToSignIn.includes('@')) {
      const q = query(collection(db, "users"), where("username", "==", emailToSignIn))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) {
        throw new Error('Tên đăng nhập không tồn tại!')
      }
      emailToSignIn = querySnapshot.docs[0]?.data()?.email
    }

    await signInWithEmailAndPassword(auth, emailToSignIn, password.value)
    
    localStorage.clear()
    
    Swal.fire({
      icon: 'success',
      title: 'WELCOME BACK! ✨',
      text: 'Mây đã sẵn sàng, cùng kiếm tiền thôi!',
      showConfirmButton: false,
      timer: 1500,
      background: '#fff',
      color: '#ED4E95'
    })

    setTimeout(() => {
      router.push('/')
    }, 1000)

  } catch (error: any) {
    let errorMsg = 'Tài khoản hoặc mật khẩu không chính xác!'
    if (error.message === 'Tên đăng nhập không tồn tại!') errorMsg = error.message
    
    Swal.fire({
      icon: 'error',
      title: 'LỖI RỒI!',
      text: errorMsg,
      confirmButtonColor: '#ED4E95'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-4 md:p-10 font-sans relative overflow-hidden text-left italic uppercase font-black">
    
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[150px]"></div>
    <div class="absolute top-[20%] right-[10%] w-32 h-32 bg-pink-300/30 rounded-full blur-2xl animate-bounce duration-[3000ms]"></div>

    <div class="w-full max-w-6xl h-auto md:h-[720px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] md:rounded-[50px] shadow-[0_25px_80px_rgba(237,78,149,0.15)] flex flex-col md:flex-row overflow-hidden relative z-10">
      
      <div class="hidden lg:flex w-1/2 flex-col justify-between p-16 bg-gradient-to-br from-white/60 to-pink-50/30 relative border-r border-white/40">
        <div class="space-y-4 relative z-20">
          <div class="inline-block px-4 py-1.5 bg-white/80 rounded-full shadow-sm border border-pink-100 text-[10px] tracking-[4px] text-pink-500">
            CREATOR PLATFORM 1.0
          </div>
          <h1 class="text-7xl font-black italic tracking-tighter leading-none text-slate-800 drop-shadow-sm">
            MÂY<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0]">FREELANCE</span>
          </h1>
          <p class="text-slate-500 font-bold italic normal-case tracking-tight max-w-xs text-sm">
            Nơi biến thời gian rảnh thành thu nhập xứng đáng.
          </p>
        </div>

        <div class="relative flex items-center justify-center my-auto">
          <div class="absolute w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <img src="/images/may-logo.png" alt="Mây Freelance Logo" class="w-80 h-auto drop-shadow-[0_20px_40px_rgba(237,78,149,0.25)] animate-float z-10">
        </div>

        <div class="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all z-20">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_Bank.png" class="h-5" alt="MB Bank">
          <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" class="h-6" alt="MoMo">
        </div>
      </div>

      <div class="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-20 bg-white/50">
        
        <div class="lg:hidden flex flex-col items-center mb-10">
            <img src="/images/may-logo.png" class="w-24 h-auto mb-4 drop-shadow-md animate-bounce" alt="Mây Logo" />
            <h2 class="text-4xl font-black text-slate-800 tracking-tighter">MÂY <span class="text-pink-500">FREELANCE</span></h2>
        </div>

        <div class="space-y-10">
          <div class="text-center lg:text-left">
            <h2 class="text-5xl font-black text-slate-800 tracking-tighter leading-none">ĐĂNG NHẬP</h2>
            <p class="text-slate-500 text-xs mt-3 font-bold italic tracking-[3px]">CHÀO MỪNG NÀNG TRỞ LẠI!</p>
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] text-pink-500 tracking-[3px] ml-1">TÀI KHOẢN CỦA NÀNG</label>
              <div class="relative group">
                <input v-model="loginInput" type="text" placeholder="Username hoặc Email..." 
                       class="w-full bg-white/60 border border-pink-100 rounded-[22px] py-6 px-8 text-slate-700 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all font-black text-sm shadow-sm placeholder:text-pink-200 uppercase" />
                <span class="absolute right-6 top-1/2 -translate-y-1/2 text-xl opacity-30 group-focus-within:opacity-100 transition-opacity">☁️</span>
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] text-pink-500 tracking-[3px] ml-1">MẬT KHẨU BẢO MẬT</label>
              <div class="relative group">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" 
                       @keyup.enter="handleLogin"
                       class="w-full bg-white/60 border border-pink-100 rounded-[22px] py-6 px-8 text-slate-700 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all font-black text-sm shadow-sm placeholder:text-pink-200" />
                <button @click="showPassword = !showPassword" class="absolute right-6 top-1/2 -translate-y-1/2 text-lg opacity-40 hover:opacity-100 transition-opacity text-pink-500">
                  {{ showPassword ? '👁️' : '🙈' }}
                </button>
              </div>
            </div>

            <button @click="handleLogin" :disabled="loading" 
                    class="w-full bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white py-6 rounded-[25px] text-lg font-black italic shadow-[0_15px_30px_rgba(237,78,149,0.25)] hover:shadow-[0_20px_40px_rgba(237,78,149,0.4)] active:scale-95 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:grayscale">
              {{ loading ? 'ĐANG VÀO MÂY...' : 'BẮT ĐẦU KIẾM TIỀN' }}
              <span v-if="!loading" class="text-2xl group-hover:translate-x-2 transition-transform">➜</span>
            </button>
          </div>

          <div class="text-center pt-8 border-t border-pink-100/50">
            <p class="text-[11px] text-slate-400 tracking-[2px]">
              Chưa có tài khoản? 
              <span @click="router.push('/register')" class="text-[#ED4E95] cursor-pointer hover:underline ml-2 text-[13px]">ĐĂNG KÝ NGAY</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
input::placeholder {
  letter-spacing: 1px;
}
</style>