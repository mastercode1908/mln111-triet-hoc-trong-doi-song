# 🔐 Hướng dẫn Fix Lỗi Bảo Mật API Key

## ⚠️ Vấn đề
Google đã phát hiện và thu hồi API key của bạn vì:
- ✗ API key bị public trên GitHub
- ✗ Hard-code trong frontend JavaScript (ai cũng xem được)
- ✗ Bị bot tự động quét thấy

## ✅ Giải pháp đã triển khai
Tôi đã tạo một **backend server** để bảo vệ API key:
- ✓ API key giờ được lưu an toàn trong file `.env` (không public lên GitHub)
- ✓ Frontend gọi qua backend thay vì trực tiếp gọi Google API
- ✓ Bảo mật hoàn toàn

---

## 📋 Các bước thực hiện

### Bước 1: Lấy API Key mới
1. Truy cập: https://makersuite.google.com/app/apikey
2. Tạo API key mới (key cũ đã bị thu hồi)
3. **Hạn chế API key** (quan trọng!):
   - Chọn "Application restrictions" → "HTTP referrers"
   - Thêm domain của bạn (ví dụ: `yourdomain.com/*`)
   - Hoặc `localhost:3000/*` cho development

### Bước 2: Cài đặt Dependencies
Mở terminal trong thư mục project và chạy:

```bash
npm install
```

### Bước 3: Tạo file .env
1. Copy file `.env.example` thành `.env`:
   ```bash
   copy .env.example .env
   ```

2. Mở file `.env` và thay `your_new_api_key_here` bằng API key mới:
   ```
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   PORT=3000
   ```

### Bước 4: Chạy Server
```bash
npm start
```

Hoặc dùng nodemon để tự động reload khi code thay đổi:
```bash
npm run dev
```

### Bước 5: Truy cập Website
Mở trình duyệt và vào:
```
http://localhost:3000
```

---

## 🚀 Deploy lên Production

### Option 1: Deploy lên Vercel/Netlify (Serverless)
1. Tạo serverless function thay vì Express server
2. Thêm environment variable `GEMINI_API_KEY` trong dashboard
3. Deploy

### Option 2: Deploy lên VPS/Cloud (Heroku, Railway, Render)
1. Push code lên GitHub (đảm bảo `.env` đã có trong `.gitignore`)
2. Thêm environment variable `GEMINI_API_KEY` trong dashboard
3. Deploy

### Option 3: Deploy frontend riêng + backend riêng
1. Frontend: Deploy lên Vercel/Netlify (static hosting)
2. Backend: Deploy lên Railway/Render
3. Cập nhật `API_ENDPOINT` trong `js/ai-assistants.js` để trỏ đến backend URL

---

## 🔒 Checklist Bảo mật

- [x] API key không còn hard-code trong JavaScript
- [x] File `.env` đã được thêm vào `.gitignore`
- [ ] Đã tạo API key mới (key cũ đã bị revoke)
- [ ] Đã hạn chế API key chỉ dùng cho domain của bạn
- [ ] Đã test local thành công
- [ ] Khi deploy, đã thêm environment variable trên hosting platform

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module 'express'"
→ Chạy `npm install`

### Lỗi: "GEMINI_API_KEY is not defined"
→ Kiểm tra file `.env` đã tạo chưa và có đúng format không

### Lỗi: "Failed to get response from AI"
→ Kiểm tra API key mới có hoạt động không (test trên Google AI Studio)

### Website không load được
→ Đảm bảo server đang chạy (`npm start`) và truy cập `http://localhost:3000`

---

## 📝 Notes

- **KHÔNG BAO GIỜ** commit file `.env` lên GitHub
- **KHÔNG BAO GIỜ** share API key công khai
- Nếu vô tình push API key lên GitHub, hãy revoke ngay và tạo key mới
- Luôn sử dụng environment variables cho sensitive data

---

## 📞 Cần trợ giúp?
Nếu gặp vấn đề, hãy kiểm tra:
1. Console log trong browser (F12)
2. Terminal log của server
3. File `.env` có đúng format không
