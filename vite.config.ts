import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * VÌ REPO CỦA MÀY LÀ mmopro.github.io (DẠNG USER PAGE), 
   * NÊN BASE PHẢI ĐỂ LÀ '/' ĐỂ LOAD ĐÚNG ASSETS TỪ THƯ MỤC GỐC.
   */
  base: '/',

  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Tăng giới hạn cảnh báo dung lượng file nếu mày dùng nhiều ảnh/thư viện
    chunkSizeWarningLimit: 2000,
    outDir: 'dist',
    assetsDir: 'assets',
    // Làm sạch thư mục build mỗi lần chạy lại
    emptyOutDir: true,
  }
})