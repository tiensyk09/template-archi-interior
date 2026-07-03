'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoArchi, IconLocation, IconMail, IconClock, IconFacebook, IconInstagram, IconPinterest, IconYoutube, IconSearch } from '@/components/icons';
import { SocialIcon, buildSocialLinks } from '@/components/SocialLinks';

const BRONZE = '#b08d57';
const DARK = '#1c1c1c';

export default function Header() {
  const pathname = usePathname();
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  React.useEffect(() => {
    fetch('/api/settings').then((r) => r.ok ? r.json() : null).then((d) => { if (d?.settings) setSocialLinks(buildSocialLinks(d.settings)); }).catch(() => {});
  }, []);

  React.useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch('/api/auth/login');
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to check auth state in header:', err);
      }
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/login', { method: 'DELETE' });
      if (res.ok) {
        setUser(null);
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const services = [
    { title: 'Thiết kế kiến trúc', link: '/products?category=thiet-ke-kien-truc' },
    { title: 'Thiết kế nội thất', link: '/products?category=thiet-ke-noi-that' },
    { title: 'Xây dựng phần thô', link: '/products?category=xay-dung-phan-tho' },
    { title: 'Thi công nội thất', link: '/products?category=thi-cong-noi-that' },
    { title: 'Cải tạo & sửa chữa', link: '/products?category=cai-tao-sua-chua' },
  ];

  const navItems = [
    { href: '/', label: 'TRANG CHỦ' },
    { href: '/about', label: 'GIỚI THIỆU' },
    { href: '/products', label: 'DỊCH VỤ', hasDropdown: true },
    { href: '/destinations', label: 'DỰ ÁN' },
    { href: '/blog', label: 'TIN TỨC' },
    { href: '/contact', label: 'LIÊN HỆ' },
  ];

  const activeIndex = navItems.findIndex((item) =>
    item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
  );

  const socials = [
    { icon: <IconFacebook size={13} />, label: 'Facebook' },
    { icon: <IconInstagram size={13} />, label: 'Instagram' },
    { icon: <IconPinterest size={13} />, label: 'Pinterest' },
    { icon: <IconYoutube size={13} />, label: 'Youtube' },
  ];

  return (
    <header style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>

      {/* 1. TOP BAR */}
      <div className="ar-top-bar" style={{ backgroundColor: DARK, color: '#cfcac2', fontSize: 12, padding: '8px 16px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconLocation size={14} style={{ color: BRONZE }} /> 123 Đường Nguyễn Trãi, Thanh Xuân, Hà Nội
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconMail size={14} style={{ color: BRONZE }} /> info@noithatxaydung.vn
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
              <IconClock size={14} style={{ color: BRONZE }} /> 08:00 - 17:30 (Thứ 2 - Thứ 7)
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {socialLinks.map((s) => (
              <a
                key={s.key}
                href={s.url} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                style={{ color: '#cfcac2', display: 'inline-flex', transition: 'color 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = BRONZE; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#cfcac2'; }}
              >
                <SocialIcon platform={s.key} size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER — Logo + Nav + CTA */}
      <div style={{ backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '10px 16px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none', flexShrink: 0 }}>
            <LogoArchi size={46} color={BRONZE} />
            <div style={{ lineHeight: 1 }}>
              <span style={{ display: 'block', fontSize: 25, fontWeight: 900, letterSpacing: '0.06em', color: '#211d18' }}>ARCHI</span>
              <span style={{ display: 'block', fontSize: 8.5, fontWeight: 700, letterSpacing: '0.22em', color: BRONZE, marginTop: 4, textTransform: 'uppercase' }}>
                Interior & Construction
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="ar-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            {navItems.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={item.label}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => item.hasDropdown && setIsServiceOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsServiceOpen(false)}
                >
                  <Link
                    href={item.href}
                    style={{ position: 'relative', fontSize: 12.5, fontWeight: isActive ? 800 : 600, letterSpacing: '0.05em', color: isActive ? '#211d18' : '#4b4640', textDecoration: 'none', padding: '22px 0', display: 'inline-flex', alignItems: 'center', gap: 5, transition: 'color 0.15s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = BRONZE; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? '#211d18' : '#4b4640'; }}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                    {isActive && (
                      <span style={{ position: 'absolute', bottom: 14, left: 0, right: 0, height: 2.5, backgroundColor: BRONZE }} />
                    )}
                  </Link>

                  {item.hasDropdown && isServiceOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', width: 240, backgroundColor: '#fff', border: '1px solid #eee9e1', borderRadius: 4, boxShadow: '0 16px 36px rgba(0,0,0,0.14)', zIndex: 100, overflow: 'hidden', animation: 'arFadeInDown 0.15s ease-out' }}>
                      {services.map((svc, i) => (
                        <Link
                          key={i}
                          href={svc.link}
                          onClick={() => setIsServiceOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#4b4640', borderBottom: i < services.length - 1 ? '1px solid #f7f4ef' : 'none', textDecoration: 'none', transition: 'all 0.15s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8f5f0'; e.currentTarget.style.color = BRONZE; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = '#4b4640'; }}
                        >
                          <span style={{ width: 5, height: 5, backgroundColor: BRONZE, flexShrink: 0, transform: 'rotate(45deg)' }} />
                          <span>{svc.title}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* CTA + Search + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            <Link
              href="/contact"
              className="ar-cta-btn"
              style={{ backgroundColor: BRONZE, color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '13px 24px', borderRadius: 3, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = DARK; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = BRONZE; }}
            >
              TƯ VẤN MIỄN PHÍ
            </Link>

            <Link href="/products" aria-label="Tìm kiếm" className="ar-search-btn" style={{ color: '#211d18', display: 'inline-flex', padding: 6 }}>
              <IconSearch size={19} />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ar-mobile-menu-toggle"
              aria-label="Menu"
              style={{ display: 'none', padding: 8, border: '1px solid #e5e0d8', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: 18, color: '#211d18' }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div style={{ backgroundColor: '#fff', borderTop: '1px solid #f3f0ea', padding: 16, boxShadow: '0 8px 16px rgba(0,0,0,0.06)' }}>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#211d18', borderBottom: '1px solid #f3f0ea', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
              ))}

              {user ? (
                <div style={{ padding: '12px 0', borderBottom: '1px solid #f3f0ea', fontSize: 14 }}>
                  <div style={{ fontWeight: 600, color: '#211d18' }}>Chào, {user.displayName || user.username}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} style={{ color: BRONZE, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>Đơn hàng của bạn</Link>
                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} style={{ background: 'none', border: 'none', padding: 0, color: '#dc2626', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Đăng xuất</button>
                  </div>
                </div>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'block', padding: '12px 0', fontSize: 14, fontWeight: 700, color: '#211d18', borderBottom: '1px solid #f3f0ea', textDecoration: 'none' }}>
                  Đăng nhập
                </Link>
              )}

              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#211d18', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.08em' }}>
                  Dịch vụ
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 4 }}>
                  {services.map((svc, idx) => (
                    <Link
                      key={idx}
                      href={svc.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ fontSize: 13, color: '#4b4640', textDecoration: 'none', padding: '8px 0', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500 }}
                    >
                      <span style={{ width: 5, height: 5, backgroundColor: BRONZE, flexShrink: 0, transform: 'rotate(45deg)' }} />
                      <span>{svc.title}</span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'block', textAlign: 'center', marginTop: 16, backgroundColor: BRONZE, color: '#fff', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', padding: '12px 20px', borderRadius: 3, textDecoration: 'none' }}
                >
                  Tư vấn miễn phí
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      <style>{`
        @keyframes arFadeInDown {
          from { opacity: 0; transform: translate(-50%, -8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (max-width: 1024px) {
          .ar-top-bar { display: none !important; }
          .ar-desktop-nav { display: none !important; }
          .ar-search-btn { display: none !important; }
          .ar-mobile-menu-toggle { display: block !important; }
          .ar-cta-btn { padding: 10px 14px !important; font-size: 11px !important; }
        }
      `}</style>
    </header>
  );
}
