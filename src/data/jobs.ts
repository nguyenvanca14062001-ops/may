// src/data/jobs.ts
export const jobsData: Record<string, any> = {
  'referral-program': {
    title: "GIỚI THIỆU",
    reward: "300.000đ",
    color: "text-yellow-500",
    steps: [
      {
        id: 1, 
        title: "MỜI 2 NGƯỜI KHÁC ĐĂNG KÝ APP CHỨNG KHOÁN ", 
        content: "Chọn sao chép để gửi link cho bạn bè đăng ký .",
        referralLink: "https://open.kafi.vn/x/D0020029"
      },
      { 
        id: 2, 
        title: "ĐĂNG KÝ VÀ NHẬP MÃ GIỚI THIỆU D0020029", 
        content: "Chụp lại ảnh này để gửi bằng chứng .",
        img: "images/anh-kafi2.jpg",
      },
      { 
        id: 3, 
        title: "ĐĂNG NHẬP VÀO APP VÀ CHỤP LẠI MÀN HÌNH", 
        content: "Chụp lại màn hình để gửi ảnh bằng chứng.",
        img: "images/anh-kafi3.jpg",
        note: "TỔNG PHẢI GỬI 4 ẢNH BẰNG CHỨNG !" 
      },
      { 
        id: 4, 
        title: "GỬI 4 ẢNH BẰNG CHỨNG VÀ CHỜ DUYỆT HOA HỒNG", 
        content: "Bao gồm 2 ảnh nhập mã giới thiệu và 2 ảnh đăng nhập thành công." 
      }
    ]
  },
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
  'google-map': {
    title: "GOOGLE MAP",
    reward: "25.000đ",
    color: "text-cyan-400", 
    badge: "NEW", 
    steps: [
      { 
        id: 1, 
        title: "TÌM ĐỊA ĐIỂM VINCOM HÀ NỘI", 
        content: "CHỌN 3 ĐỊA CHỈ NGẪU NHIÊN VINCOM HÀ NỘI.", 
        img: "images/anh-vincom1.jpg" 
      },
      { 
        id: 2, 
        title: "ĐÁNH GIÁ 5 SAO", 
        content: "Viết bình luận tốt và đăng kèm ảnh chụp địa điểm.", 
        img: "images/anh-vincom2.jpg" 
      },
      { 
        id: 3, 
        title: "CHỤP LẠI ẢNH BẰNG CHỨNG", 
        content: "CHỤP LẠI 3 ẢNH ĐÁNH GIÁ 5 SAO LÀM ẢNH BẰNG CHỨNG."
      }
    ]
  },
  'dang-bai-threads': {
    title: "THREADS",
    reward: "25.000đ",
    color: "text-purple-400", 
    badge: "NEW", 
    warning: "NGHIÊM CẤM HÀNH VI GIAN LẬN, ĐĂNG BÀI XONG XOÁ LUÔN. HÀNH VI NÀY SẼ BỊ KHOÁ TÀI KHOẢN VĨNH VIỄN VÀ HUỶ HẾT HOA HỒNG!",
    steps: [
      { 
        id: 1, 
        title: "SAO CHÉP NỘI DUNG MẪU", 
        content: "Chọn 1 trong 2 bài mẫu bên dưới và nhấn nút sao chép để lấy nội dung:",
        copyContents: [
          { label: "MẪU BÀI SỐ 1", text: `Công việc kiếm tiền remote tại nhà ( nhận công việc trên Web , hoàn thành tiền sẽ cộng về ví và có thể rút tiền về Ngân hàng )
+ công việc : Đăng bài thread , Đăng ký App , đánh giá google Map ......
Thu nhập: 10$ - 30$ / ngày 

Note: không thu phí , không nạp tiền 

Xem JD , nhận JD  ở phần bình luận` },
          { label: "BÌNH LUẬN DƯỚI BÀI VIẾT ( NHỚ GHIM LẠI ) ", text: `Mọi người truy cập vào link dưới đây để đăng ký jd online nhá 
https://www.dangkyxinviec.com/` }
        ]
      },
      { id: 2, title: "ĐĂNG LÊN TRANG CÁ NHÂN THREADS", content: "Mở ứng dụng Threads, dán nội dung và đăng bài ở chế độ công khai.", img: "images/anh-thread1.jpg" },
      { id: 3, title: "CHỤP ẢNH MÀN HÌNH BÀI ĐĂNG", content: "Chụp lại bài viết đã đăng thành công." },
      { id: 4, title: "GỬI BẰNG CHỨNG", content: "Quay lại web, chọn Gửi bằng chứng và tải ảnh lên." }
    ]
  },
  'luot-xem-threads': {
    title: "LƯỢT XEM THREAD",
    reward: "50.000đ",
    color: "text-fuchsia-400", 
    badge: "NEW", 
    warning: "NGHIÊM CẤM HÀNH VI GIAN LẬN, ĐĂNG BÀI XONG XOÁ LUÔN. HÀNH VI NÀY SẼ BỊ KHOÁ TÀI KHOẢN VĨNH VIỄN VÀ HUỶ HẾT HOA HỒNG!",
    steps: [
      { 
        id: 1, 
        title: "SAO CHÉP NỘI DUNG MẪU", 
        content: "Chọn 1 trong 2 bài mẫu bên dưới và nhấn nút sao chép để lấy nội dung:",
        copyContents: [
          { label: "MẪU BÀI SỐ 1", text: `Công việc kiếm tiền remote tại nhà ( nhận công việc trên Web , hoàn thành tiền sẽ cộng về ví và có thể rút tiền về Ngân hàng )
+ công việc : Đăng bài thread , Đăng ký App , đánh giá google Map ......
Thu nhập: 10$ - 30$ / ngày 

Note: không thu phí , không nạp tiền 

Xem JD , nhận JD  ở phần bình luận` },
          { label: "BÌNH LUẬN DƯỚI BÀI VIẾT ( NHỚ GHIM LẠI ) ", text: `Mọi người truy cập vào link dưới đây để đăng ký jd online nhá 
https://www.dangkyxinviec.com/` }
        ]
      },
      { id: 2, title: "ĐĂNG BÀI LÊN TRANG THREAD ", content: "Như ảnh bên dưới hướng dẫn .",  img: "images/anh-thread1.jpg" },
      { id: 3, title: "CHỤP ẢNH KHI ĐẠT MỐC 400 VIEW TRỞ LÊN ", content: "Khi bài viết đạt đủ View, chụp lại màn hình." },
      { id: 4, title: "NỘP BẰNG CHỨNG", content: "Gửi ảnh chụp đạt mốc View." }
    ]
  },
  'join-zalo': {
    title: "NHÓM ZALO",
    reward: "10.000đ",
    color: "text-blue-500",
    steps: [
      { 
        id: 1, 
        title: "BẤM VÀO LINK THAM GIA", 
        content: "Nhấn vào nút bên dưới để chuyển hướng sang ứng dụng Zalo.", 
        downloadLink: "https://zalo.me/g/zbvsdm567",
        buttonText: "THAM GIA NHÓM ➔" 
      },
      { 
        id: 2, 
        title: "NHẤN THAM GIA NHÓM", 
        content: "Yêu cầu tham gia nhóm và chờ admin phê duyệt nếu có.", 
    
      },
      { 
        id: 3, 
        title: "CHỤP ẢNH MÀN HÌNH KHI THAM GIA NHÓM ", 
        content: "Chụp lại màn hình chờ phê duyệt nhóm", 
        
      },
      { 
        id: 4, 
        title: "GỬI BẰNG CHỨNG", 
        content: "Tải ảnh vừa chụp lên hệ thống để xác nhận hoàn thành nhiệm vụ." 
      }
    ]
  },
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