'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IconLocation } from '@/components/icons';

const BRONZE = '#b08d57';
const DARK = '#1c1c1c';

export default function ProjectsSection() {
  const fallbackProjects = [
    {
      id: 1,
      name: 'BIỆT THỰ HIỆN ĐẠI',
      location: 'Vinhomes Riverside, Hà Nội',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      slug: 'biet-thu-hien-dai',
    },
    {
      id: 2,
      name: 'CĂN HỘ CAO CẤP',
      location: 'Sunshine City, Hà Nội',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      slug: 'can-ho-cao-cap',
    },
    {
      id: 3,
      name: 'NHÀ PHỐ 3 TẦNG',
      location: 'TP. Thủ Đức, TP.HCM',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      slug: 'nha-pho-3-tang',
    },
    {
      id: 4,
      name: 'VĂN PHÒNG HIỆN ĐẠI',
      location: 'Cầu Giấy, Hà Nội',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
      slug: 'van-phong-hien-dai',
    },
  ];

  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    fetch('/api/products?featured=true&limit=4')
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setProjects(
            data.products.map((p) => ({
              id: p.id,
              name: p.name,
              location: p.origin || 'Việt Nam',
              image: p.thumbnail,
              slug: p.slug,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="featured-projects" className="py-12 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 30 }}>
          <div>
            <h2 style={{ color: '#211d18', fontSize: 27, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              DỰ ÁN TIÊU BIỂU
            </h2>
            <div style={{ width: 56, height: 3, backgroundColor: BRONZE, marginTop: 10 }} />
          </div>
          <Link
            href="/destinations"
            style={{ border: `1.5px solid ${BRONZE}`, color: BRONZE, fontWeight: 800, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '11px 22px', borderRadius: 3, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = BRONZE; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = BRONZE; }}
          >
            XEM TẤT CẢ DỰ ÁN →
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="ar-projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 18 }}>
          {projects.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group"
              style={{ display: 'block', textDecoration: 'none', border: '1px solid #eee9e1', backgroundColor: '#fff', overflow: 'hidden', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 18px 36px rgba(33,29,24,0.14)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ height: 190, overflow: 'hidden', backgroundColor: '#f4f1ec' }}>
                <img
                  src={p.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'}
                  alt={p.name}
                  className="group-hover:scale-105 transition-transform duration-500"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'; }}
                />
              </div>
              <div style={{ padding: '16px 16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <div>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#211d18', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: 6 }}>{p.name}</h3>
                  <div style={{ fontSize: 11.5, color: '#8a8378', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <IconLocation size={13} style={{ color: BRONZE }} /> {p.location}
                  </div>
                </div>
                <span style={{ width: 34, height: 34, flexShrink: 0, backgroundColor: '#f4efe7', color: BRONZE, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, borderRadius: 3 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ar-projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .ar-projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
