'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IconBuilding, IconSofa, IconCrane, IconWrenchHammer, IconHouseRepair } from '@/components/icons';

const BRONZE = '#b08d57';
const DARK = '#1c1c1c';

export default function HeroBanner() {
  const slides = [
    {
      line1: 'KIẾN TẠO',
      line2: 'KHÔNG GIAN',
      line3: 'NÂNG TẦM CUỘC SỐNG',
      desc: <>Chuyên thiết kế, thi công nội thất, xây dựng và kiến trúc<br />Giải pháp toàn diện – Chất lượng bền vững – Thẩm mỹ vượt thời gian</>,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80',
    },
    {
      line1: 'THIẾT KẾ',
      line2: 'NỘI THẤT',
      line3: 'ĐẲNG CẤP KHÁC BIỆT',
      desc: <>Không gian sống sang trọng, tiện nghi, đậm dấu ấn cá nhân<br />Đội ngũ kiến trúc sư giàu kinh nghiệm, tận tâm</>,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80',
    },
    {
      line1: 'XÂY DỰNG',
      line2: 'TRỌN GÓI',
      line3: 'CHÌA KHÓA TRAO TAY',
      desc: <>Thi công đúng kỹ thuật, đúng tiến độ, chi phí minh bạch<br />Bảo hành dài hạn, đồng hành trọn vòng đời công trình</>,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const services = [
    { icon: <IconBuilding size={38} />, title: 'THIẾT KẾ KIẾN TRÚC', desc: 'Thiết kế kiến trúc hiện đại, tối ưu công năng, thẩm mỹ', link: '/products?category=thiet-ke-kien-truc' },
    { icon: <IconSofa size={38} />, title: 'THIẾT KẾ NỘI THẤT', desc: 'Không gian nội thất sang trọng, tiện nghi, cá nhân hóa', link: '/products?category=thiet-ke-noi-that' },
    { icon: <IconCrane size={38} />, title: 'XÂY DỰNG PHẦN THÔ', desc: 'Thi công đúng kỹ thuật, đảm bảo chất lượng', link: '/products?category=xay-dung-phan-tho' },
    { icon: <IconWrenchHammer size={38} />, title: 'THI CÔNG NỘI THẤT', desc: 'Sản xuất & thi công nội thất trọn gói, tỉ mỉ đến từng chi tiết', link: '/products?category=thi-cong-noi-that' },
    { icon: <IconHouseRepair size={38} />, title: 'CẢI TẠO & SỬA CHỮA', desc: 'Cải tạo không gian sống, nâng cấp tiện nghi', link: '/products?category=cai-tao-sua-chua' },
  ];

  return (
    <div className="w-full">
      {/* HERO SLIDER — ảnh full, overlay tối */}
      <div style={{ position: 'relative', minHeight: 560, overflow: 'hidden', backgroundColor: DARK }}>
        <img
          key={`img-${current}`}
          src={slide.image}
          alt={slide.line3}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: 'arFadeIn 0.8s ease-out' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,9,8,0.82) 0%, rgba(10,9,8,0.45) 45%, rgba(10,9,8,0.15) 100%)' }} />

        <div className="ar-hero-inner" style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '90px 64px 110px', minHeight: 560, display: 'flex', alignItems: 'center', zIndex: 4 }}>
          <div key={current} style={{ maxWidth: 620 }}>
            <h1 className="ar-hero-title" style={{ fontSize: 52, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.16, marginBottom: 22, color: '#fff', animation: 'arSlideUp 0.5s ease-out' }}>
              {slide.line1}<br />
              <span style={{ color: BRONZE }}>{slide.line2}</span><br />
              {slide.line3}
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: 500, lineHeight: 1.75, marginBottom: 34, animation: 'arSlideUp 0.6s ease-out' }}>
              {slide.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', animation: 'arSlideUp 0.7s ease-out' }}>
              <Link
                href="/destinations"
                style={{ backgroundColor: BRONZE, color: '#fff', fontWeight: 800, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 30px', borderRadius: 3, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = DARK; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = BRONZE; e.currentTarget.style.color = '#fff'; }}
              >
                XEM DỰ ÁN <span style={{ fontSize: 15 }}>→</span>
              </Link>
              <Link
                href="/contact"
                style={{ border: '1.5px solid rgba(255,255,255,0.55)', color: '#fff', fontWeight: 800, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '15px 30px', borderRadius: 3, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'all 0.2s', backgroundColor: 'rgba(255,255,255,0.02)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = DARK; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'; e.currentTarget.style.color = '#fff'; }}
              >
                NHẬN TƯ VẤN MIỄN PHÍ <span style={{ fontSize: 15 }}>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button onClick={prev} aria-label="Slide trước" className="ar-hero-arrow" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', width: 42, height: 42, borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)', backgroundColor: 'rgba(0,0,0,0.25)', color: '#fff', fontSize: 18, cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <button onClick={next} aria-label="Slide sau" className="ar-hero-arrow" style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', width: 42, height: 42, borderRadius: 999, border: '1px solid rgba(255,255,255,0.35)', backgroundColor: 'rgba(0,0,0,0.25)', color: '#fff', fontSize: 18, cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 9, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 999, border: 'none', backgroundColor: i === current ? BRONZE : 'rgba(255,255,255,0.45)', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }}
            />
          ))}
        </div>
      </div>

      {/* SERVICES STRIP — 5 dịch vụ */}
      <div style={{ backgroundColor: '#fff', padding: '34px 16px', borderBottom: '1px solid #f0ece5' }}>
        <div className="ar-services-grid" style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 16 }}>
          {services.map((svc, idx) => (
            <Link
              key={idx}
              href={svc.link}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '28px 18px', border: '1px solid #eee9e1', backgroundColor: '#fff', textDecoration: 'none', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 16px 34px rgba(33,29,24,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#dcd2c2'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#eee9e1'; }}
            >
              <span style={{ color: '#3a352e', marginBottom: 16 }}>{svc.icon}</span>
              <h3 style={{ fontSize: 12.5, fontWeight: 800, color: '#211d18', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 9, lineHeight: 1.4 }}>{svc.title}</h3>
              <p style={{ fontSize: 11.5, color: '#8a8378', fontWeight: 500, lineHeight: 1.6, marginBottom: 16 }}>{svc.desc}</p>
              <span style={{ color: BRONZE, fontSize: 16, marginTop: 'auto' }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes arSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes arFadeIn {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }
        @media (max-width: 1024px) {
          .ar-services-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 768px) {
          .ar-hero-inner { padding: 60px 22px 90px !important; }
          .ar-hero-title { font-size: 34px !important; }
          .ar-hero-arrow { display: none !important; }
          .ar-services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </div>
  );
}
