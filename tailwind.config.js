/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
 // tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // Đổi màu nền chính (Background)
        'main-bg': '#FDF2F8', // Màu hồng nhạt trắng
        // Đổi màu nút bấm (giống cái nút "Tham gia ngay")
        'btn-gradient-start': '#F472B6', // Hồng
        'btn-gradient-end': '#A855F7',   // Tím hồng
        // Màu chữ
        'main-text': '#1F2937', // Xám đen để nổi trên nền trắng
      }
    },
  },
}