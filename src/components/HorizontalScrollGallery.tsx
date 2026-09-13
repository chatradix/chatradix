import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Monitor, Cpu, Box, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalScrollGallery: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const showcaseItems = [
    {
      title: 'Neon Nebula Shader',
      tag: 'CANVAS WEBGL',
      desc: 'Real-time procedural raymarching shaders rendering atmospheric space nebulae.',
      color: '#8b5cf6',
      icon: <Sparkles size={24} color="#c084fc" />,
      metric: '60 FPS Ultra',
    },
    {
      title: 'Quantum Matrix Grid',
      tag: 'PARALLAX 3D',
      desc: 'Spatial grid plane responding dynamically to scroll inertia and cursor distance.',
      color: '#06b6d4',
      icon: <Box size={24} color="#38bdf8" />,
      metric: '0ms Latency',
    },
    {
      title: 'Glassmorphic UI Engine',
      tag: 'BACKDROP COMPOSITOR',
      desc: 'Hardware-accelerated CSS blur filters with dynamic border glow reflection lines.',
      color: '#ec4899',
      icon: <Monitor size={24} color="#f472b6" />,
      metric: 'HDR Glass FX',
    },
    {
      title: 'Autonomous Kinetic Loop',
      tag: 'GSAP TIMELINE',
      desc: 'Synchronized scroll scrub animations with custom ease curves and spring damping.',
      color: '#10b981',
      icon: <Code size={24} color="#34d399" />,
      metric: 'Scroll Physics',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!targetRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const scrollWidth = container.scrollWidth - window.innerWidth + 100;

      gsap.to(container, {
        x: () => -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: targetRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, targetRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={targetRef}
      style={{
        position: 'relative',
        height: '100vh',
        backgroundColor: '#03050b',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '5%',
          zIndex: 20,
        }}
      >
        <span className="glass-pill">HORIZONTAL PARALLAX</span>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', marginTop: '8px' }}>
          Immersive <span className="gradient-text-pink">Gallery Showcase</span>
        </h2>
      </div>

      <div
        ref={containerRef}
        style={{
          display: 'flex',
          gap: '40px',
          paddingLeft: '5vw',
          paddingRight: '10vw',
          paddingTop: '80px',
          alignItems: 'center',
          willChange: 'transform',
        }}
      >
        {showcaseItems.map((item, index) => (
          <div
            key={index}
            className="glass-card"
            style={{
              flexShrink: 0,
              width: 'clamp(320px, 40vw, 550px)',
              height: '420px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              background: `radial-gradient(circle at top right, ${item.color}22 0%, rgba(13, 17, 39, 0.9) 70%)`,
              borderColor: `${item.color}55`,
            }}
          >
            {/* Background Graphic Watermark */}
            <div
              style={{
                position: 'absolute',
                right: '-20px',
                bottom: '-20px',
                opacity: 0.08,
                transform: 'scale(2.5)',
                pointerEvents: 'none',
              }}
            >
              {item.icon}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: item.color,
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.tag}
                </span>
                <span
                  className="glass-pill"
                  style={{ fontSize: '0.75rem', padding: '4px 12px' }}
                >
                  {item.metric}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  color: '#fff',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-subtle)' }}>
                0{index + 1}
              </span>
              <button
                className="btn-secondary-outline"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                Explore Module
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
