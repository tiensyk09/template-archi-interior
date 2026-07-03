'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { LogoArchi, IconLocation, IconMail, IconGlobe, IconPhoneFilled, IconFacebook, IconInstagram, IconPinterest, IconYoutube } from '@/components/icons';
import { SocialIcon, buildSocialLinks } from '@/components/SocialLinks';

const BRONZE = '#b08d57';
const DARK = '#141414';

export default function Footer() {
  const [socialLinks, setSocialLinks] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.settings) setSocialLinks(buildSocialLinks(d.settings)); })
      .catch(() => {});
  }, []);
  const [email, setEmail] = useState('');
  const [subMsg, setSubMsg] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setSubMsg({ ok: false, text: 'Email không hợp lệ' });
      return;
    }
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubMsg({ ok: true, text: 'Đăng ký nhận tin thành công!' });
        setEmail('');
      } else {
        setSubMsg({ ok: false, text: 'Đăng ký thất bại, thử lại sau' });
      }
    } catch {
      setSubMsg({ ok: false, text: 'Lỗi kết nối, thử lại sau' });
    }
    setTimeout(() => setSubMsg(null), 4000);
  };

  const serviceLinks = [
    { label: 'Thiết kế kiến trúc', href: '/products?category=thiet-ke-kien-truc' },
    { label: 'Thiết kế nội thất', href: '/products?category=thiet-ke-noi-that' },
    { label: 'Xây dựng phần thô', href: '/products?category=xay-dung-phan-tho' },
    { label: 'Thi công nội thất', href: '/products?category=thi-cong-noi-that' },
    { label: 'Cải tạo & sửa chữa', href: '/products?category=cai-tao-sua-chua' },
  ];

  const aboutLinks = [
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Dự án', href: '/destinations' },
    { label: 'Tin tức', href: '/blog' },
    { label: 'Tuyển dụng', href: '/contact' },
    { label: 'Liên hệ', href: '/contact' },
  ];

  const socials = [
    { icon: <IconFacebook size={14} />, label: 'Facebook' },
    { icon: <IconInstagram size={14} />, label: 'Instagram' },
    { icon: <IconYoutube size={14} />, label: 'Youtube' },
    { icon: <IconPinterest size={14} />, label: 'Pinterest' },
  ];

  const linkStyle = { fontSize: 12.5, color: '#9a938a', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' };
  const colTitleStyle = { fontSize: 12.5, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 18 };
  const hoverIn = (e) => { e.currentTarget.style.color = BRONZE; };
  const hoverOut = (e) => { e.currentTarget.style.color = '#9a938a'; };

  return (
    <footer style={{ backgroundColor: DARK, color: '#9a938a', fontFamily: 'Inter, sans-serif' }}>
      <div className="container mx-auto px-4" style={{ paddingTop: 52, paddingBottom: 34 }}>
        <div className="ar-footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.25fr 1.35fr', gap: 34 }}>

          {/* Column 1: Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <LogoArchi size={42} color={BRONZE} />
              <div style={{ lineHeight: 1 }}>
                <span style={{ display: 'block', fontSize: 22, fontWeight: 900, letterSpacing: '0.06em', color: '#fff' }}>ARCHI</span>
                <span style={{ display: 'block', fontSize: 7.5, fontWeight: 700, letterSpacing: '0.2em', color: BRONZE, marginTop: 4, textTransform: 'uppercase' }}>
                  Interior & Construction
                </span>
              </div>
            </Link>
            <p style={{ fontSize: 12.5, lineHeight: 1.75, fontWeight: 500, marginBottom: 18, maxWidth: 250 }}>
              Chuyên thiết kế kiến trúc, nội thất và thi công xây dựng trọn gói. Kiến tạo không gian sống hiện đại, tiện nghi và bền vững.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.url} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)', color: '#cfcac2', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BRONZE; e.currentTarget.style.borderColor = BRONZE; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#cfcac2'; }}
                >
                  <SocialIcon platform={s.key} size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Dịch vụ */}
          <div>
            <h3 style={colTitleStyle}>DỊCH VỤ</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {serviceLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Về chúng tôi */}
          <div>
            <h3 style={colTitleStyle}>VỀ CHÚNG TÔI</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {aboutLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Liên hệ */}
          <div>
            <h3 style={colTitleStyle}>LIÊN HỆ</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13, fontSize: 12.5, fontWeight: 500 }}>
              <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <IconLocation size={16} style={{ flexShrink: 0, marginTop: 1, color: BRONZE }} />
                <span>123 Đường Nguyễn Trãi,<br />Thanh Xuân, Hà Nội</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <IconPhoneFilled size={15} style={{ flexShrink: 0, color: BRONZE }} />
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 13.5 }}>0988 123 456</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <IconMail size={16} style={{ flexShrink: 0, color: BRONZE }} />
                <span>info@noithatxaydung.vn</span>
              </li>
              <li style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <IconGlobe size={16} style={{ flexShrink: 0, color: BRONZE }} />
                <span>www.noithatxaydung.vn</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h3 style={colTitleStyle}>ĐĂNG KÝ NHẬN TIN</h3>
            <p style={{ fontSize: 12, lineHeight: 1.7, fontWeight: 500, marginBottom: 16 }}>
              Nhận thông tin mới nhất về dự án, ưu đãi và xu hướng thiết kế.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                style={{ flex: 1, minWidth: 0, padding: '12px 14px', fontSize: 12.5, backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', borderRight: 'none', color: '#fff', outline: 'none', fontFamily: 'inherit', borderRadius: '3px 0 0 3px' }}
              />
              <button
                type="submit"
                aria-label="Đăng ký"
                style={{ padding: '0 16px', backgroundColor: BRONZE, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 15, borderRadius: '0 3px 3px 0', transition: 'background 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8f6f42'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = BRONZE; }}
              >
                ➤
              </button>
            </form>
            {subMsg && (
              <div style={{ marginTop: 10, fontSize: 11.5, fontWeight: 600, color: subMsg.ok ? '#8fce9a' : '#e39a9a' }}>
                {subMsg.text}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container mx-auto px-4" style={{ paddingTop: 16, paddingBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 11.5, fontWeight: 500 }}>
          <div>© 2024 <strong style={{ color: '#cfcac2' }}>ARCHI</strong>. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 22 }}>
            <Link href="#" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Chính sách bảo mật</Link>
            <Link href="#" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ar-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .ar-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
