<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"
// IMPORT THÊM THƯ VIỆN THÔNG BÁO XỊN SÒ NÀY VÀO
import Swal from 'sweetalert2'

const router = useRouter()
const fullName = ref('')
const email = ref('')
const phone = ref('') 
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const handleRegister = async () => {
  if (!fullName.value || !email.value || !phone.value || !username.value || !password.value) {
    Swal.fire({
      title: 'THIẾU THÔNG TIN!',
      text: 'Vui lòng điền đầy đủ các trường để tiếp tục.',
      icon: 'warning',
      confirmButtonText: 'Đã hiểu',
      confirmButtonColor: '#f59e0b' // Màu cam
    })
    return
  }

  loading.value = true
  try {
    // 1. KIỂM TRA TRÙNG USERNAME TRƯỚC KHI TẠO TÀI KHOẢN
    const usernameToCheck = username.value.toLowerCase().trim()
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("username", "==", usernameToCheck))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      Swal.fire({
        title: 'TRÙNG TÊN ĐĂNG NHẬP!',
        text: 'Tên đăng nhập này đã có người sử dụng. Vui lòng chọn tên khác!',
        icon: 'error',
        confirmButtonText: 'Thử lại',
        confirmButtonColor: '#ef4444' // Màu đỏ
      })
      loading.value = false
      return // Cắt ngang
    }

    // 2. TẠO TÀI KHOẢN BẰNG AUTH
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email.value.toLowerCase().trim(), 
      password.value
    )
    
    const user = userCredential.user

    // 3. LƯU VÀO DATABASE
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      fullName: fullName.value,
      username: usernameToCheck,
      email: email.value.toLowerCase().trim(),
      phone: phone.value.trim(), 
      balance: 0,
      createdAt: new Date().toISOString()
    })

    // THÔNG BÁO THÀNH CÔNG RỒI MỚI CHUYỂN TRANG
    Swal.fire({
      title: 'ĐĂNG KÝ THÀNH CÔNG!',
      text: 'Chào mừng bạn gia nhập hệ thống MMO PRO.',
      icon: 'success',
      confirmButtonText: 'Vào ngay',
      confirmButtonColor: '#2563eb' // Màu xanh blue-600
    }).then(() => {
      router.push('/') 
    })

  } catch (error: any) {
    let msg = error.message
    if (error.code === 'auth/email-already-in-use') msg = 'Email này đã được đăng ký trên hệ thống!'
    if (error.code === 'auth/weak-password') msg = 'Mật khẩu quá yếu, phải từ 6 ký tự trở lên!'
    
    Swal.fire({
      title: 'LỖI ĐĂNG KÝ!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Đóng',
      confirmButtonColor: '#ef4444'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex font-sans overflow-hidden text-left font-black italic uppercase">
    <!-- BÊN TRÁI: LOGO & BANNER -->
    <div class="hidden lg:flex lg:w-1/2 bg-[#f8fafc] flex-col items-center justify-center p-12 relative overflow-hidden text-left">
      <div class="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60"></div>
      <div class="absolute top-12 left-12 flex flex-col items-start">
        <div class="bg-blue-600 text-white font-black px-3 py-1 rounded-md italic text-[10px] mb-3 uppercase tracking-widest">HỆ THỐNG KIẾM TIỀN</div>
        <h1 class="text-5xl font-black text-slate-800 tracking-tighter uppercase italic leading-[0.9]">
          KIẾM TIỀN ONLINE <br/>
          <span class="text-blue-600 font-black">MMO PRO</span>
        </h1>
        <p class="text-slate-400 font-black text-[10px] tracking-[5px] mt-4 border-l-4 border-blue-600 pl-4 uppercase opacity-50">
          Nền tảng kiếm tiền uy tín số 1 Việt Nam
        </p>
      </div>
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/business-partnership-illustration-download-in-svg-png-gif-file-formats--meeting-shaking-hands-collaboration-agreement-pack-office-work-illustrations-4712534.png" class="max-w-md relative z-10 animate-float drop-shadow-2xl">
    </div>

    <!-- BÊN PHẢI: FORM ĐĂNG KÝ -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto font-black custom-scrollbar">
      <div class="w-full max-w-md space-y-6 font-black italic uppercase my-8">
        <div class="text-left font-black mb-8">
          <h2 class="text-3xl font-black text-slate-800 uppercase italic leading-none">TẠO TÀI KHOẢN MỚI</h2>
          <p class="text-slate-400 text-[10px] mt-3 font-black italic uppercase tracking-widest opacity-70">Bắt đầu hành trình của bạn chỉ trong vài giây.</p>
        </div>

        <div class="space-y-4 font-black italic uppercase">
          <div class="space-y-1 font-black">
            <label class="text-[11px] font-black text-slate-400 uppercase italic ml-1">Họ tên</label>
            <input v-model="fullName" type="text" placeholder="HỌ VÀ TÊN..." class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-slate-700 outline-none focus:border-blue-500 font-black italic text-xs shadow-inner uppercase transition-all" />
          </div>

          <div class="space-y-1 font-black">
            <label class="text-[11px] font-black text-slate-400 uppercase italic ml-1">Địa chỉ Email</label>
            <input v-model="email" type="email" placeholder="NAME@EXAMPLE.COM..." class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-slate-700 outline-none focus:border-blue-500 font-black italic text-xs shadow-inner uppercase transition-all" />
          </div>

          <!-- TRƯỜNG SĐT VÀ CÂU CẢNH BÁO -->
          <div class="space-y-1 font-black">
            <label class="text-[11px] font-black text-slate-400 uppercase italic ml-1">Số điện thoại</label>
            <input v-model="phone" type="tel" placeholder="0912345678..." class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-slate-700 outline-none focus:border-blue-500 font-black italic text-xs shadow-inner uppercase transition-all" />
            <p class="text-[9px] text-red-500/80 italic uppercase mt-1.5 ml-2 leading-relaxed tracking-wide font-black">
              * LƯU Ý: VUI LÒNG NHẬP ĐÚNG SĐT. NHẬP SAI HOẶC CỐ TÌNH GIAN LẬN SẼ BỊ KHÓA TÀI KHOẢN.
            </p>
          </div>

          <div class="space-y-1 font-black">
            <label class="text-[11px] font-black text-slate-400 uppercase italic ml-1">Tên đăng nhập</label>
            <input v-model="username" type="text" placeholder="USERNAME..." class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-slate-700 outline-none focus:border-blue-500 font-black italic text-xs shadow-inner uppercase transition-all" />
          </div>

          <div class="space-y-1 font-black">
            <label class="text-[11px] font-black text-slate-400 uppercase italic ml-1">Mật khẩu</label>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="w-full bg-slate-50 border border-slate-100 rounded-[20px] py-4 px-6 text-slate-700 outline-none focus:border-blue-500 font-black text-xs shadow-inner transition-all" />
              <button @click="showPassword = !showPassword" class="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] text-blue-600 font-black italic uppercase hover:text-blue-800">HIỆN</button>
            </div>
          </div>

          <button @click="handleRegister" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-[20px] text-white font-black uppercase italic shadow-lg transition-all active:scale-95 disabled:opacity-50 text-base mt-6 font-black">
            {{ loading ? 'ĐANG TẠO TÀI KHOẢN...' : 'ĐĂNG KÝ TÀI KHOẢN' }} ➔
          </button>
        </div>

        <div class="text-center font-black mt-6">
          <p class="text-[10px] font-black text-slate-400 uppercase italic">
            Đã có tài khoản? 
            <span @click="router.push('/login')" class="text-blue-600 cursor-pointer hover:underline ml-2 font-black italic uppercase">ĐĂNG NHẬP NGAY</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
.animate-float { animation: float 6s ease-in-out infinite; }
/* Ẩn scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 0px; display: none; }
.custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>