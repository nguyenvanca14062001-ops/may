<script setup lang="ts">
import Footer from '@/components/Footer.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { auth, db } from '@/firebase' 
import { onAuthStateChanged, signOut } from "firebase/auth" 
import { doc, onSnapshot, collection, query, where, updateDoc } from "firebase/firestore"

// --- IMPORT COMPONENT ---
import AppBrowserBlocker from '@/components/AppBrowserBlocker.vue'
import RewardPopup from '@/components/RewardPopup.vue'
import Sidebar from '@/components/home/Sidebar.vue'
import JobSection from '@/components/home/JobSection.vue'
import HistorySection from '@/components/home/HistorySection.vue'
import InfoSection from '@/components/home/InfoSection.vue'
import GiftRewardView from '@/components/home/GiftRewardView.vue'

// --- KHỞI TẠO BIẾN TRẠNG THÁI HỆ THỐNG ---
const router = useRouter()
const route = useRoute()

// Trạng thái ẩn/hiện số dư
const isBalanceVisible = ref(localStorage.getItem('mmo_balance_hide') !== 'true');

const toggleBalance = () => {
  isBalanceVisible.value = !isBalanceVisible.value;
  localStorage.setItem('mmo_balance_hide', String(!isBalanceVisible.value));
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
};

const isLoggedIn = ref(false)
const isMenuOpen = ref(true) 
const isDataLoading = ref(true)
const windowWidth = ref(0) 
const showWelcomePopup = ref(false)
const showBankModal = ref(false)

const isAdminRoute = computed(() => route.path.includes('admin'))
const username = ref(localStorage.getItem('mmo_username') || 'Member')
const userBalance = ref(Number(localStorage.getItem('mmo_balance')) || 0)

const myReports = ref<any[]>([])
const myWithdrawals = ref<any[]>([])

// ============================================================================
// LOGIC POPUP: THÔNG BÁO TỪ ADMIN
// ============================================================================
const dismissedRejections = ref<string[]>(JSON.parse(localStorage.getItem('mmo_dismissed_rejections') || '[]'))
const unreadRejectedReport = computed(() => {
  return myReports.value.find(rp => rp.status === 'rejected' && !dismissedRejections.value.includes(rp.id))
})
const dismissRejection = (id: string) => {
  dismissedRejections.value.push(id)
  localStorage.setItem('mmo_dismissed_rejections', JSON.stringify(dismissedRejections.value))
}

const dismissedMessages = ref<string[]>(JSON.parse(localStorage.getItem('mmo_dismissed_messages') || '[]'))
const unreadMessageReport = computed(() => {
  return myReports.value.find(rp => rp.status === 'pending' && rp.note && !dismissedMessages.value.includes(rp.id))
})
const dismissMessage = (id: string) => {
  dismissedMessages.value.push(id)
  localStorage.setItem('mmo_dismissed_messages', JSON.stringify(dismissedMessages.value))
}

// ============================================================================
// LOGIC THÔNG BÁO "NỔ HŨ"
// ============================================================================
const randomNotice = ref<any>(null)
const names = ['THANH HẰNG', 'BÍCH PHƯỢNG', 'KHÁNH LINH', 'PHƯƠNG ANH', 'THU THẢO', 'MINH TÚ', 'QUỲNH CHI', 'LAN NGỌC', 'HUYỀN MY', 'BẢO THY']
const banks = ['MB BANK', 'VPBANK', 'TPBANK', 'VIETCOMBANK', 'TECHCOMBANK', 'MOMO']

const jobList = [
  { name: 'Map x Katinat', reward: '30.000' },
  { name: 'App Chứng Khoán', reward: '125.000' },
  { name: 'Mở ví Lady VPBank', reward: '100.000' },
  { name: 'Edit Video CapCut', reward: '80.000' },
  { name: 'Reviewer Mỹ Phẩm', reward: '60.000' },
  { name: 'Viết Blog/Content', reward: '50.000' },
]

const triggerNotice = (type: 'job' | 'withdraw') => {
  const name = names[Math.floor(Math.random() * names.length)]
  if (type === 'withdraw') {
    const bank = banks[Math.floor(Math.random() * banks.length)]
    const withdrawAmounts = ['200.000', '300.000', '450.000', '600.000', '1.200.000']
    randomNotice.value = { 
      type: 'withdraw', name, title: 'Vừa rút cát-xê', 
      amount: withdrawAmounts[Math.floor(Math.random() * withdrawAmounts.length)], sub: `Về tài khoản ${bank}` 
    }
  } else {
    const job = jobList[Math.floor(Math.random() * jobList.length)]
    randomNotice.value = { 
      type: 'job', name, title: 'Vừa chốt Job', 
      amount: job.reward, sub: `${job.name}` 
    }
  }
  setTimeout(() => { randomNotice.value = null }, 3000) 
}

const startToasting = () => {
  const jobLoop = () => {
    setTimeout(() => { if (!randomNotice.value) triggerNotice('job'); jobLoop() }, Math.random() * 4000 + 4000)
  }
  const withdrawLoop = () => {
    setTimeout(() => { if (!randomNotice.value) triggerNotice('withdraw'); withdrawLoop() }, Math.random() * 6000 + 8000)
  }
  jobLoop(); withdrawLoop()
}

const combinedHistory = computed(() => {
  const combined = [
    ...myReports.value.map(item => ({ ...item, type: 'task' })), 
    ...myWithdrawals.value.map(item => ({ ...item, type: 'withdraw' }))
  ]
  return combined.map(item => {
    let displayTime = 'VỪA XONG'; 
    let sortTime = Date.now()
    if (item.createdAt) {
      if (typeof item.createdAt === 'string') {
        displayTime = item.createdAt.split('T')[0]; sortTime = new Date(item.createdAt).getTime()
      } else if (item.createdAt.toDate) {
        const d = item.createdAt.toDate(); displayTime = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`; sortTime = d.getTime()
      }
    }
    return { ...item, displayTime, sortTime }
  }).sort((a, b) => b.sortTime - a.sortTime)
})

// --- VÒNG ĐỜI VÀ LẮNG NGHE FIREBASE ---
onMounted(() => {
  windowWidth.value = window.innerWidth
  if (windowWidth.value < 1024) isMenuOpen.value = false;

  window.addEventListener('resize', () => { 
    windowWidth.value = window.innerWidth 
    if (windowWidth.value >= 1024) isMenuOpen.value = true;
  })

  startToasting()
  onAuthStateChanged(auth, async (user) => {
    if (user && !isAdminRoute.value) {
      isLoggedIn.value = true
      const giftKey = `gift_${user.uid}`
      onSnapshot(doc(db, "users", user.uid), async (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data()
          username.value = data.username || data.fullName || 'Member'
          userBalance.value = data.balance || 0
          if (data.balance === 0 && !localStorage.getItem(giftKey)) {
             try {
               await updateDoc(doc(db, "users", user.uid), { balance: 10000 })
               showWelcomePopup.value = true
               localStorage.setItem(giftKey, 'true')
             } catch (e) { console.error(e) }
          }
          localStorage.setItem('mmo_username', username.value)
          localStorage.setItem('mmo_balance', String(userBalance.value))
        }
      })
      onSnapshot(query(collection(db, "reports"), where("uid", "==", user.uid)), (snapshot) => {
        myReports.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        isDataLoading.value = false
      })
      onSnapshot(query(collection(db, "withdrawals"), where("uid", "==", user.uid)), (snapshot) => {
        myWithdrawals.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
    } else if (!isAdminRoute.value) {
      isLoggedIn.value = false; isDataLoading.value = false; username.value = 'Member'; userBalance.value = 0; 
      myReports.value = []; myWithdrawals.value = []; localStorage.clear()
    }
  })
})

const handleNav = (path: string) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
  const targetPath = path === '/submit' ? '/submit-report' : path;
  if (!isLoggedIn.value && (['/submit-report', '/withdraw'].includes(targetPath) || targetPath.startsWith('/job/'))) {
    router.push('/login'); return;
  }
  router.push(targetPath);
  if (windowWidth.value < 1024) isMenuOpen.value = false;
}

const handleReceiveJob = (jobId: string) => {
  if (!isLoggedIn.value) { router.push('/login'); return; }
  router.push(`/job/${jobId}`)
}

const handleScrollToHistory = () => {
  if (route.path !== '/') {
    router.push('/')
    setTimeout(() => { document.getElementById('history-section')?.scrollIntoView({ behavior: 'smooth' }) }, 500)
  } else {
    document.getElementById('history-section')?.scrollIntoView({ behavior: 'smooth' })
  }
  if (windowWidth.value < 1024) isMenuOpen.value = false
}

const logout = async () => { 
  if(confirm('Xác nhận đăng xuất?')) { await signOut(auth); localStorage.clear(); router.push('/login') } 
}

const contactSupport = (t: string) => { 
  window.open(t === 'facebook' ? 'https://www.facebook.com/mmopro123/' : 'https://zalo.me/g/zbvsdm567', '_blank') 
}
</script>

<template>
  <div v-if="isAdminRoute" class="min-h-screen bg-[#FFF5F7] text-slate-700 font-sans w-full text-left italic uppercase font-black">
    <router-view />
  </div>

  <div v-else class="min-h-screen bg-[#FFF5F7] text-slate-700 font-sans flex overflow-x-hidden text-left relative">
    
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/30 rounded-full blur-[120px] animate-pulse pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[150px] pointer-events-none z-0"></div>
    
    <Transition name="fade">
      <div v-if="unreadRejectedReport" class="fixed inset-0 z-[6000] flex items-center justify-center px-6">
        <div class="absolute inset-0 bg-pink-900/40 backdrop-blur-md" @click="dismissRejection(unreadRejectedReport.id)"></div>
        <div class="relative bg-white border-2 border-red-100 w-full max-w-md p-8 rounded-[40px] shadow-2xl text-center">
          <div class="w-20 h-20 bg-red-50 text-red-500 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4">⚠️</div>
          <h2 class="text-2xl text-slate-800 font-black italic uppercase">BÁO CÁO BỊ TỪ CHỐI</h2>
          <p class="text-slate-500 text-sm font-bold mt-4 bg-red-50 p-4 rounded-2xl border border-red-100 italic">{{ unreadRejectedReport.adminNote }}</p>
          <button @click="dismissRejection(unreadRejectedReport.id)" class="w-full py-4 mt-6 bg-slate-800 text-white rounded-2xl font-black italic uppercase shadow-lg active:scale-95">Đã hiểu</button>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showWelcomePopup" class="fixed inset-0 z-[6000] flex items-center justify-center px-6">
        <div class="absolute inset-0 bg-pink-900/40 backdrop-blur-md" @click="showWelcomePopup = false"></div>
        <div class="relative bg-white/80 backdrop-blur-xl border border-white/60 w-full max-w-md p-10 rounded-[40px] shadow-2xl text-center">
          <div class="w-20 h-20 bg-gradient-to-tr from-[#ED4E95] to-[#A061F0] rounded-3xl mx-auto flex items-center justify-center text-4xl animate-bounce shadow-lg">🎁</div>
          <h2 class="text-4xl text-slate-800 font-black italic uppercase tracking-tighter mt-6">CHÀO MỪNG ✨</h2>
          <p class="text-slate-500 text-[11px] font-bold mt-4 uppercase">Hệ thống gửi tặng 10,000Đ vào ví nàng rồi nhé.</p>
          <button @click="showWelcomePopup = false" class="w-full py-5 mt-8 bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white rounded-[20px] font-black italic active:scale-95 text-lg">Bắt đầu ngay</button>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isMenuOpen" @click="isMenuOpen = false" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[4900] lg:hidden"></div>
    </Transition>

    <div :class="['fixed lg:sticky top-0 left-0 h-screen z-[5000] lg:z-[1500] transition-all duration-500 bg-white/95 backdrop-blur-2xl border-r border-white/60 overflow-hidden flex-shrink-0', isMenuOpen ? 'w-[85vw] max-w-[300px] lg:w-72 translate-x-0' : 'w-0 -translate-x-full']">
      <button @click="isMenuOpen = false" class="absolute top-5 right-5 z-[5100] w-9 h-9 flex items-center justify-center bg-pink-50 text-pink-500 rounded-full lg:hidden">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <Sidebar 
        v-if="isMenuOpen" 
        :isLoggedIn="isLoggedIn" 
        :isMenuOpen="isMenuOpen" 
        :username="username" 
        :userBalance="userBalance" 
        @toggleMenu="isMenuOpen = !isMenuOpen" 
        @logout="logout" 
        @routerPush="handleNav" 
        @requireAuth="handleNav" 
        @scrollToHistory="handleScrollToHistory" 
        @contactSupport="contactSupport" 
      />
    </div>

    <div class="flex-1 flex flex-col transition-all duration-500 min-w-0 bg-transparent w-full relative z-10">
      <header class="h-16 md:h-20 flex items-center justify-between px-4 md:px-10 sticky top-0 bg-white/60 backdrop-blur-2xl z-[1100] border-b border-white/50 shadow-sm">
        <div class="flex items-center gap-3">
          <button @click.stop="isMenuOpen = !isMenuOpen" class="p-2 bg-white/80 border border-pink-100 rounded-[14px] shadow-sm">
            <svg v-if="!isMenuOpen" class="w-6 h-6 text-[#ED4E95]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            <svg v-else class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <span class="text-slate-800 font-black italic tracking-tighter text-xl lg:hidden ml-2">MÂY <span class="text-[#ED4E95]">FREELANCE</span></span>
        </div>
        
        <div class="flex items-center gap-4 bg-white/80 border border-white shadow-sm pl-5 pr-1.5 py-1.5 rounded-full ml-auto uppercase italic font-black">
          <div class="flex items-center gap-2">
            <span class="text-slate-800 text-sm md:text-xl font-black italic tracking-tighter">
              {{ isLoggedIn ? (isBalanceVisible ? userBalance.toLocaleString() : '******') : '0' }} <span class="text-[#ED4E95] text-[12px]">đ</span>
            </span>
            <button @click="toggleBalance" class="text-pink-300 hover:text-pink-500 transition-colors px-1">
              <svg v-if="isBalanceVisible" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
            </button>
          </div>
          <button @click="handleNav('/withdraw')" class="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-r from-[#ED4E95] to-[#A061F0] text-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">+</button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-4 md:p-10 pb-44 md:pb-10 space-y-10 relative italic uppercase font-black">
        <template v-if="route.path === '/'">
           <JobSection 
             :username="username" 
             :isLoggedIn="isLoggedIn" 
             :userBalance="userBalance" 
             @receiveJob="handleReceiveJob" 
             @routerPush="handleNav" 
             @contactSupport="contactSupport" 
           />
           <HistorySection 
             id="history-section" 
             :isLoggedIn="isLoggedIn" 
             :isDataLoading="isDataLoading" 
             :myReports="combinedHistory" 
           />
           <InfoSection @contactSupport="contactSupport" />
           <Footer />
        </template>

        <template v-else-if="route.path === '/jobs-me'">
           <GiftRewardView :myReports="myReports" :username="username" />
        </template>

        <router-view v-else />
      </main>
    </div>

    <nav class="fixed bottom-5 left-4 right-4 h-[90px] lg:hidden z-[5000] flex justify-between items-center px-2 md:px-4 bg-white/95 backdrop-blur-3xl rounded-[40px] shadow-[0_20px_50px_rgba(237,78,149,0.2)] border-[3px] border-white">

       <button @click="handleNav('/')" class="flex flex-col items-center gap-1 w-[20%] group">
         <div :class="['w-[52px] h-[52px] rounded-[22px] flex items-center justify-center transition-all duration-300', route.path === '/' ? 'bg-pink-50 shadow-inner scale-110 -translate-y-1' : 'bg-transparent']">
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/House/3D/house_3d.png" class="w-11 h-11 object-contain drop-shadow-md" alt="Home">
         </div>
         <span class="text-[9px] font-black tracking-widest uppercase mt-0.5" :class="route.path === '/' ? 'text-[#ED4E95]' : 'text-slate-400'">HOME</span>
       </button>

       <button @click="handleNav('/jobs-me')" class="flex flex-col items-center gap-1 w-[20%] group relative">
         <div class="absolute -top-2 -right-1 z-20 animate-bounce">
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire/3D/fire_3d.png" class="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,165,0,0.8)]" alt="Hot">
         </div>
         <div :class="['w-[52px] h-[52px] rounded-[22px] flex items-center justify-center transition-all duration-300', route.path === '/jobs-me' ? 'bg-orange-50 shadow-inner scale-110 -translate-y-1' : 'bg-transparent']">
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Wrapped%20gift/3D/wrapped_gift_3d.png" class="w-11 h-11 object-contain drop-shadow-md" alt="Gift">
         </div>
         <span class="text-[8px] font-black tracking-tighter uppercase leading-none text-center" :class="route.path === '/jobs-me' ? 'text-orange-500' : 'text-slate-400'">NHẬN QUÀ <br/> 300K</span>
       </button>

       <div class="relative w-[20%] flex justify-center">
         <div class="absolute -bottom-1 text-[8px] font-black text-[#ED4E95] whitespace-nowrap tracking-widest uppercase">RÚT CÁT-XÊ</div>
         <button @click="handleNav('/withdraw')" class="absolute bottom-3 w-[70px] h-[70px] bg-gradient-to-tr from-[#ED4E95] to-[#A061F0] rounded-[26px] flex items-center justify-center text-white border-[6px] border-[#FFF5F7] shadow-[0_15px_30px_rgba(237,78,149,0.4)] hover:scale-110 hover:-translate-y-2 transition-all duration-300 z-10 group">
           <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Money%20with%20wings/3D/money_with_wings_3d.png" class="w-10 h-10 drop-shadow-lg group-hover:rotate-12 transition-transform" alt="Withdraw">
         </button>
       </div>

       <button @click="handleScrollToHistory" class="flex flex-col items-center gap-1 w-[20%] group">
         <div class="w-[52px] h-[52px] rounded-[22px] flex items-center justify-center transition-all duration-300 bg-transparent">
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Alarm%20clock/3D/alarm_clock_3d.png" class="w-11 h-11 object-contain drop-shadow-md opacity-90" alt="History">
         </div>
         <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase mt-0.5">LỊCH SỬ</span>
       </button>

       <button @click="isMenuOpen = true" class="flex flex-col items-center gap-1 w-[20%] group">
         <div class="w-[52px] h-[52px] rounded-[22px] flex items-center justify-center transition-all duration-300 bg-transparent">
            <img src="https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hamburger/3D/hamburger_3d.png" class="w-11 h-11 object-contain drop-shadow-md opacity-90" alt="Menu">
         </div>
         <span class="text-[9px] font-black tracking-widest text-slate-400 uppercase mt-0.5">MENU</span>
       </button>
    </nav>

    <Transition name="slide-up">
      <div v-if="randomNotice" class="fixed bottom-[110px] lg:bottom-10 left-4 md:left-8 z-[5000] flex items-center gap-4 bg-white/80 backdrop-blur-2xl border border-white/60 p-4 rounded-[24px] shadow-2xl min-w-[280px] italic uppercase font-black">
        <div :class="['w-12 h-12 rounded-[18px] flex items-center justify-center text-white text-xl shadow-inner', randomNotice.type === 'withdraw' ? 'bg-indigo-500' : 'bg-[#ED4E95]']">
          {{ randomNotice.type === 'withdraw' ? '💸' : '✨' }}
        </div>
        <div class="flex flex-col text-left leading-tight">
          <span class="text-slate-800 text-[11px] font-black">{{ randomNotice.name }}</span>
          <span :class="['text-[14px] font-black', randomNotice.type === 'withdraw' ? 'text-indigo-600' : 'text-[#ED4E95]']">{{ randomNotice.title }} {{ randomNotice.amount }}Đ</span>
          <span class="text-slate-500 text-[9px] font-bold tracking-widest mt-0.5">{{ randomNotice.sub }}</span>
        </div>
      </div>
    </Transition>

    <AppBrowserBlocker />
    <RewardPopup />

  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar { width: 5px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 10px; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.slide-up-enter-from { opacity: 0; transform: translateY(80px) scale(0.6); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>