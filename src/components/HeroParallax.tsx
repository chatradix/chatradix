import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ChevronDown, Layers, Zap, Shield, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroParallaxProps {
  onExplore: () => void;
}

export const HeroParallax: React.FC<HeroParallaxProps> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layerBgRef = useRef<HTMLDivElement | null>(null);
  const layerMidRef = useRef<HTMLDivElement | null>(null);
  const layerFrontRef = useRef<HTMLDivElement | null>(null);
  const heroCardRef = useRef<HTMLDivElement | null>(null);

  // Mouse Parallax 3D Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;

      if (layerBgRef.current) {
        gsap.to(layerBgRef.current, {
          x: x * 15,
          y: y * 15,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
      if (layerMidRef.current) {
        gsap.to(layerMidRef.current, {
          x: x * 35,
          y: y * 35,
          duration: 1,
          ease: 'power2.out',
        });
      }
      if (layerFrontRef.current) {
        gsap.to(layerFrontRef.current, {
          x: x * 50,
          y: y * 50,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
      if (heroCardRef.current) {
        gsap.to(heroCardRef.current, {
          rotateY: x * 12,
          rotateX: -y * 12,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP ScrollTrigger Parallax Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(layerFrontRef.current, { y: -180, opacity: 0.2 }, 0)
        .to(layerMidRef.current, { y: -100, scale: 0.95 }, 0)
        .to(heroCardRef.current, { y: -150, rotateX: 25, scale: 0.9 }, 0)
        .to(layerBgRef.current, { y: 50, scale: 1.1 }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '160px',
        paddingBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* Background Layer (Orbs & Grids) */}
      <div ref={layerBgRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          className="glow-orb glow-orb-primary animate-pulse-glow"
          style={{ width: '600px', height: '600px', top: '-10%', left: '20%' }}
        />
        <div
          className="glow-orb glow-orb-secondary"
          style={{ width: '500px', height: '500px', bottom: '10%', right: '15%' }}
        />
        {/* Subtle Perspective Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
        />
      </div>

      {/* Midground Layer (Badges & Headlines) */}
      <div ref={layerMidRef} className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'inline-block', marginBottom: '20px' }}
        >
          <span className="glass-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={14} color="#c084fc" /> Next-Generation Visual Engine v3.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 1.08,
            marginBottom: '24px',
            color: '#fff',
          }}
        >
          Architecting <span className="gradient-text">Fluid Motion</span> <br />
          & Depth Parallax.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            maxWidth: '720px',
            margin: '0 auto 40px auto',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
        >
          Step into a multi-dimensional digital canvas driven by GPU-accelerated scroll physics, 
          real-time 3D tilt interaction, and glassmorphic micro-animations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            marginBottom: '60px',
          }}
        >
          <button onClick={onExplore} className="btn-magnetic">
            <Play size={18} fill="#fff" />
            Explore Parallax World
          </button>
          <a href="#showcase" className="btn-secondary-outline">
            Interactive Demo
          </a>
        </motion.div>
      </div>

      {/* Foreground Layer (3D Interactive Glass Card Dashboard) */}
      <div
        ref={layerFrontRef}
        className="container"
        style={{
          position: 'relative',
          zIndex: 20,
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <div
          ref={heroCardRef}
          className="glass-card"
          style={{
            padding: '32px',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(0deg) rotateY(0deg)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.25)',
          }}
        >
          {/* Card Window Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '28px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontFamily: 'monospace' }}>
              aetheria-render-pipeline.ts — 60 FPS
            </span>
            <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)' }}>
              <Cpu size={16} />
              <Shield size={16} />
            </div>
          </div>

          {/* Grid Preview inside Hero 3D Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            <div
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.2)' }}>
                  <Layers size={20} color="#c084fc" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>60 FPS Velocity</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Lenis Momentum Scroll</p>
                </div>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)' }} />
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.2)' }}>
                  <Zap size={20} color="#38bdf8" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>GSAP ScrollTrigger</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pinning & Scrub Timelines</p>
                </div>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #06b6d4, #10b981)' }} />
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(236, 72, 153, 0.2)' }}>
                  <Shield size={20} color="#f472b6" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#fff' }}>Spatial Parallax</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mouse Coordinates Tilt</p>
                </div>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '98%', height: '100%', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '30px',
          zIndex: 30,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-subtle)',
          fontSize: '0.8rem',
          cursor: 'pointer',
        }}
        onClick={onExplore}
      >
        <span>SCROLL TO DISCOVER</span>
        <ChevronDown size={18} color="#94a3b8" />
      </motion.div>
    </section>
  );
};
