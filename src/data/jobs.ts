// src/data/jobs.ts
export const jobsData: Record<string, any> = {
  // --- 1. CHIẾN DỊCH BRAND (MỚI) ---
  'katinat-threads': {
    title: "KATINAT x THREADS",
    reward: "50.000đ",
    color: "text-red-600",
    badge: "HOT 🔥",
    warning: "NGHIÊM CẤM HÀNH VI GIAN LẬN, ĐĂNG BÀI XONG XOÁ LUÔN. HÀNH VI NÀY SẼ BỊ KHOÁ TÀI KHOẢN VĨNH VIỄN VÀ HUỶ HẾT HOA HỒNG!",
    steps: [
      { 
        id: 1, 
        title: "TẢI ẢNH CHIẾN DỊCH VÀ SAO CHÉP NỘI DUNG", 
        content: "Lưu hình ảnh chiến dịch 'Dệt Gấm Vóc Tự Hào' của Katinat về máy. Sau đó chọn sao chép nội dung mẫu bên dưới:",
        copyContents: [
          { label: "MẪU BÀI ĐĂNG", text: "Tự hào dệt gấm vóc cùng Katinat! Ly nước phiên bản đặc biệt xinh xỉu luôn mấy bà ơi 😍 Ai chưa thử thì ghé liền nha! \n#Katinat #DetGamVocTuHao @katinat.official" }
        ]
      },
      { 
        id: 2, 
        title: "ĐĂNG BÀI LÊN TRANG CÁ NHÂN THREADS", 
        content: "Mở ứng dụng Threads, dán nội dung vừa copy và đăng kèm ảnh ở chế độ công khai.",
        img: "images/anh-thread1.jpg"
      },
      { 
        id: 3, 
        title: "CHỤP ẢNH BẰNG CHỨNG BÀI ĐĂNG", 
        content: "Chụp lại màn hình bài viết đã hiển thị thành công trên trang cá nhân của bạn." 
      },
      { 
        id: 4, 
        title: "NỘP BẰNG CHỨNG", 
        content: "Quay lại web, chọn Gửi bằng chứng và tải ảnh lên hệ thống để chờ duyệt nhuận bút." 
      }
    ]
  },

  // --- 2. GOOGLE MAP x KATINAT (MỚI) ---
  'google-map-katinat': {
    title: "MAP x KATINAT",
    reward: "30.000đ",
    color: "text-cyan-400", 
    badge: "MAP 📍", 
    steps: [
      { 
        id: 1, 
        title: "TÌM KIẾM ĐỊA ĐIỂM KATINAT", 
        content: "Mở ứng dụng Google Map trên điện thoại, tìm chi nhánh Katinat bất kỳ gần bạn nhất.", 
        img: "images/anh-vincom1.jpg" 
      },
      { 
        id: 2, 
        title: "ĐÁNH GIÁ 5 SAO & BÌNH LUẬN", 
        content: "Nhấn đánh giá 5 sao kèm lời khen có tâm (VD: Nước ngon, bao bì dệt gấm vóc đẹp, không gian quán chill...).", 
        img: "images/anh-vincom2.jpg" 
      },
      { 
        id: 3, 
        title: "CHỤP LẠI ẢNH BẰNG CHỨNG", 
        content: "Chụp lại ảnh màn hình đánh giá 5 sao của bạn đã hiển thị công khai trên Map."
      }
    ]
  },

  // --- 3. SEEDING FANPAGE MỸ PHẨM (MỚI) ---
  'share-fanpage-cosmetics': {
    title: "SEEDING MỸ PHẨM",
    reward: "30.000đ",
    color: "text-pink-500",
    badge: "EASY ✨",
    steps: [
      { 
        id: 1, 
        title: "TRUY CẬP FANPAGE NHÃN HÀNG", 
        content: "Nhấn vào nút bên dưới để đi tới bài viết ra mắt BST Son mới của nhãn hàng Lemonade Cosmetics.",
        downloadLink: "https://www.facebook.com/LemonadeCosmetics",
        buttonText: "ĐI TỚI BÀI VIẾT ➔"
      },
      { 
        id: 2, 
        title: "THẢ TIM & BÌNH LUẬN", 
        content: "Thả tim bài viết và để lại 1 bình luận khen sản phẩm chân thực, tự nhiên (VD: Màu son này tôn da quá, packaging xinh ghê...)." 
      },
      { 
        id: 3, 
        title: "CHIA SẺ VÀ CHỤP MÀN HÌNH", 
        content: "Chia sẻ bài viết về trang Facebook cá nhân ở chế độ công khai. Sau đó chụp màn hình phần bình luận của bạn để làm bằng chứng." 
      }
    ]
  },

  // --- 4. NHIỆM VỤ SÁNG TẠO (CONTENT) ---
  'write-content': {
    title: "VIẾT BLOG/CONTENT",
    reward: "50.000đ",
    color: "text-pink-400",
    badge: "CHILL ✨",
    steps: [
      { 
        id: 1, 
        title: "CHỌN CHỦ ĐỀ YÊU THÍCH", 
        content: "Lựa chọn 1 trong các chủ đề mở: Review mỹ phẩm đang dùng, Mẹo phối đồ đi cafe, hoặc Gợi ý địa điểm sống ảo." 
      },
      { 
        id: 2, 
        title: "VIẾT BÀI TỐI THIỂU 300 CHỮ", 
        content: "Viết nội dung chia sẻ chân thực, dễ thương. Có thể trình bày gọn gàng trên Google Doc hoặc Note điện thoại." 
      },
      { 
        id: 3, 
        title: "GỬI BẢN NHÁP", 
        content: "Chụp ảnh màn hình bài viết hoặc dán link Google Doc vào phần 'Ghi chú' khi nộp bằng chứng để Mây duyệt." 
      }
    ]
  },

  // --- 5. NHIỆM VỤ SÁNG TẠO (VIDEO EDIT) ---
  'edit-video': {
    title: "EDIT VIDEO CAPCUT",
    reward: "80.000đ",
    color: "text-purple-400",
    badge: "TREND 🎬",
    steps: [
      { 
        id: 1, 
        title: "CHUẨN BỊ SOURCE QUAY", 
        content: "Sử dụng các đoạn clip ngắn quay sản phẩm hoặc vlog đời sống hàng ngày của bạn (Chất lượng rõ nét)." 
      },
      { 
        id: 2, 
        title: "EDIT TRÊN CAPCUT", 
        content: "Cắt ghép, chèn nhạc trend Tiktok và thêm sub (phụ đề) cho video. Đảm bảo thời lượng từ 15-30 giây." 
      },
      { 
        id: 3, 
        title: "XUẤT VIDEO & ĐĂNG TIKTOK", 
        content: "Xuất video chất lượng 1080p, đăng lên Tiktok cá nhân (chế độ công khai) và chụp lại màn hình bài đăng." 
      }
    ]
  },

  // --- 6. NHIỆM VỤ SÁNG TẠO (REVIEWER) ---
  'product-review': {
    title: "REVIEWER MỸ PHẨM",
    reward: "60.000đ",
    color: "text-rose-400",
    badge: "GIRL 💄",
    steps: [
      { 
        id: 1, 
        title: "CHỤP ẢNH FEEDBACK XINH XẮN", 
        content: "Sử dụng sản phẩm mỹ phẩm có sẵn của bạn, set up góc chụp và chụp 1 tấm ảnh 'sống ảo' cùng sản phẩm thật lung linh." 
      },
      { 
        id: 2, 
        title: "VIẾT ĐÁNH GIÁ NGẮN", 
        content: "Viết 3-5 dòng cảm nhận về chất son, chất kem, mùi hương hoặc hiệu quả sau khi sử dụng." 
      },
      { 
        id: 3, 
        title: "ĐĂNG BÀI LÊN MẠNG XÃ HỘI", 
        content: "Đăng ảnh và bài review lên Facebook/Instagram ở chế độ công khai. Chụp màn hình lại để nộp bằng chứng." 
      }
    ]
  },

  // --- 7. NGÂN HÀNG MSB (GIỮ NGUYÊN CODE CŨ) ---
  'msb-bank': {
    title: "NGÂN HÀNG MSB",
    reward: "100.000đ",
    color: "text-red-500",
    steps: [
      { 
        id: 1, 
        title: "TẢI APP MSB MBANK CÁ NHÂN ", 
        content: "CHÚ Ý TẢI ĐÚNG APP MSB MBANK CÁ NHÂN . CẨN THẬN TẢI SAI APP .", 
        img: "images/anh-msb1.jpg" 
      },
      { 
        id: 2, 
        title: "ĐĂNG KÝ VÀ NHẬP MÃ GIỚI THIỆU DNS69355", 
        content: "BẮT BUỘC NHẬP MÃ GIỚI THIỆU DNS69355 VÀ CHỤP LẠI ẢNH.", 
        img: "images/anh-msb2.jpg", 
        note: "NHẬP MÃ GIỚI THIỆU DNS69355 VÀ CHỤP ẢNH LẠI " 
      },
      { 
        id: 3, 
        title: "CHỤP ẢNH BẰNG CHỨNG MỞ TÀI KHOẢN THÀNH CÔNG", 
        content: "CHỤP LẠI ẢNH NHƯ BÊN DƯỚI ĐÂY , VÀ ĐĂNG NHẬP VÀO APP MSB.", 
        img: "images/anh-msb3.jpg" 
      }
    ]
  },

  // --- 8. CHỨNG KHOÁN KAFI (GIỮ NGUYÊN CODE CŨ) ---
  'app-chung-khoan': {
    title: "CHỨNG KHOÁN",
    reward: "125.000đ",
    color: "text-blue-500",
    steps: [
      { 
        id: 1, 
        title: "BẤM VÀO LINK TẢI APP", 
        content: "Chọn TẢI APP NGAY để tải APP chứng khoán về điện thoại.", 
        downloadLink: "https://open.kafi.vn/x/sign-up?refCode=D0020029",
        buttonText: "TẢI APP NGAY ➔"
      },
      { 
        id: 2, 
        title: "ĐĂNG KÝ VÀ NHẬP MÃ GIỚI THIỆU D0020029", 
        content: "BẮT BUỘC NHẬP MÃ GIỚI THIỆU D0020029 VÀ CHỤP LẠI ẢNH.", 
        img: "images/anh-kafi2.jpg", 
        note: "NHẬP MÃ: D0020029 (BẮT BUỘC)" 
      },
      { 
        id: 3, 
        title: "ĐĂNG KÝ TÀI KHOẢN THÀNH CÔNG", 
        content: "CHỤP LẠI ẢNH ĐĂNG NHẬP THÀNH CÔNG ĐỂ GỬI BẰNG CHỨNG.", 
        img: "images/anh-kafi3.jpg" 
      },
      { 
        id: 4, 
        title: "LƯU LẠI ẢNH VÀ GỬI", 
        content: "GỬI 2 ẢNH ĐÓ VÀ CHỜ PHÊ DUYỆT HOA HỒNG." 
      }
    ]
  },

  // --- 9. NGÂN HÀNG VPBANK (GIỮ NGUYÊN CODE CŨ) ---
  'vpbank': {
    title: "NGÂN HÀNG VPB",
    reward: "100.000đ",
    color: "text-emerald-600",
    steps: [
      { 
        id: 1, 
        title: "TẢI APP VPBANK NEO", 
        content: "TẢI ỨNG DỤNG VÀ TIẾN HÀNH ĐĂNG KÝ TÀI KHOẢN.", 
        img: "images/anh-vpbank1.jpg" 
      },
      { 
        id: 2, 
        title: "NHẬP MÃ GIỚI THIỆU : AT420584", 
        content: "BẮT BUỘC NHẬP MÃ GIỚI THIỆU AT420584 VÀ CHỤP LẠI MÀN HÌNH.", 
        img: "images/anh-vpbank2.jpg", 
        note: "NHẬP MÃ: AT420584 (BẮT BUỘC)" 
      },
      { 
        id: 3, 
        title: "ĐĂNG NHẬP VÀ CHỤP ẢNH", 
        content: "GỬI ẢNH BẰNG CHỨNG NHƯ HƯỚNG DẪN ĐỂ XÉT DUYỆT.", 
        img: "images/anh-vpbank3.jpg" 
      }
    ]
  },

  // --- 10. NGÂN HÀNG TPBANK (GIỮ NGUYÊN CODE CŨ) ---
  'tpbank': {
    title: "NGÂN HÀNG TPB",
    reward: "100.000đ",
    color: "text-purple-600",
    steps: [
      { 
        id: 1, 
        title: "TẢI APP TPBANK", 
        content: "Mở ứng dụng và bắt đầu đăng ký tài khoản miễn phí.", 
        img: "images/anh-tpbank1.jpg" 
      },
      { 
        id: 2, 
        title: "NHẬP MÃ GIỚI THIỆU AT09", 
        content: "BẮT BUỘC NHẬP MÃ GIỚI THIỆU AT09 CHỤP LẠI ẢNH BẰNG CHỨNG.", 
        img: "images/anh-tpbank2.jpg", 
        note: "NHẬP MÃ: AT09 (BẮT BUỘC)" 
      },
      { 
        id: 3, 
        title: "ĐĂNG NHẬP VÀ CHỤP ẢNH", 
        content: "CHỤP LẠI ẢNH ĐĂNG NHẬP NHƯ DƯỚI ĐÂY.", 
        img: "images/anh-tpbank3.jpg" 
      }
    ]
  }
};