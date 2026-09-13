import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Sparkles, Layers, Eye, Compass, Workflow } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeatureCardsParallax: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      badge: 'LAYER 01 // KINETICS',
      title: 'Depth-Mapped Parallax Physics',
      description:
        'Calculates real-time Z-index offset coordinates as user scrolls. Gives structural depth to graphics, text overlays, and background particle webs.',
      icon: <Layers size={28} color="#c084fc" />,
      accent: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(0, 0, 0, 0))',
      borderColor: 'rgba(139, 92, 246, 0.4)',
      stats: '120 FPS Interpolation',
    },
    {
      badge: 'LAYER 02 // VELOCITY',
      title: 'Momemtum Inertia Engine',
      description:
        'Powered by Lenis smooth scroll algorithms to eliminate jumpy scroll steps, rendering smooth continuous momentum curves across high-refresh screens.',
      icon: <Workflow size={28} color="#38bdf8" />,
      accent: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(0, 0, 0, 0))',
      borderColor: 'rgba(6, 182, 212, 0.4)',
      stats: 'Sub-millisecond Latency',
    },
    {
      badge: 'LAYER 03 // ILLUMINATION',
      title: 'Glassmorphic Shader FX',
      description:
        'Multi-layer CSS backdrop blur filters paired with dynamic mouse-tracking lighting glows, producing a futuristic dark-mode aesthetic.',
      icon: <Sparkles size={28} color="#f472b6" />,
      accent: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(0, 0, 0, 0))',
      borderColor: 'rgba(236, 72, 153, 0.4)',
      stats: 'GPU Accelerated Backdrop',
    },
    {
      badge: 'LAYER 04 // SPATIAL 3D',
      title: 'Mouse Quaternion Tilt',
      description:
        'Interactive 3D card response reacting instantly to cursor vectors. Elements rotate on X and Y axes with subtle spring damping physics.',
      icon: <Compass size={28} color="#34d399" />,
      accent: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(0, 0, 0, 0))',
      borderColor: 'rgba(16, 185, 129, 0.4)',
      stats: '3D Spatial Orientation',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // ScrollTrigger animation for each card
        gsap.fromTo(
          card,
          {
            y: 120,
            opacity: 0,
            scale: 0.9,
            rotateX: -15,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Background Glow */}
      <div
        className="glow-orb glow-orb-primary"
        style={{ width: '500px', height: '500px', top: '20%', left: '-10%' }}
      />
      <div
        className="glow-orb glow-orb-secondary"
        style={{ width: '500px', height: '500px', bottom: '10%', right: '-10%' }}
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="glass-pill">ARCHITECTURAL ARCHETYPES</span>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              marginTop: '16px',
              marginBottom: '20px',
              color: '#fff',
            }}
          >
            Engineered for <span className="gradient-text">Visual Dominance</span>
          </h2>
          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            Every feature component is built with GPU offloading and fluid scroll physics to keep frame rates steady at 60 FPS+.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}
        >
          {features.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="glass-card"
              style={{
                position: 'relative',
                padding: '36px 30px',
                background: `linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(5, 7, 15, 0.9) 100%)`,
                border: `1px solid ${item.borderColor}`,
                overflow: 'hidden',
              }}
            >
              {/* Top Accent Gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: item.accent,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    padding: '12px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-subtle)',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                  }}
                >
                  {item.badge}
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.4rem',
                  color: '#fff',
                  marginBottom: '14px',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                }}
              >
                {item.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.82rem',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                }}
              >
                <Eye size={14} color="#06b6d4" />
                <span>{item.stats}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
