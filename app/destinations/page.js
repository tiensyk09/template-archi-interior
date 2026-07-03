'use client';
import React from 'react';
import Link from 'next/link';

const BRONZE = '#b08d57';
const DARK = '#1c1c1c';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: 'Biệt Thự Hiện Đại Vinhomes Riverside',
      location: 'Vinhomes Riverside, Long Biên, Hà Nội',
      scope: 'Thiết kế kiến trúc + Nội thất trọn gói · 350m²',
      description: 'Biệt thự 3 tầng phong cách hiện đại tối giản với không gian mở, tận dụng tối đa ánh sáng tự nhiên. Nội thất gỗ óc chó kết hợp đá marble cao cấp, hệ smarthome điều khiển toàn bộ chiếu sáng và rèm tự động.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      badge: 'Biệt Thự'
    },
    {
      id: 2,
      title: 'Căn Hộ Cao Cấp Sunshine City',
      location: 'Sunshine City, Bắc Từ Liêm, Hà Nội',
      scope: 'Thiết kế + Thi công nội thất · 120m²',
      description: 'Căn hộ 3 phòng ngủ phong cách Modern Luxury, tông màu trung tính ấm áp. Toàn bộ nội thất sản xuất tại xưởng ARCHI với gỗ công nghiệp An Cường phủ Melamine, phụ kiện Hafele chính hãng.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      badge: 'Căn Hộ'
    },
    {
      id: 3,
      title: 'Nhà Phố 3 Tầng Thủ Đức',
      location: 'TP. Thủ Đức, TP. Hồ Chí Minh',
      scope: 'Xây dựng trọn gói chìa khóa trao tay · 240m² sàn',
      description: 'Nhà phố 3 tầng 1 tum xây mới hoàn toàn trên nền đất 5x16m. ARCHI đảm nhận từ xin phép xây dựng, thi công phần thô đến hoàn thiện nội thất, bàn giao sau 7 tháng đúng cam kết tiến độ.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      badge: 'Nhà Phố'
    },
    {
      id: 4,
      title: 'Văn Phòng Hiện Đại Cầu Giấy',
      location: 'Cầu Giấy, Hà Nội',
      scope: 'Thiết kế + Thi công nội thất văn phòng · 450m²',
      description: 'Văn phòng công nghệ 450m² cho 80 nhân sự theo phong cách Industrial kết hợp Biophilic — trần thô, hệ cây xanh trong nhà, khu pantry và phòng họp kính cách âm hiện đại.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
      badge: 'Văn Phòng'
    }
  ];

  return (
    <div style={{ backgroundColor: '#faf8f4', minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '13px', color: '#8a8378' }}>
          <Link href="/" style={{ color: '#4b4640', textDecoration: 'none' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: BRONZE, fontWeight: 600 }}>Dự án</span>
        </div>

        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#211d18', marginBottom: '12px', letterSpacing: '0.01em', textTransform: 'uppercase' }}>
            Dự Án Tiêu Biểu
          </h1>
          <div style={{ width: 56, height: 3, backgroundColor: BRONZE, margin: '0 auto 16px' }} />
          <p style={{ color: '#6b655c', fontSize: '15px', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Mỗi công trình là một câu chuyện. ARCHI tự hào đồng hành cùng hàng trăm khách hàng
            kiến tạo không gian sống và làm việc đẳng cấp trên khắp cả nước.
          </p>
        </div>

        {/* Projects List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {projects.map((p, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  flexDirection: isEven ? 'row' : 'row-reverse',
                  gap: '40px',
                  alignItems: 'center',
                  background: '#ffffff',
                  borderRadius: '4px',
                  padding: '32px',
                  border: '1px solid #eee9e1',
                  boxShadow: '0 4px 20px rgba(33,29,24,0.04)',
                  flexWrap: 'wrap'
                }}
                className="dest-card"
              >
                {/* Image */}
                <div style={{ flex: '1 1 450px', height: '320px', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'; }}
                  />
                  <span style={{ position: 'absolute', top: '16px', left: '16px', background: DARK, color: BRONZE, padding: '6px 14px', borderRadius: '2px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {p.badge}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ fontSize: '13px', color: BRONZE, fontWeight: 700 }}>
                      📍 {p.location}
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#211d18', margin: 0 }}>
                      {p.title}
                    </h2>
                    <span style={{ fontSize: '13px', color: '#8f6f42', fontWeight: 600 }}>
                      📐 {p.scope}
                    </span>
                  </div>
                  <p style={{ fontSize: '14.5px', color: '#6b655c', lineHeight: 1.7, margin: 0 }}>
                    {p.description}
                  </p>
                  <div>
                    <Link
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#f4efe7',
                        color: BRONZE,
                        padding: '11px 22px',
                        borderRadius: '3px',
                        fontSize: '12px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = BRONZE; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#f4efe7'; e.currentTarget.style.color = BRONZE; }}
                    >
                      Tư vấn dự án tương tự →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{
          marginTop: '60px',
          background: `linear-gradient(135deg, #33302a 0%, ${DARK} 100%)`,
          borderRadius: '4px',
          padding: '48px',
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '140px', opacity: 0.06, pointerEvents: 'none' }}>
            🏠
          </div>
          <h3 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Bạn Có Dự Án Cần Triển Khai?</h3>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            Đội ngũ kiến trúc sư ARCHI sẵn sàng khảo sát và tư vấn miễn phí.
            Gọi ngay hotline hoặc để lại thông tin để được báo giá chi tiết.
          </p>
          <a
            href="tel:0988123456"
            style={{
              display: 'inline-block',
              background: BRONZE,
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: '3px',
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '0.06em',
              textDecoration: 'none'
            }}
          >
            HOTLINE: 0988 123 456
          </a>
        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 992px) {
          .dest-card {
            flex-direction: column !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
