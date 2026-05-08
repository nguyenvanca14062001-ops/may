<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase' // Dùng ../ để quay ra ngoài lấy file firebase
import { doc, onSnapshot } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

const userBalance = ref(0)
const userName = ref('MEMBER')

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid)
      onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          userBalance.value = docSnap.data().balance || 0
          userName.value = docSnap.data().username || 'MEMBER'
        }
      })
    }
  })
})
</script>

<template>
  <header class="w-full p-6 flex justify-between items-center font-black italic uppercase">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xl shadow-lg">M</div>
      <span class="text-white text-xl tracking-tighter">PRO</span>
    </div>
    
    <div class="flex items-center gap-4 bg-[#111726] border border-slate-800 py-2 px-5 rounded-2xl shadow-2xl">
      <div class="text-right">
        <p class="text-[8px] text-slate-500 mb-0.5 tracking-[2px]">VÍ CỦA {{ userName }}</p>
        <p class="text-emerald-400 text-lg leading-none">{{ userBalance.toLocaleString() }}đ</p>
      </div>
      <div class="text-2xl">💰</div>
    </div>
  </header>
</template>