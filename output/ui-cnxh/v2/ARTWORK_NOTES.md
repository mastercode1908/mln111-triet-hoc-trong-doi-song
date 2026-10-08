# Minh họa phiên bản 2

Các PNG gốc được tạo bằng công cụ imagegen tích hợp, tham chiếu `output/ui-cnxh/home.png`. Không dùng CLI/API bên ngoài. WebP dành cho website được lưu tại `assets/illustrations/generated/`; kích thước và loại ảnh có trong `data/illustrations.json`.

- `cutouts.png`: 8 minh họa riêng biệt trên nền alpha trong suốt, bố trí 4 cột × 2 hàng: sách mở, công nhân và robot, thành phố và tàu, công sở, liên minh công nhân–nông dân–trí thức, giao lưu dân tộc–tôn giáo, gia đình, chồng sách.
- `hero.png`: sinh viên, người lao động, gia đình và thành phố Việt Nam; loại bỏ chữ, nhãn và khung chữ nhật; nền alpha trong suốt.
- `scenes.png`: 8 cảnh phủ kín, bố trí 2 cột × 4 hàng trên canvas dọc: thư viện, nhà máy, đô thị, thảo luận khu dân cư, hợp tác nông sản, nhóm sinh viên đa dạng, chia sẻ việc nhà, sách và cây non.

Yêu cầu chung trong prompt: giữ phong cách minh họa watercolor xanh của mẫu; nét và khuôn mặt rõ; chủ thể đầy đủ, không cắt đầu người; không chữ, không giao diện hay viền thẻ. Cảnh rộng lấp đầy ô; minh họa đầu chương dùng bóng dáng tự nhiên trên nền trong suốt.

Chạy `python scripts/prepare-illustrations.py` để cắt theo ô, cắt sát khoảng trống alpha, tăng nét nhẹ và xuất WebP. Giữ nguyên alpha khi tăng nét, không phóng lớn các ảnh cắt nhỏ cũ. Script cần Pillow.
