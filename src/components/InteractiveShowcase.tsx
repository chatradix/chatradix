import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Sparkles, Terminal, Code2, Cpu, CheckCircle2 } from 'lucide-react';

export const InteractiveShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'parallax' | 'shaders' | 'kinetic'>('parallax');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#3b82f6'],
    });
  };

  const tabs = [
    { id: 'parallax', label: '01. Depth Engine', icon: <Cpu size={16} /> },
    { id: 'shaders', label: '02. Glass Shaders', icon: <Sparkles size={16} /> },
    { id: 'kinetic', label: '03. Momentum Physics', icon: <Terminal size={16} /> },
  ];

  return (
    <section id="showcase" className="section-padding" style={{ position: 'relative', zIndex: 10 }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="glass-pill">LIVE INTERACTIVE CONTROL</span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#fff', marginTop: '16px' }}>
            Test the <span className="gradient-text-gold">Parallax Engine</span> Live
          </h2>
          <p style={{ maxWidth: '600px', margin: '16px auto 0', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            Select an architectural pipeline below to preview the active matrix code and visual layer configuration.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background:
                  activeTab === tab.id
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === tab.id ? '#fff' : 'var(--text-muted)',
                border:
                  activeTab === tab.id
                    ? '1px solid rgba(255, 255, 255, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow:
                  activeTab === tab.id ? '0 0 25px rgba(139, 92, 246, 0.4)' : 'none',
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Viewport Box */}
        <div
          className="glass-card"
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '36px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          <AnimatePresence mode="wait">
            {activeTab === 'parallax' && (
              <motion.div
                key="parallax"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '30px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span className="glass-pill" style={{ color: '#38bdf8' }}>
                    SPATIAL MATRIX
                  </span>
                  <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '16px 0 12px' }}>
                    Multi-layered Z-Index Interpolation
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    Calculates separate transform scrub values per layer. Foreground elements move 2.5x faster than background textures, producing true spatial depth.
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} color="#10b981" /> GPU Transform Matrix Scaling
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff', fontSize: '0.9rem' }}>
                      <CheckCircle2 size={16} color="#10b981" /> Custom Spring Damping Physics
                    </li>
                  </ul>
                </div>

                <div
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    padding: '24px',
                    background: '#090d1a',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    color: '#c084fc',
                  }}
                >
                  <div style={{ color: 'var(--text-subtle)', marginBottom: '12px' }}>// GSAP ScrollTrigger Scrub Setup</div>
                  <pre style={{ overflowX: 'auto', lineHeight: 1.5 }}>
{`gsap.timeline({
  scrollTrigger: {
    trigger: "#parallax-hero",
    scrub: 1.2,
    start: "top top"
  }
})
.to(".front-layer", { y: -200 })
.to(".bg-layer", { scale: 1.1 });`}
                  </pre>
                </div>
              </motion.div>
            )}

            {activeTab === 'shaders' && (
              <motion.div
                key="shaders"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '30px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span className="glass-pill" style={{ color: '#f472b6' }}>
                    BACKDROP FILTERS
                  </span>
                  <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '16px 0 12px' }}>
                    Glassmorphic Backdrop Reflections
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    Blends real-time canvas light rays with frosted glass layers using native backdrop filter properties and neon radial gradient masks.
                  </p>
                  <button onClick={triggerConfetti} className="btn-magnetic" style={{ padding: '10px 24px' }}>
                    <Sparkles size={16} />
                    Trigger Confetti FX
                  </button>
                </div>

                <div
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    padding: '24px',
                    background: '#090d1a',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    color: '#38bdf8',
                  }}
                >
                  <div style={{ color: 'var(--text-subtle)', marginBottom: '12px' }}>/* CSS Glassmorphism Utility */</div>
                  <pre style={{ overflowX: 'auto', lineHeight: 1.5 }}>
{`.glass-card {
  background: rgba(13, 17, 39, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 12px 40px rgba(0,0,0,0.5);
}`}
                  </pre>
                </div>
              </motion.div>
            )}

            {activeTab === 'kinetic' && (
              <motion.div
                key="kinetic"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '30px',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span className="glass-pill" style={{ color: '#34d399' }}>
                    INERTIA CURVES
                  </span>
                  <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: '16px 0 12px' }}>
                    Sub-Millisecond Smooth Scroll
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                    Eliminates native browser scroll jitter by interpolating mouse wheel delta events into a continuous ease-out curve.
                  </p>
                  <button onClick={triggerConfetti} className="btn-magnetic" style={{ padding: '10px 24px' }}>
                    <Play size={16} />
                    Run Performance Diagnostic
                  </button>
                </div>

                <div
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    padding: '24px',
                    background: '#090d1a',
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    color: '#34d399',
                  }}
                >
                  <div style={{ color: 'var(--text-subtle)', marginBottom: '12px' }}>// Lenis Smooth Scroll Config</div>
                  <pre style={{ overflowX: 'auto', lineHeight: 1.5 }}>
{`const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});`}
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
