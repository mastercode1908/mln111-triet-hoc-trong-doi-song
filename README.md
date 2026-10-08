# Chủ nghĩa xã hội khoa học trong đời sống

Website HTML/JavaScript với backend Express. Nội dung chuyển từ Triết học sang 7 chương của **Giáo trình Chủ nghĩa xã hội khoa học**, Bộ GD&ĐT, NXB Chính trị quốc gia Sự thật, 2021.

## Chạy cục bộ

Cần Node.js 22 trở lên.

```powershell
npm ci
npm start
```

Mở http://localhost:3000. `npm start` tự tạo bản chạy trong `public/` trước khi mở máy chủ. Không mở HTML bằng `file://` vì bài học được tải qua HTTP.

Khi biên tập và phát triển:

```powershell
npm run dev
```

Chế độ phát triển tự dựng lại website khi nội dung, CSS, JavaScript hoặc backend thay đổi. Không cần khóa AI để học, làm bài hoặc tra cứu.

## Nội dung và chức năng

- 7 chương, 28 mục bài học: mục tiêu, tình huống, kiến thức, sơ đồ, điểm dễ nhầm, tự luận và nguồn.
- 42 câu trắc nghiệm theo 7 chương; bài tổng hợp lấy 2 câu từ mỗi chương.
- 7 tình huống và 7 bài viết diễn giải theo giáo trình.
- Ba hoạt động: ghép khái niệm, phân biệt kiến thức, phân tích tình huống.
- Tìm kiếm có hoặc không dấu; từ điển gồm 18 khái niệm.
- Lưu các mục đã đọc, kết quả tốt nhất, bài tự luận, lịch sử tra cứu trên trình duyệt; xuất bản sao tiến độ.
- Giao diện điện thoại, bàn phím, liên kết mở đúng trang PDF.
- Không còn video, trình phát hoặc iframe trên website được xuất để chạy.

Các bài học là phần tóm lược và diễn giải phục vụ học tập, không phải bản chép toàn bộ giáo trình. Mọi tình huống đều là giả định. Số trang liên kết là trang PDF tính từ 1, không phải số trang in trên sách. Khi thêm trích dẫn nguyên văn, kiểm tra trang gốc. Nhận định và chính sách trong sách được đặt trong bối cảnh 2021.

## Chỉnh sửa nội dung

| Tệp | Nội dung |
| --- | --- |
| `data/course.json` | Tên môn, thông điệp, mô tả |
| `data/chapters.json` | 7 chương, mục bài học, mục tiêu, sơ đồ, tự luận |
| `data/questions.json` | Câu hỏi, lựa chọn, chỉ số đáp án, giải thích, nguồn |
| `data/cases.json` | Tình huống và các gợi ý phân tích |
| `data/articles.json` | Bài viết và đường dẫn mới |
| `data/glossary.json` | Thuật ngữ và liên kết bài học |
| `data/sources.json` | Thông tin nguồn và PDF |
| `css/site.css` | Màu sắc, bố cục, kiểu chữ, giao diện điện thoại |
| `js/app.js` | Hiển thị trang và tương tác |
| `js/state.mjs` | Lưu tiến độ và tính kết quả |
| `js/retrieval.mjs` | Tìm đoạn học liệu cho tra cứu và Gemini |

Giữ ID chương 1–7, ID mục `chương-mục` và các liên kết giữa dữ liệu đồng bộ. Đáp án `correct` bắt đầu từ 0. Mỗi câu hỏi cần `lessonId`, `pages` và `explanation`. Sau khi chỉnh:

```powershell
npm run build
npm test
```

Các tệp HTML là trang khung được tạo bởi `scripts/build-pages.js`; sửa bố cục trong `js/app.js`, không sửa trực tiếp phần được tạo. `data/routes.json` cũng được sinh tự động. `public/` chỉ chứa các tệp cho người dùng truy cập, không đưa backend, tài liệu nội bộ hoặc script cũ vào bản chạy.

Các địa chỉ `module1.html`–`module5.html`, bài viết và game cũ vẫn mở được, nhưng hiển thị học liệu mới. Chương 6–7, tình huống, từ điển và tiến độ có các địa chỉ mới. Một số hình và tài liệu cũ trong kho được giữ để tránh mất tài nguyên; chúng không được đưa vào `public/`.

## Trợ lý AI

Mặc định trang trợ lý tìm học liệu ngay trong trình duyệt và ghi rõ **Tra cứu học liệu · Không dùng AI**. Cách tìm dựa trên từ khóa, nên câu hỏi cụ thể cho kết quả tốt hơn. Câu hỏi ngoài học liệu được thông báo thiếu căn cứ.

Để bật Gemini, sao chép `.env.example` thành `.env`, điền `GEMINI_API_KEY` và khởi động lại. Có thể chọn mô hình bằng `GEMINI_MODEL`. Khóa chỉ dùng ở backend, không đưa vào mã frontend.

Người học chủ động chọn ô dùng Gemini. Khi đó, câu hỏi và các đoạn bài học liên quan được gửi tới dịch vụ AI. Backend dùng vai trò CNXH khoa học và chỉ chấp nhận ID nguồn thuộc các đoạn đã truy xuất; số trang lấy từ dữ liệu website, không lấy số trang do mô hình tự tạo. Nguồn cho AI là 28 mục diễn giải của môn mới; PDF đầy đủ được cung cấp riêng để đối chiếu. Không gửi toàn bộ 29 MB PDF cho mỗi câu hỏi.

API có giới hạn độ dài, dung lượng và số yêu cầu cơ bản trong mỗi tiến trình. Giới hạn này không phải giới hạn phân tán giữa nhiều instance. Khi cần bảo vệ chi phí ở quy mô lớn, cấu hình giới hạn trên nền tảng triển khai.

## Kiểm tra

```powershell
npm run build
npm test
npm run test:browser
```

Bộ kiểm tra trình duyệt dùng Microsoft Edge đã cài trên Windows, chạy headless qua Playwright. Trên môi trường khác, cài Chromium cho Playwright và thay `channel: 'msedge'` trong `playwright.config.cjs`. Suite mở máy chủ ở cổng 3187, không dùng khóa thật hoặc gọi dịch vụ AI.

Kiểm tra bao gồm liên kết và hiển thị 47 trang, việc loại bỏ video, đọc PDF theo byte range, lưu tiến độ và tự luận, tìm không dấu, hoàn thành bài trắc nghiệm, game, tra cứu không có AI, và bố cục điện thoại. Ảnh kiểm tra giao diện được lưu tại `output/site-preview/`.

## Vercel

`server.js` xuất ứng dụng Express; `npm run build` tạo `public/` để Vercel phục vụ tệp tĩnh. Khi kết nối dự án, dùng thư mục này làm root dự án, framework Express và lệnh build `npm run build`; không chọn chế độ chỉ triển khai frontend nếu muốn dùng AI. Thêm `GEMINI_API_KEY` và tùy chọn `GEMINI_MODEL` trong môi trường Vercel nếu bật AI.

Không cấu hình `PDF_URL` của bản Triết học cũ; nguồn PDF hiện tại là `assets/docs/cnxh-khoa-hoc-2021.pdf`.

Tài liệu chính thức: https://vercel.com/docs/frameworks/backend/express

Thay đổi trong kho chưa tự cập nhật website đã phát hành; cần tạo bản preview và triển khai từ kho đã cập nhật. Không có thao tác deploy hoặc push trong lần chỉnh sửa này.
