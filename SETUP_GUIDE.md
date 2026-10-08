# Thiết lập và vận hành

Hướng dẫn đầy đủ nằm trong [README.md](README.md).

1. Cài Node.js 22 trở lên và chạy `npm ci`.
2. Chạy `npm start`, mở http://localhost:3000.
3. Dùng `npm run dev` để tự dựng lại khi sửa dữ liệu hoặc giao diện.
4. Website hoạt động đầy đủ về học tập và tra cứu tại chỗ khi chưa có khóa AI.
5. Nếu bật Gemini, sao chép `.env.example` thành `.env`, đặt `GEMINI_API_KEY`, rồi khởi động lại. Không đưa khóa vào HTML/JavaScript hoặc commit `.env`.
6. Trước khi triển khai, chạy `npm run build`, `npm test` và `npm run test:browser`.
7. Trên Vercel dùng backend Express và build `npm run build`; giữ khóa trong biến môi trường của nền tảng.

Nguồn học tập đã đổi sang giáo trình CNXH khoa học 2021. Không dùng `PDF_URL` hoặc PDF Triết học của phiên bản cũ. Bản chạy trong `public/` không phục vụ các tệp nội bộ của dự án.
