import React, { useEffect, useRef } from 'react';

interface Point3D {
  x0: number;
  y0: number;
  z0: number;
  vx: number;
  vy: number;
  vz: number;
  freqX: number;
  freqY: number;
  freqZ: number;
  amp: number;
  phase: number;
  colorType: 'cyan' | 'green' | 'white';
  size: number;
  isAmbient?: boolean;
}

interface PulseParticle {
  p1: number;
  p2: number;
  progress: number;
  speed: number;
}

export const RevenueGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // Handle Resize with Device Pixel Ratio
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const normY = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
      targetMouseX = normX * 1.2;
      targetMouseY = normY * 0.9;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // ========================================================
    // BUILD PLEXUS 3D POINT CLOUD (CORE AI FIGURE + AMBIENT MESH)
    // ========================================================
    const points: Point3D[] = [];
    const coreCount = 95;
    const ambientCount = 45;

    // 1. Core complex geometric figure (multi-shell morphed geodesic / neural sphere)
    const baseRadius = 240;
    for (let i = 0; i < coreCount; i++) {
      // Golden spiral distribution on sphere for uniform coverage
      const phi = Math.acos(1 - (2 * (i + 0.5)) / coreCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      // Layered shells for depth inside the AI figure
      const shellLayer = 0.65 + ((i % 4) / 3) * 0.55;
      const r = baseRadius * shellLayer;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      points.push({
        x0: x,
        y0: y,
        z0: z,
        vx: 0,
        vy: 0,
        vz: 0,
        freqX: 0.6 + Math.random() * 0.9,
        freqY: 0.7 + Math.random() * 0.8,
        freqZ: 0.5 + Math.random() * 0.9,
        amp: 24 + Math.random() * 32,
        phase: Math.random() * Math.PI * 2,
        colorType: i % 3 === 0 ? 'green' : i % 3 === 1 ? 'cyan' : 'white',
        size: 1.8 + Math.random() * 1.6,
        isAmbient: false,
      });
    }

    // 2. Ambient floating particles spreading across the whole section
    for (let i = 0; i < ambientCount; i++) {
      points.push({
        x0: (Math.random() - 0.5) * 1400,
        y0: (Math.random() - 0.5) * 700,
        z0: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.35,
        freqX: 0.4 + Math.random() * 0.5,
        freqY: 0.4 + Math.random() * 0.5,
        freqZ: 0.4 + Math.random() * 0.5,
        amp: 40 + Math.random() * 50,
        phase: Math.random() * Math.PI * 2,
        colorType: i % 2 === 0 ? 'cyan' : 'green',
        size: 1.2 + Math.random() * 1.4,
        isAmbient: true,
      });
    }

    // Traveling energy pulses between nodes
    const pulses: PulseParticle[] = [];
    for (let i = 0; i < 18; i++) {
      pulses.push({
        p1: Math.floor(Math.random() * coreCount),
        p2: Math.floor(Math.random() * coreCount),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.014,
      });
    }

    let time = 0;
    let rotX = 0.2;
    let rotY = 0;
    let rotZ = 0.1;

    // 3D Rotation helper
    const rotate3D = (
      x: number,
      y: number,
      z: number,
      rx: number,
      ry: number,
      rz: number
    ) => {
      // Y-axis rotation
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // X-axis rotation
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Z-axis rotation
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);
      const x3 = x1 * cosZ - y2 * sinZ;
      const y3 = x1 * sinZ + y2 * cosZ;

      return { x: x3, y: y3, z: z2 };
    };

    // Main animation loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Continuous 3D rotation with organic speed variance
      rotY += 0.0035;
      rotX = 0.25 + Math.sin(time * 0.25) * 0.12;
      rotZ = 0.15 + Math.cos(time * 0.3) * 0.08;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const currentRotX = rotX + mouseY;
      const currentRotY = rotY + mouseX;
      const currentRotZ = rotZ;

      ctx.clearRect(0, 0, width, height);

      // Center of the plexus figure
      // On desktop, position comfortably in the right-center area while covering whole section
      const isDesktop = width >= 1024;
      const originX = isDesktop ? width * 0.62 : width * 0.5;
      const originY = height * 0.5;
      const focalLength = 650;

      // 1. Calculate projected 2D coordinates for all 3D points
      const projected: {
        x: number;
        y: number;
        z: number;
        scale: number;
        pt: Point3D;
      }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Morphing oscillation simulating AI self-education / dynamic figure transformation
        const morphX = Math.sin(time * p.freqX + p.phase) * p.amp;
        const morphY = Math.cos(time * p.freqY + p.phase) * p.amp;
        const morphZ = Math.sin(time * p.freqZ + p.phase) * p.amp;

        // If ambient, add slow drift
        if (p.isAmbient) {
          p.x0 += p.vx;
          p.y0 += p.vy;
          p.z0 += p.vz;
          if (Math.abs(p.x0) > 750) p.vx *= -1;
          if (Math.abs(p.y0) > 400) p.vy *= -1;
          if (Math.abs(p.z0) > 300) p.vz *= -1;
        }

        const curX = p.x0 + morphX;
        const curY = p.y0 + morphY;
        const curZ = p.z0 + morphZ;

        // Apply 3D Rotation
        const rotated = rotate3D(
          curX,
          curY,
          curZ,
          currentRotX,
          currentRotY,
          currentRotZ
        );

        // Perspective Projection
        const zDist = rotated.z + 550;
        const scale = focalLength / Math.max(120, zDist);
        const projX = originX + rotated.x * scale;
        const projY = originY + rotated.y * scale;

        projected.push({
          x: projX,
          y: projY,
          z: rotated.z,
          scale,
          pt: p,
        });
      }

      // ========================================================
      // 2. DRAW TRIANGULAR FACETS (POLYGONAL AI MESH SURFACES)
      // ========================================================
      // To create that stunning crystal/polyhedral AI figure, connect triples
      const maxTriangleDist = 95;
      ctx.save();
      for (let i = 0; i < coreCount; i += 2) {
        for (let j = i + 1; j < coreCount; j += 2) {
          const pi = projected[i];
          const pj = projected[j];
          const dx1 = pi.x - pj.x;
          const dy1 = pi.y - pj.y;
          const d1 = Math.hypot(dx1, dy1);

          if (d1 < maxTriangleDist) {
            for (let k = j + 1; k < coreCount; k += 3) {
              const pk = projected[k];
              const dx2 = pj.x - pk.x;
              const dy2 = pj.y - pk.y;
              const d2 = Math.hypot(dx2, dy2);

              if (d2 < maxTriangleDist) {
                const dx3 = pk.x - pi.x;
                const dy3 = pk.y - pi.y;
                const d3 = Math.hypot(dx3, dy3);

                if (d3 < maxTriangleDist) {
                  // Draw subtle translucent facet
                  const avgZ = (pi.z + pj.z + pk.z) / 3;
                  const depthAlpha = Math.max(
                    0.015,
                    Math.min(0.09, (avgZ + 250) / 7000)
                  );

                  ctx.beginPath();
                  ctx.moveTo(pi.x, pi.y);
                  ctx.lineTo(pj.x, pj.y);
                  ctx.lineTo(pk.x, pk.y);
                  ctx.closePath();

                  // Subtle gradient between blue and green
                  if ((i + j + k) % 2 === 0) {
                    ctx.fillStyle = `rgba(0, 128, 251, ${depthAlpha * 1.5})`;
                  } else {
                    ctx.fillStyle = `rgba(37, 211, 102, ${depthAlpha * 1.2})`;
                  }
                  ctx.fill();
                }
              }
            }
          }
        }
      }
      ctx.restore();

      // ========================================================
      // 3. DRAW CONNECTED PLEXUS LINES
      // ========================================================
      const maxDistCore = 125;
      const maxDistAmbient = 140;

      ctx.save();
      ctx.lineWidth = 1;

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];

        // Check proximity with nearby points
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const maxD =
            p1.pt.isAmbient || p2.pt.isAmbient ? maxDistAmbient : maxDistCore;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxD) {
            const alpha = Math.pow(1 - dist / maxD, 1.6);
            const depthFactor = Math.max(
              0.15,
              Math.min(1, ((p1.z + p2.z) / 2 + 250) / 500)
            );
            const lineOpacity = alpha * depthFactor * 0.45;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (p1.pt.colorType === 'green' || p2.pt.colorType === 'green') {
              ctx.strokeStyle = `rgba(37, 211, 102, ${lineOpacity})`;
            } else {
              ctx.strokeStyle = `rgba(0, 128, 251, ${lineOpacity})`;
            }

            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // ========================================================
      // 4. DRAW TRAVELING ENERGY PULSES
      // ========================================================
      ctx.save();
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.p1 = Math.floor(Math.random() * coreCount);
          pulse.p2 = Math.floor(Math.random() * coreCount);
        }

        const p1 = projected[pulse.p1];
        const p2 = projected[pulse.p2];
        if (p1 && p2) {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < maxDistCore * 1.2) {
            const px = p1.x + (p2.x - p1.x) * pulse.progress;
            const py = p1.y + (p2.y - p1.y) * pulse.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#25D366';
            ctx.shadowBlur = 10;
            ctx.fill();
          }
        }
      });
      ctx.restore();

      // ========================================================
      // 5. DRAW GLOWING NODES (DOTS)
      // ========================================================
      ctx.save();
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depthAlpha = Math.max(0.2, Math.min(1, (p.z + 300) / 600));
        const nodeRadius = Math.max(0.8, p.pt.size * p.scale);

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);

        if (p.pt.colorType === 'green') {
          ctx.fillStyle = `rgba(37, 211, 102, ${depthAlpha * 0.95})`;
          if (p.z > 50) {
            ctx.shadowColor = '#25D366';
            ctx.shadowBlur = 8;
          } else {
            ctx.shadowBlur = 0;
          }
        } else if (p.pt.colorType === 'cyan') {
          ctx.fillStyle = `rgba(56, 189, 248, ${depthAlpha * 0.95})`;
          if (p.z > 50) {
            ctx.shadowColor = '#0080FB';
            ctx.shadowBlur = 8;
          } else {
            ctx.shadowBlur = 0;
          }
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.85})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Pulsing halo on prominent front nodes
        if (!p.pt.isAmbient && i % 8 === 0 && p.z > 0) {
          const haloPulse = (Math.sin(time * 3 + i) + 1) / 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius + 3 + haloPulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(37, 211, 102, ${0.15 + haloPulse * 0.25})`;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
      ctx.restore();

      // Subtle ambient cyber vignette on the left edge for maximum text readability
      ctx.save();
      const vignette = ctx.createLinearGradient(0, 0, width * 0.45, 0);
      vignette.addColorStop(0, 'rgba(14, 14, 14, 0.7)');
      vignette.addColorStop(1, 'rgba(14, 14, 14, 0)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width * 0.45, height);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
};
