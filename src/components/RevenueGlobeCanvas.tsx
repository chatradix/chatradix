import React, { useEffect, useRef } from 'react';

interface GridPulse {
  col: number;
  rowProgress: number;
  speed: number;
  color: string;
  size: number;
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
    let time = 0;

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
      targetMouseX = normX;
      targetMouseY = normY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Pause animation when section is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // -------------------------------------------------------------
    // 3D SURFACE & GRAPH GRID CONFIGURATION
    // -------------------------------------------------------------
    // Columns (X width) and Rows (Z depth)
    const COLS = 32;
    const ROWS = 28;

    // Data pulses travelling along the surface grid lines
    const pulses: GridPulse[] = [];
    const pulseCount = 8;
    const colors = ['#25D366', '#0080FB', '#38BDF8', '#66FF8E'];

    for (let i = 0; i < pulseCount; i++) {
      pulses.push({
        col: Math.floor(Math.random() * COLS),
        rowProgress: Math.random() * ROWS,
        speed: 0.08 + Math.random() * 0.12,
        color: colors[i % colors.length],
        size: 2 + Math.random() * 2,
      });
    }

    // -------------------------------------------------------------
    // RENDER LOOP
    // -------------------------------------------------------------
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Camera & Spatial Framing: Position the 3D grid towards center-right to frame the text
      const isMobile = width < 768;
      const originX = width * (isMobile ? 0.5 : 0.62);
      const originY = height * 0.58;

      // Camera view angles
      const pitch = 0.95 + mouseY * 0.25; // Viewing from elevated perspective
      const yaw = -0.35 + mouseX * 0.35;   // Subtle isometric angle

      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      const fov = isMobile ? 320 : 460;

      // Grid dimensions in world units
      const gridWidth = isMobile ? 650 : 1050;
      const gridDepth = isMobile ? 700 : 1000;
      const stepX = gridWidth / (COLS - 1);
      const stepZ = gridDepth / (ROWS - 1);

      // Compute and project 3D points
      interface ScreenPoint {
        sx: number;
        sy: number;
        sz: number;
        rawY: number;
        visible: boolean;
        col: number;
        row: number;
      }

      const grid: ScreenPoint[][] = [];

      for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        const zRel = (r / (ROWS - 1) - 0.5) * gridDepth;

        for (let c = 0; c < COLS; c++) {
          const xRel = (c / (COLS - 1) - 0.5) * gridWidth;

          // Undulating graph wave height function (composite harmonics + revenue trend curve)
          const normC = c / COLS;
          const normR = r / ROWS;

          // Harmonic waves
          const wave1 = Math.sin(normC * 7.5 + time * 1.6 + normR * 3.2) * 38;
          const wave2 = Math.cos(normR * 6.0 - time * 1.2 + normC * 2.8) * 28;
          const wave3 = Math.sin((normC + normR) * 9.0 + time * 2.2) * 16;

          // Upward revenue trend peak towards back-right
          const trendRidge = Math.pow(normC * 0.85 + normR * 0.45, 2.2) * 75;

          // Interactive swell from cursor position
          const mouseDist = Math.hypot(normC - (mouseX + 0.5), normR - (mouseY + 0.5));
          const interactiveSwell = Math.max(0, 1 - mouseDist * 3.2) * 55;

          const elevation = -(wave1 + wave2 + wave3 + trendRidge + interactiveSwell);

          // 3D Rotation (Yaw then Pitch)
          const xRot = xRel * cosY - zRel * sinY;
          const zTemp = xRel * sinY + zRel * cosY;

          const yRot = elevation * cosP - zTemp * sinP;
          const zRot = elevation * sinP + zTemp * cosP + (isMobile ? 550 : 700);

          if (zRot <= 20) {
            grid[r][c] = { sx: 0, sy: 0, sz: zRot, rawY: elevation, visible: false, col: c, row: r };
            continue;
          }

          const scale = fov / zRot;
          const sx = originX + xRot * scale;
          const sy = originY + yRot * scale;

          grid[r][c] = {
            sx,
            sy,
            sz: zRot,
            rawY: elevation,
            visible: sx >= -80 && sx <= width + 80 && sy >= -80 && sy <= height + 80,
            col: c,
            row: r,
          };
        }
      }

      // -------------------------------------------------------------
      // 1. DRAW SURFACE QUAD MESHES (Subtle glowing cyber polygons)
      // -------------------------------------------------------------
      ctx.save();
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          const p3 = grid[r + 1][c + 1];
          const p4 = grid[r + 1][c];

          if (!p1.visible && !p2.visible && !p3.visible && !p4.visible) continue;

          const avgZ = (p1.sz + p2.sz + p3.sz + p4.sz) / 4;
          const depthAlpha = Math.max(0.015, Math.min(0.12, 1 - (avgZ - 250) / 950));
          const avgElev = (p1.rawY + p2.rawY + p3.rawY + p4.rawY) / 4;

          // Higher elevation quads glow with emerald green; lower with deep signal blue
          const isHighPeak = avgElev < -60;
          const fillColor = isHighPeak
            ? `rgba(37, 211, 102, ${depthAlpha * 1.5})`
            : `rgba(0, 128, 251, ${depthAlpha * 0.9})`;

          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.lineTo(p3.sx, p3.sy);
          ctx.lineTo(p4.sx, p4.sy);
          ctx.closePath();
          ctx.fillStyle = fillColor;
          ctx.fill();
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 2. DRAW GRAPH GRID LINES (LATERAL & LONGITUDINAL)
      // -------------------------------------------------------------
      ctx.save();

      // Row lines (Lateral cross sections)
      for (let r = 0; r < ROWS; r++) {
        ctx.beginPath();
        let started = false;

        for (let c = 0; c < COLS; c++) {
          const pt = grid[r][c];
          if (!pt.visible) continue;

          if (!started) {
            ctx.moveTo(pt.sx, pt.sy);
            started = true;
          } else {
            ctx.lineTo(pt.sx, pt.sy);
          }
        }

        if (started) {
          const depthRatio = 1 - r / ROWS;
          const alpha = Math.max(0.06, Math.min(0.48, depthRatio * 0.55));
          const isAccentRow = r % 4 === 0;

          ctx.strokeStyle = isAccentRow
            ? `rgba(56, 189, 248, ${alpha * 1.4})`
            : `rgba(37, 211, 102, ${alpha})`;
          ctx.lineWidth = isAccentRow ? 1.3 : 0.85;
          ctx.stroke();
        }
      }

      // Column lines (Longitudinal depth lines)
      for (let c = 0; c < COLS; c++) {
        ctx.beginPath();
        let started = false;

        for (let r = 0; r < ROWS; r++) {
          const pt = grid[r][c];
          if (!pt.visible) continue;

          if (!started) {
            ctx.moveTo(pt.sx, pt.sy);
            started = true;
          } else {
            ctx.lineTo(pt.sx, pt.sy);
          }
        }

        if (started) {
          const isAccentCol = c % 4 === 0;
          const alpha = isAccentCol ? 0.35 : 0.16;
          ctx.strokeStyle = isAccentCol
            ? `rgba(0, 128, 251, ${alpha * 1.3})`
            : `rgba(38, 38, 38, ${alpha * 2})`;
          ctx.lineWidth = isAccentCol ? 1.2 : 0.75;
          ctx.stroke();
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 3. VERTICAL GRAPH BARS & DROP LINES (Fintech / Growth markers)
      // -------------------------------------------------------------
      ctx.save();
      for (let r = 2; r < ROWS - 2; r += 3) {
        for (let c = 3; c < COLS - 2; c += 4) {
          const pt = grid[r][c];
          if (!pt.visible) continue;

          // Drop line to baseline
          if (pt.rawY < -45) {
            const dropAlpha = Math.min(0.35, Math.abs(pt.rawY) / 120);
            ctx.beginPath();
            ctx.setLineDash([2, 3]);
            ctx.moveTo(pt.sx, pt.sy);
            ctx.lineTo(pt.sx, pt.sy + Math.abs(pt.rawY) * 0.65);
            ctx.strokeStyle = `rgba(37, 211, 102, ${dropAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 4. DATA PULSES (Flowing signals racing along grid tracks)
      // -------------------------------------------------------------
      ctx.save();
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.rowProgress += p.speed;

        if (p.rowProgress >= ROWS - 1) {
          p.rowProgress = 0;
          p.col = Math.floor(Math.random() * COLS);
          p.speed = 0.08 + Math.random() * 0.12;
        }

        const r0 = Math.floor(p.rowProgress);
        const r1 = Math.min(ROWS - 1, r0 + 1);
        const frac = p.rowProgress - r0;

        const pt0 = grid[r0]?.[p.col];
        const pt1 = grid[r1]?.[p.col];

        if (pt0 && pt1 && pt0.visible && pt1.visible) {
          const curX = pt0.sx + (pt1.sx - pt0.sx) * frac;
          const curY = pt0.sy + (pt1.sy - pt0.sy) * frac;

          ctx.beginPath();
          ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();

          // Tail
          ctx.beginPath();
          ctx.moveTo(curX, curY);
          ctx.lineTo(pt0.sx, pt0.sy);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size * 0.8;
          ctx.stroke();
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 5. GLOWING VERTEX NODES AT KEY INTERSECTIONS
      // -------------------------------------------------------------
      ctx.save();
      for (let r = 0; r < ROWS; r += 2) {
        for (let c = 0; c < COLS; c += 2) {
          const pt = grid[r][c];
          if (!pt.visible) continue;

          const isPeak = pt.rawY < -55;
          const isAccent = (r % 4 === 0 && c % 4 === 0) || isPeak;

          if (!isAccent) continue;

          const nodeAlpha = Math.max(0.2, Math.min(0.9, 1 - (pt.sz - 300) / 900));
          const nodeRadius = isPeak ? 2.5 : 1.5;

          ctx.beginPath();
          ctx.arc(pt.sx, pt.sy, nodeRadius, 0, Math.PI * 2);

          if (isPeak) {
            ctx.fillStyle = `rgba(37, 211, 102, ${nodeAlpha})`;
            ctx.shadowColor = '#25D366';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(56, 189, 248, ${nodeAlpha * 0.85})`;
            ctx.shadowColor = '#0080FB';
            ctx.shadowBlur = 5;
          }
          ctx.fill();
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 6. LEFT VIGNETTE GRADIENT (Guarantees 100% typography contrast)
      // -------------------------------------------------------------
      ctx.save();
      const vignette = ctx.createLinearGradient(0, 0, width * (isMobile ? 0.95 : 0.58), 0);
      vignette.addColorStop(0, 'rgba(14, 14, 14, 0.95)');
      vignette.addColorStop(0.55, 'rgba(14, 14, 14, 0.7)');
      vignette.addColorStop(1, 'rgba(14, 14, 14, 0)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width * (isMobile ? 0.95 : 0.58), height);
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
