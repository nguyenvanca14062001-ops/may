<script setup lang="ts">
import { ref } from 'vue'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const fullName = ref('')
const email = ref('')
const phone = ref('')
const username = ref('')
const password = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  if (!fullName.value || !email.value || !phone.value || !username.value || !password.value) {
    Swal.fire({ 
      icon: 'warning', 
      title: 'NÀNG ƠI...', 
      text: 'Điền đủ các ô để Mây tạo hồ sơ cho nàng nhé!', 
      confirmButtonColor: '#ED4E95' 
    })
    return
  }
  if (password.value.length < 6) {
    Swal.fire({ 
      icon: 'error', 
      title: 'MẬT KHẨU YẾU!', 
      text: 'Cần ít nhất 6 ký tự để bảo mật nàng nha.', 
      confirmButtonColor: '#ED4E95' 
    })
    return
  }

  isLoading.value = true
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    
    await updateProfile(user, { displayName: fullName.value })

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      fullName: fullName.value.toUpperCase(),
      email: email.value.toLowerCase(),
      phone: phone.value,
      username: username.value.toLowerCase(),
      balance: 0,
      createdAt: serverTimestamp(),
      role: 'member'
    })

    Swal.fire({
      icon: 'success',
      title: 'CHÀO MỪNG NÀNG! 💖',
      text: 'Hồ sơ đã sẵn sàng, vào kiếm tiền thôi nào!',
      showConfirmButton: false,
      timer: 2000
    })

    setTimeout(() => { router.push('/') }, 1500)
  } catch (error: any) {
    let msg = "Lỗi đăng ký rồi nàng ơi!"
    if (error.code === 'auth/email-already-in-use') msg = "Email này đã có chủ, nàng dùng email khác nhé!"
    Swal.fire({ icon: 'error', title: 'LỖI RỒI!', text: msg, confirmButtonColor: '#ED4E95' })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-4 md:p-10 font-sans relative overflow-hidden text-left italic uppercase font-black">
    
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[120px] animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[150px]"></div>
    <div class="absolute top-[10%] right-[5%] w-24 h-24 bg-pink-300/20 rounded-full blur-2xl animate-bounce"></div>

    <div class="w-full max-w-6xl min-h-[750px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] md:rounded-[50px] shadow-[0_25px_80px_rgba(237,78,149,0.15)] flex flex-col md:flex-row overflow-hidden relative z-10">
      
      <div class="hidden lg:flex w-[40%] flex-col justify-between p-16 bg-gradient-to-br from-white/60 to-pink-50/30 border-r border-white/40 relative">
        <div class="space-y-4 relative z-20">
          <div class="inline-block px-4 py-1.5 bg-white/80 rounded-full shadow-sm border border-pink-100 text-[10px] tracking-[4px] text-pink-500">
            CREATOR HUB 1.0
          </div>
          <h1 class="text-7xl font-black italic tracking-tighter leading-none text-slate-800 drop-shadow-sm">
            MÂY<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#ED4E95] to-[#A061F0]">FREELANCE</span>
          </h1>
          <p class="text-slate-500 font-bold italic normal-case tracking-tight max-w-xs text-sm">
            Gia nhập cộng đồng 10,000+ KOC chuyên nghiệp và bắt đầu hành trình tự chủ tài chính.
          </p>
        </div>

        <div class="relative flex items-center justify-center my-10">
          <div class="absolute w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <img src="/images/may-logo.png" alt="Mây Logo" class="w-72 h-auto drop-shadow-[0_20px_40px_rgba(237,78,149,0.25)] animate-float z-10 mix-blend-multiply">
        </div>

        <div class="flex items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all z-20">
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-MB-Bank-MBB-Transparent.png" class="h-5" alt="MB">
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Transparent.png" class="h-6" alt="MoMo">
        </div>
      </div>

      <div class="w-full lg:w-[60%] flex flex-col justify-center p-6 md:p-16 bg-white/50 overflow-y-auto">
        
        <div class="lg:hidden flex flex-col items-center mb-8">
            <img src="/images/may-logo.png" class="w-20 h-auto mb-3 drop-shadow-md animate-bounce mix-blend-multiply" alt="Logo" />
            <h2 class="text-3xl font-black text-slate-800 tracking-tighter">MÂY <span class="text-pink-500">FREELANCE</span></h2>
        </div>

        <div class="space-y-8">
          <div class="text-center lg:text-left">
            <h2 class="text-5xl font-black text-slate-800 tracking-tighter leading-none">TẠO TÀI KHOẢN</h2>
            <p class="text-slate-500 text-xs mt-3 font-bold italic tracking-[3px] uppercase">KHỞI ĐẦU HÀNH TRÌNH SÁNG TẠO ✨</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            <div class="space-y-1.5 text-left md:col-span-2">
              <label class="text-[10px] text-pink-500 tracking-[3px] ml-1 uppercase">HỌ VÀ TÊN THẬT</label>
              <div class="relative group">
                <input v-model="fullName" type="text" placeholder="NGUYỄN THỊ A..." 
                       class="w-full bg-white/70 border border-pink-100 rounded-[20px] py-5 px-8 text-slate-700 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all font-black text-sm shadow-sm placeholder:text-pink-200 uppercase italic" />
                <span class="absolute right-6 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity">📝</span>
              </div>
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-[10px] text-pink-500 tracking-[3px] ml-1 uppercase">EMAIL CỦA NÀNG</label>
              <input v-model="email" type="email" placeholder="NANGMAY@GMAIL.COM" 
                     class="w-full bg-white/70 border border-pink-100 rounded-[20px] py-5 px-8 text-slate-700 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all font-black text-sm shadow-sm placeholder:text-pink-200 uppercase italic" />
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-[10px] text-pink-500 tracking-[3px] ml-1 uppercase">SỐ ĐIỆN THOẠI</label>
              <input v-model="phone" type="tel" placeholder="0912345XXX" 
                     class="w-full bg-white/70 border border-pink-100 rounded-[20px] py-5 px-8 text-slate-700 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all font-black text-sm shadow-sm placeholder:text-pink-200 italic" />
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-[10px] text-pink-500 tracking-[3px] ml-1 uppercase">TÊN ĐĂNG NHẬP</label>
              <input v-model="username" type="text" placeholder="NANGMAY_KOC" 
                     class="w-full bg-white/70 border border-pink-100 rounded-[20px] py-5 px-8 text-slate-700 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all font-black text-sm shadow-sm placeholder:text-pink-200 uppercase italic" />
            </div>

            <div class="space-y-1.5 text-left">
              <label class="text-[10px] text-pink-500 tracking-[3px] ml-1 uppercase">MẬT KHẨU</label>
              <input v-model="password" type="password" placeholder="••••••••" 
                     class="w-full bg-white/70 border border-pink-100 rounded-[20px] py-5 px-8 text-slate-700 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-50 transition-all font-black text-sm shadow-sm placeholder:text-pink-200" />
            </div>

          </div>

          <button @click="handleRegister" :disabled="isLoading" 
                  class="w-full bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white py-6 rounded-[25px] text-lg font-black italic shadow-[0_15px_35px_rgba(237,78,149,0.3)] hover:shadow-[0_20px_50px_rgba(237,78,149,0.4)] active:scale-95 transition-all flex items-center justify-center gap-4 group disabled:opacity-50 disabled:grayscale">
            {{ isLoading ? 'ĐANG TẠO HỒ SƠ...' : 'GIA NHẬP MÂY NGAY' }}
            <span v-if="!isLoading" class="text-2xl group-hover:translate-x-2 transition-transform">➔</span>
          </button>

          <div class="text-center pt-6 border-t border-pink-100/50">
            <p class="text-[11px] text-slate-400 tracking-[2px] uppercase">
              Đã có tài khoản rồi? 
              <span @click="router.push('/login')" class="text-[#ED4E95] cursor-pointer hover:underline ml-2 text-[13px]">ĐĂNG NHẬP TẠI ĐÂY</span>
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
  50% { transform: translateY(-15px) rotate(1deg); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
input::placeholder {
  letter-spacing: 1px;
}
/* Tuỳ chỉnh Scrollbar cho form */
div::-webkit-scrollbar { width: 5px; }
div::-webkit-scrollbar-thumb { background: #FCE7F3; border-radius: 10px; }
</style>