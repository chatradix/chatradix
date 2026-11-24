import React, { useEffect, useRef } from 'react';

interface Milestone {
  fraction: number; // 0 to 1 along chart X
  label: string;
  badge: string;
  isHero?: boolean;
}

interface Photon {
  progress: number;
  speed: number;
  lineIndex: number;
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

    let mouseX = -9999;
    let mouseY = -9999;
    let isHovering = false;

    // Handle Resize with Device Pixel Ratio for razor-sharp rendering
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
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    };

    const handleMouseLeave = () => {
      isHovering = false;
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Pause when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Milestones pinned to primary upward trend
    const milestones: Milestone[] = [
      { fraction: 0.18, label: '30D ONBOARD', badge: '+42% BASELINE' },
      { fraction: 0.42, label: 'CART RECOVERY', badge: '+184% REVENUE' },
      { fraction: 0.70, label: 'COD 2-WAY SYNC', badge: '+290% CONV' },
      { fraction: 0.92, label: 'SCALE AUTOMATION', badge: '+380% ROAS', isHero: true },
    ];

    // Flowing photons racing along trendlines
    const photons: Photon[] = [];
    for (let i = 0; i < 9; i++) {
      photons.push({
        progress: Math.random(),
        speed: 0.0018 + Math.random() * 0.0022,
        lineIndex: i % 2, // 0 = main green line, 1 = cyan secondary
        size: 2 + Math.random() * 2,
      });
    }

    // Chart curve mathematical functions
    // Primary curve: exponential acceleration simulating surging revenue
    const getPrimaryY = (normX: number, t: number, chartH: number, baselineY: number) => {
      const progress = Math.pow(normX, 1.45);
      const wave = Math.sin(normX * 8 + t * 1.5) * 8 + Math.cos(normX * 14 - t * 2) * 5;
      const lift = chartH * 0.78 * progress;
      return baselineY - lift + wave;
    };

    // Secondary curve: traditional linear marketing baseline
    const getSecondaryY = (normX: number, t: number, chartH: number, baselineY: number) => {
      const progress = Math.pow(normX, 1.05);
      const wave = Math.sin(normX * 6 + t * 1.1) * 6;
      const lift = chartH * 0.38 * progress;
      return baselineY - lift + wave;
    };

    // Tertiary accent curve: abandoned cart recovery wave
    const getTertiaryY = (normX: number, t: number, chartH: number, baselineY: number) => {
      const progress = Math.pow(normX, 1.25);
      const wave = Math.cos(normX * 10 + t * 1.8) * 10;
      const lift = chartH * 0.58 * progress;
      return baselineY - lift + wave;
    };

    // -------------------------------------------------------------
    // RENDER LOOP
    // -------------------------------------------------------------
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;

      // Chart bounding box in canvas coordinates
      const chartLeft = isMobile ? width * 0.05 : width * 0.32;
      const chartRight = width * (isMobile ? 0.95 : 0.96);
      const chartWidth = chartRight - chartLeft;
      const chartTop = height * (isMobile ? 0.08 : 0.12);
      const chartBottom = height * (isMobile ? 0.90 : 0.86);
      const chartHeight = chartBottom - chartTop;

      // -------------------------------------------------------------
      // 1. TECHNICAL FINANCIAL GRID & VALUE SCALES
      // -------------------------------------------------------------
      ctx.save();
      const gridRows = 5;
      const yLabels = ['$250,000', '$150,000', '$75,000', '$25,000', '$0'];

      for (let i = 0; i < gridRows; i++) {
        const y = chartTop + (chartHeight / (gridRows - 1)) * i;

        ctx.beginPath();
        ctx.strokeStyle = i === gridRows - 1 ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 1;
        if (i < gridRows - 1) {
          ctx.setLineDash([4, 6]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.moveTo(chartLeft, y);
        ctx.lineTo(chartRight, y);
        ctx.stroke();

        // Technical currency metric on the right
        if (!isMobile) {
          ctx.fillStyle = 'rgba(136, 136, 136, 0.45)';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.textAlign = 'right';
          ctx.fillText(yLabels[i], chartRight + 2, y - 5);
        }
      }

      // Vertical timeline grid bars
      const gridCols = isMobile ? 4 : 7;
      const xLabels = ['DAY 0', 'WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'SCALE', 'META v20'];

      for (let j = 0; j < gridCols; j++) {
        const x = chartLeft + (chartWidth / (gridCols - 1)) * j;

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.moveTo(x, chartTop);
        ctx.lineTo(x, chartBottom);
        ctx.stroke();

        if (!isMobile && j < xLabels.length) {
          ctx.fillStyle = 'rgba(136, 136, 136, 0.35)';
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillText(xLabels[j], x, chartBottom + 16);
        }
      }
      ctx.restore();

      // Sample points along the width
      const numSamples = isMobile ? 45 : 75;

      // -------------------------------------------------------------
      // 2. SECONDARY BASELINE AREA & TRENDLINE (Cyan / Legacy email)
      // -------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(chartLeft, chartBottom);

      for (let s = 0; s <= numSamples; s++) {
        const normX = s / numSamples;
        const x = chartLeft + normX * chartWidth;
        const y = getSecondaryY(normX, time, chartHeight, chartBottom);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(chartRight, chartBottom);
      ctx.closePath();

      const secFill = ctx.createLinearGradient(0, chartTop, 0, chartBottom);
      secFill.addColorStop(0, 'rgba(0, 128, 251, 0.12)');
      secFill.addColorStop(1, 'rgba(0, 128, 251, 0.0)');
      ctx.fillStyle = secFill;
      ctx.fill();

      // Stroke secondary line
      ctx.beginPath();
      for (let s = 0; s <= numSamples; s++) {
        const normX = s / numSamples;
        const x = chartLeft + normX * chartWidth;
        const y = getSecondaryY(normX, time, chartHeight, chartBottom);
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(0, 128, 251, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // 3. TERTIARY ACCENT TRENDLINE (Electric Blue / Recovery flows)
      // -------------------------------------------------------------
      ctx.save();
      ctx.beginPath();
      for (let s = 0; s <= numSamples; s++) {
        const normX = s / numSamples;
        const x = chartLeft + normX * chartWidth;
        const y = getTertiaryY(normX, time, chartHeight, chartBottom);
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // 4. PRIMARY SURGING REVENUE TRENDLINE & NEON GLOW (Green)
      // -------------------------------------------------------------
      ctx.save();

      // Area fill underneath primary line
      ctx.beginPath();
      ctx.moveTo(chartLeft, chartBottom);

      for (let s = 0; s <= numSamples; s++) {
        const normX = s / numSamples;
        const x = chartLeft + normX * chartWidth;
        const y = getPrimaryY(normX, time, chartHeight, chartBottom);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(chartRight, chartBottom);
      ctx.closePath();

      const primeFill = ctx.createLinearGradient(0, chartTop * 0.8, 0, chartBottom);
      primeFill.addColorStop(0, 'rgba(37, 211, 102, 0.22)');
      primeFill.addColorStop(0.5, 'rgba(37, 211, 102, 0.08)');
      primeFill.addColorStop(1, 'rgba(37, 211, 102, 0.0)');
      ctx.fillStyle = primeFill;
      ctx.fill();

      // Primary stroke with intense bloom glow
      ctx.beginPath();
      for (let s = 0; s <= numSamples; s++) {
        const normX = s / numSamples;
        const x = chartLeft + normX * chartWidth;
        const y = getPrimaryY(normX, time, chartHeight, chartBottom);
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.strokeStyle = '#25D366';
      ctx.lineWidth = 2.8;
      ctx.shadowColor = '#25D366';
      ctx.shadowBlur = 14;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.restore();

      // -------------------------------------------------------------
      // 5. PHOTON ENERGY PULSES STREAMING ALONG THE TRENDLINES
      // -------------------------------------------------------------
      ctx.save();
      for (let i = 0; i < photons.length; i++) {
        const p = photons[i];
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const x = chartLeft + p.progress * chartWidth;
        const y =
          p.lineIndex === 0
            ? getPrimaryY(p.progress, time, chartHeight, chartBottom)
            : getSecondaryY(p.progress, time, chartHeight, chartBottom);

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.lineIndex === 0 ? '#66FF8E' : '#38BDF8';
        ctx.shadowColor = p.lineIndex === 0 ? '#25D366' : '#0080FB';
        ctx.shadowBlur = 12;
        ctx.fill();
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 6. MILESTONE NODES & FLOATING METRIC BADGES
      // -------------------------------------------------------------
      ctx.save();
      for (let m = 0; m < milestones.length; m++) {
        const ms = milestones[m];
        const x = chartLeft + ms.fraction * chartWidth;
        const y = getPrimaryY(ms.fraction, time, chartHeight, chartBottom);

        // Vertical laser drop line to baseline
        ctx.beginPath();
        ctx.strokeStyle = ms.isHero ? 'rgba(37, 211, 102, 0.45)' : 'rgba(37, 211, 102, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);
        ctx.moveTo(x, y);
        ctx.lineTo(x, chartBottom);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated pulsing concentric ring on milestone node
        const pulse = (Math.sin(time * 3.5 + m * 1.5) + 1) / 2;
        ctx.beginPath();
        ctx.arc(x, y, 4 + pulse * 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(37, 211, 102, ${0.4 - pulse * 0.3})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Core solid vertex node
        ctx.beginPath();
        ctx.arc(x, y, ms.isHero ? 4.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#25D366';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Floating pill badge above the milestone node (skip small screens if crowded)
        if (!isMobile || ms.isHero) {
          const badgeY = y - (ms.isHero ? 36 : 28);
          const badgeText = ms.badge;
          ctx.font = 'bold 10px "JetBrains Mono", monospace';
          const textWidth = ctx.measureText(badgeText).width;
          const padX = 8;
          const padY = 5;
          const badgeW = textWidth + padX * 2;
          const badgeH = 20;

          // Badge background
          ctx.beginPath();
          ctx.fillStyle = ms.isHero ? 'rgba(14, 28, 18, 0.92)' : 'rgba(10, 16, 26, 0.88)';
          ctx.strokeStyle = ms.isHero ? '#25D366' : 'rgba(56, 189, 248, 0.6)';
          ctx.lineWidth = 1;
          ctx.roundRect(x - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 4);
          ctx.fill();
          ctx.stroke();

          // Badge text
          ctx.fillStyle = ms.isHero ? '#25D366' : '#e5e2e1';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(badgeText, x, badgeY);

          // Sub-label below badge
          if (!isMobile) {
            ctx.fillStyle = 'rgba(136, 136, 136, 0.7)';
            ctx.font = '8px "JetBrains Mono", monospace';
            ctx.fillText(ms.label, x, badgeY - 14);
          }
        }
      }
      ctx.restore();

      // -------------------------------------------------------------
      // 7. INTERACTIVE MOUSE CROSSHAIR & LIVE SCRUBBER TOOLTIP
      // -------------------------------------------------------------
      if (isHovering && mouseX >= chartLeft && mouseX <= chartRight) {
        ctx.save();
        const cursorNormX = (mouseX - chartLeft) / chartWidth;
        const cursorPrimeY = getPrimaryY(cursorNormX, time, chartHeight, chartBottom);

        // Vertical laser crosshair line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(37, 211, 102, 0.65)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.moveTo(mouseX, chartTop);
        ctx.lineTo(mouseX, chartBottom);
        ctx.stroke();
        ctx.setLineDash([]);

        // Glowing cursor marker on primary curve
        ctx.beginPath();
        ctx.arc(mouseX, cursorPrimeY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#25D366';
        ctx.shadowColor = '#25D366';
        ctx.shadowBlur = 14;
        ctx.fill();

        // Live revenue calculation based on scrubber position
        const dynamicRev = Math.floor(18000 + Math.pow(cursorNormX, 1.45) * 232000);
        const dynamicRoas = (2.2 + cursorNormX * 3.8).toFixed(1);

        // HUD Tooltip Box
        const tipW = 140;
        const tipH = 50;
        const tipX = Math.min(chartRight - tipW, Math.max(chartLeft, mouseX + 12));
        const tipY = Math.max(chartTop, cursorPrimeY - tipH - 12);

        ctx.fillStyle = 'rgba(10, 14, 18, 0.94)';
        ctx.strokeStyle = '#25D366';
        ctx.lineWidth = 1;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(tipX, tipY, tipW, tipH, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#25D366';
        ctx.font = 'bold 12px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(`$${dynamicRev.toLocaleString()} MRR`, tipX + 10, tipY + 9);

        ctx.fillStyle = '#888888';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillText(`ROAS: ${dynamicRoas}x // META CLOUD`, tipX + 10, tipY + 28);

        ctx.restore();
      }

      // -------------------------------------------------------------
      // 8. LEFT VIGNETTE GRADIENT (Guarantees 100% typography contrast)
      // -------------------------------------------------------------
      ctx.save();
      const vignette = ctx.createLinearGradient(0, 0, width * (isMobile ? 0.95 : 0.48), 0);
      vignette.addColorStop(0, 'rgba(14, 14, 14, 0.96)');
      vignette.addColorStop(0.6, 'rgba(14, 14, 14, 0.65)');
      vignette.addColorStop(1, 'rgba(14, 14, 14, 0)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width * (isMobile ? 0.95 : 0.48), height);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
