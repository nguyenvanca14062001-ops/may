<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"

const router = useRouter()
const loginInput = ref('') // Nhận vào Email hoặc Tên đăng nhập
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  if (!loginInput.value || !password.value) {
    alert('Vui lòng nhập tài khoản và mật khẩu!')
    return
  }

  loading.value = true
  try {
    let emailToSignIn = loginInput.value.trim().toLowerCase()

    // 1. Logic Đăng nhập 2 trong 1
    if (!emailToSignIn.includes('@')) {
      const q = query(collection(db, "users"), where("username", "==", emailToSignIn))
      const querySnapshot = await getDocs(q)
      
      if (querySnapshot.empty) {
        throw new Error('Tên đăng nhập không tồn tại!')
      }
      emailToSignIn = querySnapshot.docs[0]?.data()?.email
    }

    // 2. Thực hiện đăng nhập chính thức
    await signInWithEmailAndPassword(auth, emailToSignIn, password.value)
    
    localStorage.clear()
    alert('Đăng nhập thành công! Bắt đầu kiếm tiền thôi nào.')

    // 3. FIX QUAN TRỌNG: Nhảy trang
    setTimeout(() => {
      router.push('/')
    }, 500)

  } catch (error: any) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      alert('Tài khoản hoặc mật khẩu không chính xác!')
    } else {
      alert('Lỗi: ' + error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!-- THAY ĐỔI: Thêm pb-40 để mobile không bị vướng nút liên hệ -->
  <div class="min-h-screen bg-white flex font-sans overflow-y-auto lg:overflow-hidden pb-40 lg:pb-0">
    
    <!-- BÊN TRÁI: THƯƠNG HIỆU MMO PRO (Giữ nguyên) -->
    <div class="hidden lg:flex lg:w-1/2 bg-[#f8fafc] flex-col items-center justify-center p-12 relative overflow-hidden">
      <div class="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-emerald-100 rounded-full blur-[120px] opacity-60"></div>

      <div class="absolute top-12 left-12 flex flex-col items-start text-left">
        <div class="flex items-center gap-2 mb-3">
          <div class="bg-blue-600 text-white font-black px-3 py-1 rounded-md italic text-[10px] shadow-lg shadow-blue-200 uppercase tracking-widest">HỆ THỐNG KIẾM TIỀN</div>
          <div class="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
        </div>
        <h1 class="text-5xl font-black text-slate-800 tracking-tighter uppercase italic leading-[0.9]">
          KIẾM TIỀN ONLINE <br/>
          <span class="text-blue-600 font-black italic">MMO PRO</span>
        </h1>
        <p class="text-slate-400 font-black text-[10px] tracking-[5px] mt-4 border-l-4 border-blue-600 pl-4 uppercase leading-none italic">
          Nền tảng kiếm tiền uy tín số 1 Việt Nam
        </p>
      </div>

      <div class="max-w-md relative z-10 animate-float">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/business-partnership-illustration-download-in-svg-png-gif-file-formats--meeting-shaking-hands-collaboration-agreement-pack-office-work-illustrations-4712534.png" alt="MMO Illustration" class="w-full h-auto drop-shadow-[0_35px_35px_rgba(37,99,235,0.15)]">
      </div>

      <div class="absolute bottom-12 left-12 flex items-center gap-6 opacity-40 grayscale">
         <img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_MB_Bank.png" class="h-6">
         <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" class="h-6">
      </div>
    </div>

    <!-- BÊN PHẢI: FORM ĐĂNG NHẬP -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
      <!-- Nút Menu: Chỉnh lại để không đè chữ trên mobile -->
      <button class="absolute top-6 left-6 lg:hidden z-50 text-2xl text-slate-800">☰</button>

      <div class="w-full max-w-md space-y-10">
        <div class="lg:hidden text-center mb-10">
            <h2 class="text-3xl font-black text-slate-800 italic uppercase tracking-tighter leading-none">MMO <span class="text-blue-600">PRO</span></h2>
            <p class="text-[9px] text-slate-400 font-black tracking-[3px] uppercase mt-1 italic">Hệ thống kiếm tiền Online</p>
        </div>

        <div class="text-left">
          <h2 class="text-4xl font-black text-slate-800 uppercase italic tracking-tight leading-none">ĐĂNG NHẬP</h2>
          <p class="text-slate-400 text-sm mt-4 font-bold italic uppercase tracking-widest opacity-70">Chào mừng bạn trở lại hệ thống.</p>
        </div>

        <div class="space-y-6">
          <div class="space-y-2 text-left">
            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 italic">Email hoặc Tên đăng nhập</label>
            <div class="relative group">
              <span class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors text-lg">👤</span>
              <input v-model="loginInput" type="text" placeholder="USERNAME HOẶC EMAIL..." 
                     class="w-full bg-slate-50 border border-slate-100 rounded-[25px] py-6 pl-16 pr-8 text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all font-black placeholder:text-slate-300 uppercase italic text-sm shadow-inner" />
            </div>
          </div>

          <div class="space-y-2 text-left">
            <div class="flex justify-between items-center px-1">
              <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Mật khẩu</label>
            </div>
            <div class="relative group">
              <span class="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors text-lg">🔒</span>
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" 
                     class="w-full bg-slate-50 border border-slate-100 rounded-[25px] py-6 pl-16 pr-8 text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all font-black placeholder:text-slate-300 text-sm shadow-inner" />
              <button @click="showPassword = !showPassword" class="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-all">
                {{ showPassword ? '👁️' : '🙈' }}
              </button>
            </div>
          </div>

          <button @click="handleLogin" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 py-6 rounded-[25px] text-white font-black uppercase italic shadow-[0_20px_40px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-4 group active:scale-95 text-lg disabled:opacity-50">
            {{ loading ? 'ĐANG KIỂM TRA...' : 'VÀO HỆ THỐNG KIẾM TIỀN' }}
            <span v-if="!loading" class="text-2xl group-hover:translate-x-2 transition-transform">➔</span>
          </button>
        </div>

        <!-- PHẦN FIX: Đẩy cao lên để không bị vướng Zalo/FB -->
        <div class="pt-10 pb-10 text-center">
          <p class="text-[12px] font-black text-slate-400 uppercase italic tracking-[2px]">
            Chưa có tài khoản? 
            <span @click="router.push('/register')" class="text-blue-600 cursor-pointer hover:underline ml-2 text-sm">ĐĂNG KÝ TẠI ĐÂY</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
input::placeholder {
  letter-spacing: 2px;
  font-weight: 900;
}
</style>