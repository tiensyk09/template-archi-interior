'use client';
import React from 'react';
import { IconStar } from '@/components/icons';

const BRONZE = '#b08d57';
const DARK = '#1c1c1c';

export default function Testimonials() {
  const testimonials = [
    {
      quote: 'Đội ngũ làm việc rất chuyên nghiệp, thiết kế đẹp, thi công đúng tiến độ. Rất hài lòng!',
      name: 'Anh Minh Tuấn',
      role: 'Biệt thự - Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote: 'Không gian nội thất được thiết kế tinh tế, tối ưu công năng. Cảm ơn ARCHI rất nhiều!',
      name: 'Chị Thu Hương',
      role: 'Căn hộ - Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote: 'Quy trình rõ ràng, minh bạch, chất lượng công trình vượt mong đợi.',
      name: 'Anh Quốc Bảo',
      role: 'Nhà phố - TP.HCM',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: DARK }}>
      <div className="container mx-auto px-4" style={{ position: 'relative' }}>
        <div className="ar-testi-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 34, alignItems: 'center' }}>

          {/* Left intro */}
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', textTransform: 'uppercase', lineHeight: 1.35, letterSpacing: '0.02em', marginBottom: 14 }}>
              KHÁCH HÀNG<br />NÓI GÌ VỀ CHÚNG TÔI?
            </h2>
            <div style={{ width: 52, height: 3, backgroundColor: BRONZE, marginBottom: 16 }} />
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', fontWeight: 500, lineHeight: 1.75 }}>
              Sự hài lòng của khách hàng là động lực để chúng tôi không ngừng nâng cao chất lượng dịch vụ.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="ar-testi-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 18 }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: '#fff', borderRadius: 4, padding: '24px 22px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 28px rgba(0,0,0,0.25)' }}
              >
                <div style={{ display: 'flex', gap: 4, color: '#d4a24e', marginBottom: 14 }}>
                  {[...Array(5)].map((_, i) => <IconStar key={i} size={14} />)}
                </div>
                <p style={{ fontSize: 12.5, color: '#4b4640', lineHeight: 1.75, fontWeight: 500, fontStyle: 'italic', flex: 1, marginBottom: 18 }}>
                  “{t.quote}”
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, borderTop: '1px solid #f0ece5', paddingTop: 13 }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: 40, height: 40, borderRadius: 999, objectFit: 'cover', border: `2px solid ${BRONZE}` }}
                  />
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: '#211d18' }}>{t.name}</div>
                    <div style={{ fontSize: 10.5, color: '#8a8378', fontWeight: 500, marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows trang trí */}
        <div className="ar-testi-arrow" style={{ position: 'absolute', left: -8, top: '52%', width: 36, height: 36, borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</div>
        <div className="ar-testi-arrow" style={{ position: 'absolute', right: -8, top: '52%', width: 36, height: 36, borderRadius: 999, border: '1px solid rgba(255,255,255,0.25)', color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ar-testi-grid { grid-template-columns: 1fr !important; }
          .ar-testi-arrow { display: none !important; }
        }
        @media (max-width: 768px) {
          .ar-testi-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
