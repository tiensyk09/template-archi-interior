'use client';
import React from 'react';
import Link from 'next/link';
import { IconMedal, IconUsers, IconBadgeCheck, IconClock, IconShieldCheck } from '@/components/icons';

const BRONZE = '#b08d57';
const DARK = '#1c1c1c';

export default function WhyChooseUs() {
  const reasons = [
    { icon: <IconMedal size={32} />, title: 'KINH NGHIỆM', desc: '10+ năm kinh nghiệm trong lĩnh vực nội thất, xây dựng & kiến trúc' },
    { icon: <IconUsers size={32} />, title: 'ĐỘI NGŨ CHUYÊN NGHIỆP', desc: 'Kiến trúc sư, kỹ sư và đội ngũ thi công lành nghề, sáng tạo và tận tâm' },
    { icon: <IconBadgeCheck size={32} />, title: 'CHẤT LƯỢNG CAM KẾT', desc: 'Vật liệu chất lượng cao, thi công đúng kỹ thuật, bền vững với thời gian' },
    { icon: <IconClock size={32} />, title: 'TIẾN ĐỘ ĐẢM BẢO', desc: 'Quy trình làm việc rõ ràng, khoa học, đảm bảo tiến độ nhanh chóng' },
    { icon: <IconShieldCheck size={32} />, title: 'BẢO HÀNH DÀI HẠN', desc: 'Chế độ bảo hành uy tín, hỗ trợ khách hàng nhanh chóng' },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: DARK }}>
      <div className="container mx-auto px-4">
        <div className="ar-why-grid" style={{ display: 'grid', gridTemplateColumns: '1.25fr repeat(5, 1fr)', gap: 22, alignItems: 'start' }}>

          {/* Left intro */}
          <div style={{ paddingRight: 10 }}>
            <h2 style={{ fontSize: 26, fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.3, letterSpacing: '0.02em', marginBottom: 14 }}>
              <span style={{ color: '#fff' }}>VÌ SAO CHỌN</span><br />
              <span style={{ color: BRONZE }}>CHÚNG TÔI?</span>
            </h2>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.6)', fontWeight: 500, lineHeight: 1.7, marginBottom: 22 }}>
              Chúng tôi cam kết mang đến giải pháp tối ưu với chất lượng vượt trội và dịch vụ tận tâm.
            </p>
            <Link
              href="/about"
              style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '11px 20px', borderRadius: 3, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BRONZE; e.currentTarget.style.borderColor = BRONZE; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
            >
              TÌM HIỂU THÊM →
            </Link>
          </div>

          {/* 5 reasons */}
          {reasons.map((r, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '10px 4px', borderLeft: '1px solid rgba(255,255,255,0.08)' }} className="ar-why-item">
              <div style={{ width: 62, height: 62, margin: '0 auto 14px', border: `1.5px solid ${BRONZE}`, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRONZE }}>
                {r.icon}
              </div>
              <h3 style={{ fontSize: 11.5, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 9, lineHeight: 1.45 }}>{r.title}</h3>
              <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', fontWeight: 500, lineHeight: 1.65 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ar-why-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          .ar-why-grid > div:first-child { grid-column: span 3; text-align: center; padding-right: 0 !important; margin-bottom: 10px; }
          .ar-why-item { border-left: none !important; }
        }
        @media (max-width: 640px) {
          .ar-why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .ar-why-grid > div:first-child { grid-column: span 2; }
        }
      `}</style>
    </section>
  );
}
