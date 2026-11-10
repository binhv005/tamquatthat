/**
 * CẤU HÌNH THÔNG TIN DOANH NGHIỆP
 * ------------------------------------------------------------
 * Mọi thông tin liên hệ, dịch vụ và bảng giá được tập trung tại đây.
 * Khi khách hàng chốt hotline chính thức, chỉ cần sửa `contact.hotline`.
 * Không tự ý gộp hai số điện thoại.
 */

export const contact = {
  brand: 'Tẩm Quất Thật',
  person: 'Hoàng',
  // Hotline hiển thị chính
  hotline: { display: '0988 922 592', tel: '0988922592' },
  // Hotline đặt lịch bổ sung (chị Ngọc) – chờ khách hàng xác nhận
  hotlineAlt: { display: '0989 588 030', tel: '0989588030', name: 'chị Ngọc' },
  // Zalo dùng số hotline chính – cần xác nhận lại với khách hàng
  zalo: 'https://zalo.me/0988922592',
  facebook: 'https://www.facebook.com/share/19uAsoRLcg/',
  mapsDirection: 'https://maps.app.goo.gl/pJEQ6PAT61mYHY15A',
  mapsAlt: 'https://maps.app.goo.gl/G7joMqN4GbraLkN69',
  // Bản đồ nhúng (không cần API key). Thay bằng link embed chính thức khi đã xác nhận.
  mapsEmbed:
    'https://www.google.com/maps?q=711+H%E1%BB%93ng+H%C3%A0,+Ho%C3%A0n+Ki%E1%BA%BFm,+H%C3%A0+N%E1%BB%99i&z=16&output=embed',
  address: '711 Hồng Hà, Hà Nội',
  openHours: '07:30 – 12:00',
  domain: 'tamquatthat.com',
}

/** Ảnh thực tế – tên file trong /public/images, có 2 kích thước 640 & 1200 */
export const img = (name) => ({
  src: `/images/${name}-1200.webp`,
  srcSet: `/images/${name}-640.webp 640w, /images/${name}-1200.webp 1200w`,
})

/** Giá – không tự ý thêm dịch vụ, thời lượng hoặc giá */
export const prices = [
  { service: 'massage', duration: 60, unit: 'min', price: 150000 },
  { service: 'massage', duration: 90, unit: 'min', price: 225000 },
  { service: 'massage', duration: 120, unit: 'min', price: 300000 },
  { service: 'cupping', duration: 1, unit: 'turn', price: 40000 },
  { service: 'home', duration: 60, unit: 'min', price: 200000 },
]

export const formatVND = (n) => n.toLocaleString('vi-VN').replace(/,/g, '.') + 'đ'

/** Khung giờ tại cơ sở (07:30 – 12:00) */
export const storeSlots = ['07:30 – 09:00', '09:00 – 10:30', '10:30 – 12:00']
