'use client';
import React from 'react';
import { IconHeadset, IconChatIdea, IconContract, IconRulerPencil, IconHammer, IconKeyCheck, SectionOrnament } from '@/components/icons';

const BRONZE = '#b08d57';
const DARK = '#1c1c1c';

export default function ProcessSection() {
  const steps = [
    { icon: <IconHeadset size={22} />, title: 'TIẾP NHẬN YÊU CẦU', desc: <>Lắng nghe nhu cầu<br />và khảo sát hiện trạng</> },
    { icon: <IconChatIdea size={22} />, title: 'TƯ VẤN & ĐỀ XUẤT', desc: <>Đề xuất giải pháp thiết kế<br />phù hợp</> },
    { icon: <IconContract size={22} />, title: 'KÝ KẾT HỢP ĐỒNG', desc: <>Thống nhất phương án<br />và ký kết hợp đồng</> },
    { icon: <IconRulerPencil size={22} />, title: 'THIẾT KẾ', desc: <>Triển khai bản vẽ 2D, 3D<br />chi tiết</> },
    { icon: <IconHammer size={22} />, title: 'THI CÔNG', desc: <>Thi công đúng tiến độ,<br /><strong>đảm bảo chất lượng</strong></> },
    { icon: <IconKeyCheck size={22} />, title: 'NGHIỆM THU & BÀN GIAO', desc: <>Nghiệm thu, bàn giao và<br />bảo hành công trình</> },
  ];

  return (
    <section className="py-12" style={{ backgroundColor: '#fff' }}>
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 style={{ color: '#211d18', fontSize: 27, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            QUY TRÌNH LÀM VIỆC
          </h2>
          <SectionOrnament color={BRONZE} />
        </div>

        {/* Steps timeline */}
        <div style={{ position: 'relative' }}>
          {/* Đường nối ngang */}
          <div className="ar-process-line" style={{ position: 'absolute', top: 26, left: '8%', right: '8%', borderTop: '1.5px dashed #d8cdbb', zIndex: 1 }} />

          <div className="ar-process-grid" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 12, zIndex: 2 }}>
            {steps.map((s, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, margin: '0 auto 16px', backgroundColor: DARK, border: `2.5px solid ${BRONZE}`, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRONZE, boxShadow: '0 0 0 6px #fff' }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 11.5, fontWeight: 800, color: '#211d18', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, lineHeight: 1.45 }}>{s.title}</h3>
                <p style={{ fontSize: 11, color: '#8a8378', fontWeight: 500, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ar-process-grid { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; row-gap: 28px; }
          .ar-process-line { display: none !important; }
        }
        @media (max-width: 640px) {
          .ar-process-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
      `}</style>
    </section>
  );
}
