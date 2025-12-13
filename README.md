# moonchill# README - Moon Chill

## 1. Giới thiệu
**Moon Chill** là ứng dụng web xem phim trực tuyến nhẹ, nhanh và hiện đại.  
- Dữ liệu phim được lấy từ **TMDB API** (trailer, poster, thông tin).  
- Phim đầy đủ có thể xem từ **file local** hoặc **link embed** (Drive, Fembed, Ok.ru...).  
- Giao diện **glassmorphism**, hiệu ứng mượt, hỗ trợ **dark-mode**.

## 2. Tính năng chính
| Tính năng | Mô tả |
|-----------|-------|
| **Trang chủ** | Slider phim thịnh hành, hero banner tự động |
| **Phim mới** | Danh sách phim vừa cập nhật |
| **Thể loại** | Chọn thể loại → load slider riêng |
| **Tìm kiếm** | Tìm theo tên phim |
| **Trailer** | Click poster → trailer tự động phát |
| **Xem phim** | Chọn file từ máy hoặc dán link embed |
| **Responsive** | Mobile-first, menu burger |
| **Dark-mode** | Class sẵn sàng, chỉ cần toggle |

## 3. Cài đặt nhanh
1. **Clone / tải** toàn bộ source về máy.  
2. **Mở trực tiếp** `index.html` (không cần server).  
3. **Tùy chỉnh**:  
   - Thay `API_KEY` trong file `app.js` bằng key của bạn (TMDB).  
   - Upload phim lên Drive / Ok.ru → lấy link embed → paste vào ô “Xem phim”.

## 4. Cấu trúc thư mục
```
moon-chill/
├── index.html          // Trang chủ
├── movie-player.html   // Trang xem phim
├── style.css           // Style toàn trang (glass UI)
├── app.js              // Logic chính
└── README.md           // File này
```

## 5. Kỹ thuật sử dụng
- **Local file**: Click “📁 Chọn phim từ máy” → chọn `.mp4`, `.mkv`… → xem ngay.  
- **Link embed**:  
  - **Google Drive**: chia sẻ → copy ID → `https://drive.google.com/uc?id=ID&export=download`.  
  - **Ok.ru / Fembed**: copy link embed → paste → “Xem phim”.

## 6. Hỗ trợ trình duyệt
- Chrome ≥ 90, Edge ≥ 90, Firefox ≥ 88, Safari ≥ 13.  
- **Không cần cài extension**, không thu thập dữ liệu người dùng.

## 7. License
MIT – bạn tự do sửa, chia sẻ, thương mại hoá.  
**Nguồn API**: © TMDB (dùng miễn phí với key cá nhân).

## 8. Liên hệ
Issue / Pull-Request trên GitHub hoặc email: `nhamtri2k4@gmail.com`.

---
**Enjoy chilling with Moon Chill!** 🌙🍿