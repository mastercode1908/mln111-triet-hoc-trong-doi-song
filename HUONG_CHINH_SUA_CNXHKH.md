# Hướng chuyển PhiloMap sang Chủ nghĩa xã hội khoa học trong đời sống

## Cơ sở và phạm vi

- Website đã kiểm tra: https://mln111-v3.vercel.app/ (HTML trang chủ).
- Mã nguồn: dự án HTML/JavaScript hiện tại, có Express và trợ lý Gemini.
- Tài liệu: Giáo trình Chủ nghĩa xã hội khoa học, Bộ Giáo dục và Đào tạo, Nhà xuất bản Chính trị quốc gia Sự thật, 2021; dành cho bậc đại học hệ không chuyên lý luận chính trị.
- PDF người dùng cung cấp có 273 trang scan. Đã OCR tất cả các trang, rà soát cấu trúc 7 chương, mục tiêu, các mục nội dung và câu hỏi ôn tập; đối chiếu hình ảnh một số trang. OCR còn lỗi dấu, tên riêng và chữ số; khi đưa định nghĩa hoặc trích dẫn lên website phải kiểm tra ảnh trang gốc.
- Đây là bản đề xuất chuyển website sang môn Chủ nghĩa xã hội khoa học. Chưa thay đổi các trang, câu hỏi, chức năng hay bản đang chạy trên Vercel.

## 1. Định hướng sản phẩm

Tên đề xuất: **Chủ nghĩa xã hội khoa học trong đời sống**.

Thông điệp trang chủ: **Hiểu xã hội từ những câu chuyện quanh bạn**.

Giữ cách dẫn nhập bằng tình huống của PhiloMap, nhưng chuyển trọng tâm sang các quan hệ chính trị - xã hội: lao động, tổ chức xã hội, dân chủ, quan hệ giai cấp, dân tộc, tôn giáo và gia đình. Những nội dung Triết học hiện tại về lượng - chất, nhận thức, vật chất - ý thức không thể thay thế các chương của môn mới.

Hai đường vào dùng chung một nguồn nội dung:

1. **Học theo giáo trình:** 7 chương, bài học ngắn, bài luyện tập và câu hỏi tự luận.
2. **Khám phá từ đời sống:** chọn một vấn đề, đọc tình huống, xem khái niệm liên quan và chuyển tới bài học trong chương.

Không cần xây hai bộ bài giảng riêng. Mỗi tình huống liên kết tới một hoặc nhiều bài học có nguồn rõ ràng.

## 2. Bản đồ 7 chương

Các khoảng trang dưới đây là số thứ tự trong tệp PDF, tính từ 1, thuận tiện cho liên kết mở PDF. Không phải số trang in trên sách.

| Chương | Phạm vi PDF | Nội dung phải có | Cách trình bày đề xuất |
| --- | --- | --- | --- |
| 1. Nhập môn Chủ nghĩa xã hội khoa học | 8-47 | Điều kiện ra đời; tiền đề khoa học và tư tưởng; vai trò Mác, Ăngghen; các giai đoạn phát triển; đối tượng, phương pháp, ý nghĩa nghiên cứu | Dòng thời gian; bảng phân biệt ba bộ phận của chủ nghĩa Mác - Lênin; thẻ khái niệm |
| 2. Sứ mệnh lịch sử của giai cấp công nhân | 48-82 | Khái niệm, đặc điểm; ba nội dung sứ mệnh; điều kiện khách quan và chủ quan; công nhân hiện nay và Việt Nam; phương hướng xây dựng | Tình huống nhà máy tự động hóa; sơ đồ kinh tế / chính trị - xã hội / văn hóa - tư tưởng; bài phân tích tiêu chí |
| 3. Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội | 83-121 | Điều kiện ra đời, đặc trưng; tính tất yếu và đặc điểm thời kỳ quá độ; quá độ ở Việt Nam; đặc trưng và phương hướng xây dựng | Bảng so sánh; thẻ “dễ nhầm”; giải thích việc bỏ qua chế độ tư bản chủ nghĩa |
| 4. Dân chủ xã hội chủ nghĩa và Nhà nước xã hội chủ nghĩa | 122-161 | Khái niệm, quá trình phát triển, bản chất dân chủ; nhà nước và chức năng; quan hệ dân chủ - nhà nước; Việt Nam và nhà nước pháp quyền | Phân loại dân chủ trực tiếp / gián tiếp; sơ đồ quan hệ; tình huống tham gia đóng góp ý kiến |
| 5. Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội | 162-191 | Khái niệm, vị trí và quy luật biến đổi cơ cấu; tính tất yếu của liên minh; nội dung liên minh và phương hướng ở Việt Nam | Chuỗi giá trị nông sản với công nhân, nông dân, trí thức; sơ đồ quan hệ lợi ích |
| 6. Vấn đề dân tộc và tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội | 192-235 | Hai nghĩa của dân tộc; hai xu hướng phát triển; cương lĩnh dân tộc; Việt Nam; bản chất, nguồn gốc, tính chất tôn giáo; nguyên tắc giải quyết; quan hệ dân tộc - tôn giáo | Bảng phân biệt thuật ngữ; tình huống tôn trọng khác biệt; bài phân tích có giải thích |
| 7. Vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội | 236-266 | Khái niệm, vị trí, chức năng; cơ sở xây dựng; hôn nhân tiến bộ; biến đổi gia đình và phương hướng ở Việt Nam | Tình huống phân chia việc nhà, giáo dục con, quan hệ thế hệ; sơ đồ cá nhân - gia đình - xã hội |

Trang PDF 267-269 là tài liệu tham khảo; 270-272 là mục lục; 273 là thông tin xuất bản. Những phần này đưa vào trang nguồn tài liệu, không tạo thành bài học mới.

## 3. Cấu trúc một bài học

Mỗi bài nên đi theo một khuôn thống nhất:

1. **Mục tiêu:** người học cần hiểu và vận dụng điều gì.
2. **Tình huống mở đầu:** câu chuyện ngắn gắn đúng chủ đề; ghi rõ nếu là tình huống giả định.
3. **Câu hỏi dẫn nhập:** yêu cầu quan sát hoặc đưa ra lập luận.
4. **Kiến thức cốt lõi:** định nghĩa, luận điểm và điều kiện áp dụng; chia thành các đoạn ngắn.
5. **Sơ đồ hoặc bảng:** thể hiện quan hệ giữa các khái niệm.
6. **Vận dụng:** phân tích tình huống bằng kiến thức vừa học.
7. **Điểm dễ nhầm:** chỉ rõ cách hiểu chưa đủ hoặc sai.
8. **Kiểm tra:** trắc nghiệm có giải thích và một câu tự luận ngắn.
9. **Nguồn:** chương, mục, trang in đã kiểm tra và trang PDF; nút mở đúng trang.

Ví dụ bài của chương 2: “Tự động hóa làm thay đổi lao động như thế nào?”. Dẫn nhập bằng một nhà máy giả định có công nhân vận hành robot và kỹ thuật viên. Sau đó phân tích phương thức lao động, quan hệ với tư liệu sản xuất, sự biến đổi của công nhân hiện đại. Chỉ kết luận khi có đủ dữ kiện; không gán giai cấp dựa riêng vào chức danh hay mức lương.

## 4. Các điểm cần giữ đúng khi biên soạn

- Chương 1: phân biệt nghĩa rộng và nghĩa hẹp của Chủ nghĩa xã hội khoa học. Môn học trong giáo trình nghiên cứu theo nghĩa hẹp.
- Chương 2: sứ mệnh lịch sử có ba nội dung; không chỉ nói về lao động sản xuất hoặc kỹ năng nghề nghiệp. Phân biệt điều kiện khách quan với các nhân tố chủ quan, đặc biệt vai trò Đảng Cộng sản.
- Chương 3: “bỏ qua chế độ tư bản chủ nghĩa” không có nghĩa bỏ qua mọi thành tựu khoa học, công nghệ và quản lý của nhân loại. Giữ đầy đủ điều kiện và cách giải thích của giáo trình.
- Chương 4: trình bày dân chủ trong quan hệ với nhà nước, kinh tế và đời sống xã hội. Một cuộc biểu quyết trong lớp chỉ là tình huống dẫn nhập, không mô tả đầy đủ nền dân chủ xã hội chủ nghĩa.
- Chương 5: liên minh công nhân - nông dân - trí thức cần được giải thích cả về cơ sở và nội dung kinh tế, chính trị, văn hóa - xã hội. Ví dụ chuỗi sản xuất không thay thế toàn bộ lý luận.
- Chương 6: phân biệt dân tộc theo nghĩa quốc gia và tộc người; phân biệt tôn giáo, tín ngưỡng và mê tín dị đoan. Trình bày đầy đủ nguyên tắc tôn trọng tự do tín ngưỡng và không tín ngưỡng, cùng các nguyên tắc khác của giáo trình.
- Chương 7: vượt ra ngoài các mẹo giao tiếp cá nhân; gắn chức năng, cơ sở xây dựng và biến đổi gia đình với điều kiện xã hội.
- Các số liệu, chính sách và mô tả “hiện nay” trong sách phải gắn nhãn nguồn năm 2021. Nếu bổ sung thực tiễn mới, kiểm tra nguồn mới và ghi ngày cập nhật; không trình bày dữ liệu cũ như dữ liệu hiện tại.
- Tách rõ nội dung giáo trình, phần diễn giải của website và ví dụ minh họa. Trích dẫn nguyên văn phải được kiểm tra ảnh gốc.

## 5. Sửa những phần nào trong dự án

| File hoặc nhóm file hiện tại | Việc cần làm |
| --- | --- |
| `home.html` | Đổi tiêu đề và thông điệp; thay 5 module bằng 7 chương; thêm đường vào theo tình huống; đồng bộ mô tả với bài học |
| `Overview.html` | Tạo bản đồ 7 chương; hiển thị mục tiêu, bài học và trạng thái học |
| `header.html`, `footer.html` | Đồng bộ tên môn, menu, liên kết và nguồn tài liệu |
| `module1.html` đến `module5.html` | Viết lại nội dung theo môn mới; bổ sung chương 6 và 7; dùng cùng một khuôn bài |
| `quiz1.html` đến `quiz5.html`, `practice.html` | Viết lại câu hỏi; bổ sung chương 6 và 7; thêm câu tự luận và giải thích đáp án |
| `js/quiz-data.js` | Thay ngân hàng câu hỏi Triết học trong game; phân loại theo chương, bài, mức độ và nguồn |
| `games.html`, các trang game và dữ liệu tình huống | Chọn lại hoạt động theo mục tiêu môn học; ưu tiên ghép khái niệm, phân loại, phân tích tình huống |
| `articles.html`, `articles/` | Chuyển trọng tâm bài viết sang lao động, quan hệ xã hội, dân chủ, dân tộc - tôn giáo và gia đình; tránh để nội dung tâm lý cá nhân chi phối môn học |
| `js/search-data-global.js`, dữ liệu tìm kiếm trong `header.html` | Cập nhật chương, thuật ngữ, bài viết và đường dẫn; giảm dữ liệu lặp để tránh lệch nội dung |
| `ai-assistants.html`, `js/ai-assistants.js` | Đổi tên trợ lý, câu hỏi gợi ý và lịch sử theo môn mới; kiểm tra endpoint API |
| `server.js`, `assets/docs/` | Thay nguồn PDF Triết học bằng đúng giáo trình mới; cập nhật vai trò và yêu cầu trả lời của AI |
| `README.md` | Thay mẫu README GitLab bằng hướng dẫn chạy, biên soạn nội dung và triển khai thực tế |

Hiện trang chủ mô tả module 2 bằng Descartes, Hume và Phật giáo, trong khi `module2.html` trình bày ba quy luật biện chứng. Cần sửa cơ chế đồng bộ nội dung này khi chuyển môn.

## 6. Làm nội dung dễ chỉnh sửa

Giữ HTML/JavaScript hiện tại cho lần chuyển đổi đầu tiên. Tách dữ liệu khỏi bố cục để không phải sửa nhiều trang mỗi khi đổi tên bài, câu hỏi hoặc nguồn.

Cấu trúc đề xuất:

```text
data/
  course.json
  chapters.json
  lessons/
  questions/
  cases.json
  glossary.json
  sources.json
js/
  lesson-renderer.js
  progress.js
  search-init.js
```

Mỗi bài có ID ổn định, chương, tiêu đề, mục tiêu, nội dung, tình huống và tham chiếu nguồn. Mỗi câu hỏi có ID, bài liên quan, mức độ, lựa chọn, đáp án, giải thích và nguồn. Bản đồ chương, tìm kiếm và thanh điều hướng lấy từ cùng dữ liệu.

Giai đoạn đầu, người biên soạn sửa các file dữ liệu có hướng dẫn rõ ràng. Nếu yêu cầu là chỉnh trực tiếp trên trình duyệt mà không mở mã nguồn, cần một trang quản trị hoặc CMS; các file HTML hiện tại chưa cung cấp luồng biên tập đó. Có thể bổ sung sau khi chốt cấu trúc dữ liệu và quyền biên tập.

## 7. Trợ lý AI và triển khai

`server.js` hiện đọc PDF Triết học Mác - Lênin và dùng vai trò giảng viên Triết học. Việc đổi giao diện sẽ không tự thay nguồn của AI. Cần thay cả PDF, cấu hình `PDF_URL` nếu có, prompt và bộ câu hỏi kiểm tra.

Bản đầu có thể tiếp tục sử dụng cách gửi PDF đang có sau khi kiểm tra chất lượng và chi phí. Hướng cải thiện là lấy văn bản OCR đã sửa, chia theo chương/mục, lưu vị trí trang rồi truy xuất các đoạn liên quan khi hỏi. Câu trả lời hiển thị nguồn do hệ thống quản lý; không tin số trang do mô hình tự đoán. Khi không tìm thấy căn cứ, trợ lý nói rõ giới hạn nguồn.

Kiểm tra riêng tình huống vượt giới hạn dịch vụ, PDF tải lỗi và câu hỏi ngoài nội dung giáo trình. API key giữ ở phía máy chủ.

`js/ai-assistants.js` hiện chọn API theo cổng đang mở. Khi triển khai nên ưu tiên endpoint cùng nguồn `/api/ask-gemini` và xác nhận cấu hình Vercel hỗ trợ backend. Vercel có tài liệu chính thức hỗ trợ Express, kể cả mẫu `app.listen`; không kết luận backend lỗi chỉ vì thấy `app.listen` trong mã.

Nguồn kỹ thuật: https://vercel.com/docs/frameworks/backend/express

`server.js` hiện dùng `express.static('.')`. Khi sắp xếp lại dự án nên phục vụ một thư mục công khai riêng để tránh phục vụ các file mã nguồn và tài liệu nội bộ cùng với giao diện. Đây là nhận xét từ mã nguồn, chưa phải xác nhận mức độ công khai trên bản Vercel.

Nguồn kỹ thuật: https://expressjs.com/en/starter/static-files/

## 8. Thứ tự triển khai và điều kiện hoàn thành

1. **Chốt nội dung:** 7 chương, bài học con, thuật ngữ, tình huống và tham chiếu nguồn. Hoàn thành khi toàn bộ các mục chính của giáo trình có chỗ trong bản đồ bài học.
2. **Làm một bài mẫu hoàn chỉnh:** đề xuất bài công nhân và tự động hóa ở chương 2; gồm nguồn, tình huống và bài kiểm tra. Hoàn thành khi cách diễn giải dễ hiểu và các luận điểm khớp giáo trình.
3. **Đổi trang chủ, bản đồ và điều hướng:** lấy chương từ dữ liệu chung; kiểm tra đường dẫn và hiển thị điện thoại.
4. **Triển khai đủ bài và luyện tập:** thay nội dung cũ; kiểm tra mỗi câu có đáp án, giải thích và nguồn. Tự luận dùng tiêu chí chấm, không chỉ một câu trả lời mẫu cứng.
5. **Đổi nguồn AI và tìm kiếm:** thử câu hỏi đại diện cả 7 chương, kiểm tra nguồn trích dẫn, câu hỏi ngoài phạm vi và thông báo lỗi.
6. **Bổ sung tiến độ, game và biên tập:** tiến độ học có thể lưu cục bộ trong bản đầu; ghi rõ giới hạn đồng bộ giữa thiết bị. Chỉ thêm game khi đo được mục tiêu kiến thức tương ứng.
7. **Xem bản preview và phát hành:** kiểm tra tất cả liên kết, trang nguồn, đọc trên điện thoại và API trên môi trường triển khai. Mỗi lần biên soạn sau đó dùng cùng quy trình đối chiếu nguồn.

Ưu tiên trước mắt: cấu trúc 7 chương, một bài mẫu tốt, dữ liệu có thể chỉnh sửa và nguồn AI đúng môn. Đây là nền tảng để mở rộng nội dung mà không tạo thêm các bản mô tả và câu hỏi mâu thuẫn nhau.
