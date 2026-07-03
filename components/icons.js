// Bộ icon SVG line-style dùng chung cho template Nha Khoa Smile
import React from 'react';

const S = (size, extra = {}) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  ...extra,
});

export function IconTooth({ size = 24, strokeWidth = 1.7, ...props }) {
  return (
    <svg {...S(size)} strokeWidth={strokeWidth} {...props}>
      <path d="M7.5 3.5 C4.5 3.5 3 6.5 3.6 9.5 C4.3 13 5.8 17.5 6.6 19.8 C7 21 8.6 21 8.9 19.7 C9.3 17.6 9.6 14.5 12 14.5 C14.4 14.5 14.7 17.6 15.1 19.7 C15.4 21 17 21 17.4 19.8 C18.2 17.5 19.7 13 20.4 9.5 C21 6.5 19.5 3.5 16.5 3.5 C14.5 3.5 14 4.6 12 4.6 C10 4.6 9.5 3.5 7.5 3.5 Z" />
    </svg>
  );
}

export function IconToothSparkle({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M8 5.5 C5.6 5.5 4.4 7.9 4.9 10.3 C5.5 13.1 6.6 16.7 7.3 18.6 C7.6 19.6 8.9 19.6 9.2 18.5 C9.5 16.8 9.8 14.4 11.7 14.4 C13.6 14.4 13.9 16.8 14.2 18.5 C14.5 19.6 15.8 19.6 16.1 18.6 C16.8 16.7 17.9 13.1 18.5 10.3 C19 7.9 17.8 5.5 15.4 5.5 C13.8 5.5 13.3 6.4 11.7 6.4 C10.1 6.4 9.6 5.5 8 5.5 Z" />
      <path d="M19.5 2.5 L19.9 3.8 L21.2 4.2 L19.9 4.6 L19.5 5.9 L19.1 4.6 L17.8 4.2 L19.1 3.8 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconShieldCheck({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 3 L19.5 5.8 V11 C19.5 15.8 16.4 19.6 12 21 C7.6 19.6 4.5 15.8 4.5 11 V5.8 Z" />
      <polyline points="9 11.5 11.2 13.7 15.2 9.7" />
    </svg>
  );
}

export function IconShieldTooth({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 2.8 L19.8 5.7 V11 C19.8 15.9 16.5 19.9 12 21.3 C7.5 19.9 4.2 15.9 4.2 11 V5.7 Z" />
      <path d="M9.7 8 C8.5 8 7.9 9 8.2 10.2 C8.5 11.5 9 13.2 9.4 14.2 C9.6 14.7 10.2 14.7 10.3 14.2 C10.5 13.3 10.6 12.1 12 12.1 C13.4 12.1 13.5 13.3 13.7 14.2 C13.8 14.7 14.4 14.7 14.6 14.2 C15 13.2 15.5 11.5 15.8 10.2 C16.1 9 15.5 8 14.3 8 C13.4 8 13.1 8.4 12 8.4 C10.9 8.4 10.6 8 9.7 8 Z" />
    </svg>
  );
}

export function IconClock({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5 V12 L15 14" />
    </svg>
  );
}

export function IconDollarCircle({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.8 V17.2" />
      <path d="M14.4 8.9 C14.4 8.1 13.3 7.7 12 7.7 C10.7 7.7 9.7 8.4 9.7 9.4 C9.7 12 14.4 11 14.4 13.7 C14.4 14.8 13.3 15.4 12 15.4 C10.7 15.4 9.6 14.8 9.6 13.9" />
    </svg>
  );
}

export function IconBadgeCheck({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 2.8 L14.1 4.7 L16.9 4.3 L17.9 7 L20.5 8.1 L20 10.9 L21.8 13.1 L20 15.3 L20.5 18.1 L17.9 19.2 L16.9 21.9 L14.1 21.5 L12 23.4 L9.9 21.5 L7.1 21.9 L6.1 19.2 L3.5 18.1 L4 15.3 L2.2 13.1 L4 10.9 L3.5 8.1 L6.1 7 L7.1 4.3 L9.9 4.7 Z" transform="translate(0,-1.1)" />
      <polyline points="8.6 11.6 11 14 15.4 9.6" />
    </svg>
  );
}

export function IconDoctor({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="7.6" r="3.5" />
      <path d="M5 20.5 C5 16.6 8 14.8 12 14.8 C16 14.8 19 16.6 19 20.5" />
      <path d="M12 16.8 V19.2 M10.8 18 H13.2" />
    </svg>
  );
}

export function IconGear({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8 V5.2 M12 18.8 V21.2 M2.8 12 H5.2 M18.8 12 H21.2 M5.5 5.5 L7.2 7.2 M16.8 16.8 L18.5 18.5 M18.5 5.5 L16.8 7.2 M7.2 16.8 L5.5 18.5" />
    </svg>
  );
}

export function IconClipboardCheck({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="5.5" y="4.2" width="13" height="17" rx="2" />
      <path d="M9.2 4.2 V3.4 C9.2 2.9 9.6 2.5 10.1 2.5 H13.9 C14.4 2.5 14.8 2.9 14.8 3.4 V4.2" />
      <polyline points="9 12.8 11.2 15 15 10.8" />
    </svg>
  );
}

export function IconHeartCare({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 20 C7 16.2 4 13.5 4 10.2 C4 7.8 5.9 6 8.2 6 C9.7 6 11.1 6.8 12 8 C12.9 6.8 14.3 6 15.8 6 C18.1 6 20 7.8 20 10.2 C20 13.5 17 16.2 12 20 Z" />
    </svg>
  );
}

export function IconPhone({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M8.4 3.5 C9.2 3.5 9.9 4 10.1 4.8 L10.8 7.4 C11 8.1 10.8 8.8 10.3 9.3 L9.5 10.1 C10.7 12.4 11.6 13.3 13.9 14.5 L14.7 13.7 C15.2 13.2 15.9 13 16.6 13.2 L19.2 13.9 C20 14.1 20.5 14.8 20.5 15.6 V17.5 C20.5 18.6 19.6 19.5 18.5 19.4 C11 18.7 5.3 13 4.6 5.5 C4.5 4.4 5.4 3.5 6.5 3.5 Z" />
    </svg>
  );
}

export function IconPhoneFilled({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8.4 3 C9.4 3 10.3 3.7 10.6 4.7 L11.3 7.2 C11.5 8.1 11.3 9 10.6 9.6 L10 10.2 C11 12 11.9 12.9 13.8 14 L14.4 13.4 C15 12.7 15.9 12.5 16.8 12.7 L19.3 13.4 C20.3 13.7 21 14.6 21 15.6 V17.6 C21 19 19.9 20.1 18.5 20 C10.6 19.2 4.8 13.4 4 5.5 C3.9 4.1 5 3 6.4 3 Z" />
    </svg>
  );
}

export function IconCalendar({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9.5 H20 M8 3 V7 M16 3 V7" />
    </svg>
  );
}

export function IconLocation({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 21 C12 21 5.5 14.8 5.5 10 C5.5 6.4 8.4 3.5 12 3.5 C15.6 3.5 18.5 6.4 18.5 10 C18.5 14.8 12 21 12 21 Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function IconMail({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <polyline points="4.5 7 12 12.8 19.5 7" />
    </svg>
  );
}

export function IconGlobe({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12 H20.5" />
      <path d="M12 3.5 C14.3 5.8 15.4 8.8 15.4 12 C15.4 15.2 14.3 18.2 12 20.5 C9.7 18.2 8.6 15.2 8.6 12 C8.6 8.8 9.7 5.8 12 3.5 Z" />
    </svg>
  );
}

export function IconMedal({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="14.8" r="4.6" />
      <path d="M9 11.2 L5.8 3.5 H10 L12 8 L14 3.5 H18.2 L15 11.2" />
    </svg>
  );
}

export function IconUsers({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="9" cy="8.5" r="3.1" />
      <path d="M3.4 19.5 C3.4 16.3 5.9 14.6 9 14.6 C12.1 14.6 14.6 16.3 14.6 19.5" />
      <circle cx="16.7" cy="9.2" r="2.4" />
      <path d="M16.6 14.3 C19.1 14.5 20.8 16 20.8 18.5" />
    </svg>
  );
}

export function IconStar({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.6 L14.9 8.5 L21.4 9.4 L16.7 14 L17.8 20.5 L12 17.4 L6.2 20.5 L7.3 14 L2.6 9.4 L9.1 8.5 Z" />
    </svg>
  );
}

export function IconStarOutline({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M12 2.6 L14.9 8.5 L21.4 9.4 L16.7 14 L17.8 20.5 L12 17.4 L6.2 20.5 L7.3 14 L2.6 9.4 L9.1 8.5 Z" />
    </svg>
  );
}

export function IconArrowRight({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M4 12 H20 M14 6 L20 12 L14 18" />
    </svg>
  );
}

export function IconCheckCircle({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <polyline points="8.5 12.2 10.8 14.5 15.5 9.8" />
    </svg>
  );
}

// ─── Social icons (filled) ─────────────────────────────────────
export function IconFacebook({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21 v-7 h2.4 l.4-2.8 h-2.8 V9.4 c0-.8.3-1.4 1.5-1.4 h1.4 V5.6 c-.6-.1-1.4-.2-2.2-.2 -2.2 0-3.6 1.3-3.6 3.7 v2.1 H8 v2.8 h2.6 v7 Z" />
    </svg>
  );
}

export function IconInstagram({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconYoutube({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.4 8 C21.2 6.8 20.5 5.9 19.3 5.7 C17.4 5.3 12 5.3 12 5.3 C12 5.3 6.6 5.3 4.7 5.7 C3.5 5.9 2.8 6.8 2.6 8 C2.3 9.9 2.3 12 2.3 12 C2.3 12 2.3 14.1 2.6 16 C2.8 17.2 3.5 18.1 4.7 18.3 C6.6 18.7 12 18.7 12 18.7 C12 18.7 17.4 18.7 19.3 18.3 C20.5 18.1 21.2 17.2 21.4 16 C21.7 14.1 21.7 12 21.7 12 C21.7 12 21.7 9.9 21.4 8 Z M10.2 15 V9 L15.2 12 Z" />
    </svg>
  );
}

export function IconTiktok({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.8 3 c.3 1.9 1.5 3.3 3.5 3.6 v3 c-1.4 0-2.6-.4-3.6-1.1 v6.2 c0 3.5-2.4 5.8-5.6 5.8 -3 0-5.4-2.2-5.4-5.2 0-3 2.3-5.2 5.4-5.2 .3 0 .7 0 1 .1 v3.1 c-.3-.1-.6-.2-1-.2 -1.4 0-2.4 1-2.4 2.3 0 1.3 1 2.2 2.4 2.2 1.6 0 2.6-1.1 2.6-3 V3 Z" />
    </svg>
  );
}

// ─── Logo Nha Khoa Smile ───────────────────────────────────────
// Chiếc răng trong khung bo tròn + nét cười, dùng cho header/footer
export function LogoTooth({ size = 44, color = '#b08d57', bg = 'transparent', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      {bg !== 'transparent' && <rect x="0" y="0" width="48" height="48" rx="12" fill={bg} />}
      <path
        d="M16 8 C10 8 7 14 8.2 20 C9.6 27 12.6 36 14.2 40.5 C15 42.8 18.2 42.8 18.8 40.3 C19.6 36.2 20.2 30 24 30 C27.8 30 28.4 36.2 29.2 40.3 C29.8 42.8 33 42.8 33.8 40.5 C35.4 36 38.4 27 39.8 20 C41 14 38 8 32 8 C28 8 27 10.2 24 10.2 C21 10.2 20 8 16 8 Z"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 17.5 C20 20.5 28 20.5 30 17.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// Đường trang trí dưới tiêu đề section
export function SectionOrnament({ color = '#b08d57' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 12 }}>
      <span style={{ width: 44, height: 2, backgroundColor: color, opacity: 0.5, borderRadius: 999 }} />
      <span style={{ width: 8, height: 8, backgroundColor: color, transform: 'rotate(45deg)' }} />
      <span style={{ width: 44, height: 2, backgroundColor: color, opacity: 0.5, borderRadius: 999 }} />
    </div>
  );
}

// ─── Bộ icon kiến trúc / nội thất / xây dựng (ARCHI) ───────────

// Logo ARCHI: ngôi nhà trong khung bo tròn
export function LogoArchi({ size = 46, color = '#b08d57', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      <rect x="2" y="2" width="44" height="44" rx="10" stroke={color} strokeWidth="2.4" />
      <path d="M12 27 L24 15 L36 27" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 24 V35 H32 V24" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 35 V28 H26 V35" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBuilding({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="4" y="8.5" width="7.5" height="12.5" />
      <rect x="11.5" y="3" width="8.5" height="18" />
      <path d="M2.5 21 H21.5" />
      <path d="M14 6.5 H15.5 M17 6.5 H18.5 M14 10 H15.5 M17 10 H18.5 M14 13.5 H15.5 M17 13.5 H18.5 M6.5 12 H9 M6.5 15.5 H9" />
    </svg>
  );
}

export function IconSofa({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M6 11 V8.5 C6 7.1 7.1 6 8.5 6 H15.5 C16.9 6 18 7.1 18 8.5 V11" />
      <path d="M4.5 17.5 C3.4 17.5 2.5 16.6 2.5 15.5 V13.2 C2.5 12.1 3.4 11.2 4.5 11.2 C5.6 11.2 6.5 12.1 6.5 13.2 V13.8 H17.5 V13.2 C17.5 12.1 18.4 11.2 19.5 11.2 C20.6 11.2 21.5 12.1 21.5 13.2 V15.5 C21.5 16.6 20.6 17.5 19.5 17.5 Z" />
      <path d="M5 17.5 V19.5 M19 17.5 V19.5" />
    </svg>
  );
}

export function IconCrane({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M6.5 21 V5 L18.5 8.5 M6.5 8 L18.5 8.5" />
      <path d="M4 21 H9" />
      <path d="M15 8.4 V12 M13.4 12 H16.6 M15 12 V13.6" />
      <path d="M6.5 5 L4.5 8 H8.5 Z" />
    </svg>
  );
}

export function IconWrenchHammer({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M5.5 3.5 L9.5 7.5 L7.5 9.5 L3.5 5.5 C3 6.9 3.3 8.6 4.5 9.7 C5.6 10.8 7.2 11.1 8.6 10.7 L17 19 C17.7 19.7 18.8 19.7 19.4 19 C20.1 18.4 20.1 17.3 19.4 16.6 L11.1 8.3 C11.5 6.9 11.2 5.3 10.1 4.2 C8.9 3 7 2.9 5.5 3.5 Z" />
    </svg>
  );
}

export function IconHouseRepair({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M3.5 11 L12 3.5 L20.5 11" />
      <path d="M6 9.5 V20 H18 V9.5" />
      <path d="M9.6 16.6 L12.5 13.7 C12.1 12.8 12.3 11.7 13 11 C13.8 10.2 14.9 10 15.8 10.5 L14.2 12.1 L15.6 13.5 L17.2 11.9 C17.7 12.8 17.5 13.9 16.7 14.7 C16 15.4 14.9 15.6 14 15.2 L11.1 18.1 C10.7 18.5 10 18.5 9.6 18.1 C9.2 17.7 9.2 17 9.6 16.6 Z" />
    </svg>
  );
}

export function IconBlueprint({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M8 4.5 V13 H14 V19.5 M8 13 H3.5 M14 13 H20.5 M14 8.5 H20.5" />
    </svg>
  );
}

export function IconRulerPencil({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M3 17.5 L14.5 6 L18 9.5 L6.5 21 H3 Z" />
      <path d="M6 14.5 L7.5 16 M9 11.5 L10.5 13 M12 8.5 L13.5 10" />
      <path d="M16.5 4 L20 7.5 L21 6.5 C21.8 5.7 21.8 4.4 21 3.6 L20.4 3 C19.6 2.2 18.3 2.2 17.5 3 Z" />
    </svg>
  );
}

export function IconContract({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M6 3.5 H15 L19 7.5 V20.5 H6 Z" />
      <path d="M15 3.5 V7.5 H19" />
      <path d="M9 12 H16 M9 15 H16 M9 18 H12.5" />
    </svg>
  );
}

export function IconHeadset({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M4.5 13.5 V11.5 C4.5 7.4 7.9 4 12 4 C16.1 4 19.5 7.4 19.5 11.5 V13.5" />
      <rect x="3" y="12.5" width="4" height="6" rx="1.8" />
      <rect x="17" y="12.5" width="4" height="6" rx="1.8" />
      <path d="M19 18.5 C19 20 17.5 21 15.5 21 H13" />
    </svg>
  );
}

export function IconChatIdea({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M4 5.5 C4 4.4 4.9 3.5 6 3.5 H18 C19.1 3.5 20 4.4 20 5.5 V14 C20 15.1 19.1 16 18 16 H9.5 L5.5 20 V16 H6 C4.9 16 4 15.1 4 14 Z" />
      <path d="M12 6.5 V10 M12 12.3 V12.6" />
    </svg>
  );
}

export function IconHammer({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <path d="M13.5 8 L6 15.5 C5.3 16.2 5.3 17.3 6 18 C6.7 18.7 7.8 18.7 8.5 18 L16 10.5" />
      <path d="M11.5 5.5 L14 3 C15.5 3.7 17.5 4.5 18.5 5.5 C19.5 6.5 20.3 8.5 21 10 L18.5 12.5 C17.5 11.8 16.4 11.5 15.5 11 C15 12 14.6 12.4 14 13 L11 10 C11.6 9.4 12 9 13 8.5 C12.5 7.6 12.2 6.5 11.5 5.5 Z" />
    </svg>
  );
}

export function IconKeyCheck({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="8" cy="15" r="4.5" />
      <circle cx="8" cy="15" r="1.3" />
      <path d="M11.5 11.5 L19.5 3.5 M16.5 6.5 L19.5 9.5 M14 9 L16 11" />
    </svg>
  );
}

export function IconSearch({ size = 24, ...props }) {
  return (
    <svg {...S(size)} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 L20.5 20.5" />
    </svg>
  );
}

export function IconPinterest({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3 C7 3 4.2 6.3 4.2 9.9 C4.2 11.6 5.1 13.7 6.5 14.4 C6.9 14.6 7.1 14.5 7.2 14.1 L7.6 12.6 C7.6 12.5 7.6 12.3 7.5 12.2 C6.9 11.5 6.5 10.3 6.5 9.2 C6.5 6.4 8.6 3.7 12.3 3.7 C15.4 3.7 17.6 5.8 17.6 8.9 C17.6 12.4 15.9 14.8 13.6 14.8 C12.4 14.8 11.5 13.8 11.8 12.5 L12.5 9.9 C12.7 9.1 12.5 8.4 11.7 8.4 C10.7 8.4 10 9.5 10 10.9 C10 11.8 10.3 12.4 10.3 12.4 L9 17.4 C8.7 18.8 9 20.7 9 20.9 C9.1 21.1 9.3 21.1 9.4 21 C9.6 20.8 11 18.9 11.4 17.5 L12 15.4 C12.4 16.1 13.5 16.7 14.6 16.7 C17.9 16.7 20.2 13.7 20.2 9.8 C20.2 6 17 3 12 3 Z" />
    </svg>
  );
}
