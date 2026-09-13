import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ShieldCheck, Gauge, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const StatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const stats = [
    { label: 'Render Frame Rate', value: 120, suffix: ' FPS', icon: <Gauge size={24} color="#c084fc" /> },
    { label: 'Parallax Depth Layers', value: 4, suffix: ' Spatial', icon: <Zap size={24} color="#38bdf8" /> },
    { label: 'Input Latency', value: 0.4, suffix: ' ms', icon: <Activity size={24} color="#f472b6" /> },
    { label: 'Inertia Smoothness', value: 99.9, suffix: ' %', icon: <ShieldCheck size={24} color="#34d399" /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.fromTo(
        '.stat-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stats" ref={containerRef} className="section-padding" style={{ position: 'relative', zIndex: 10 }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card stat-card"
              style={{
                padding: '32px 24px',
                textAlign: 'center',
                background: 'rgba(13, 17, 39, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: '12px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  marginBottom: '16px',
                }}
              >
                {stat.icon}
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)',
                  color: '#fff',
                  marginBottom: '8px',
                }}
              >
                {stat.value}
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{stat.suffix}</span>
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
