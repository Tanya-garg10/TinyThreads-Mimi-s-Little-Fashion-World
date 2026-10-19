import React, { useEffect, useState } from 'react';

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const CursorSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<SparkleItem[]>([]);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const colors = ['#F5D88B', '#F7DDE5', '#A34063', '#DCE8D7', '#E8DFF5'];
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      // Throttle to every 65ms
      if (now - lastTime < 65) return;
      lastTime = now;

      const newSparkle: SparkleItem = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY + window.scrollY,
        size: Math.floor(Math.random() * 8) + 6,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setSparkles((prev) => [...prev.slice(-12), newSparkle]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up expired sparkles every second
    const interval = setInterval(() => {
      setSparkles((prev) => (prev.length > 0 ? prev.slice(1) : prev));
    }, 400);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute animate-ping"
          style={{
            left: s.x - s.size / 2,
            top: s.y - window.scrollY - s.size / 2,
            fontSize: `${s.size}px`,
            color: s.color,
            lineHeight: 1
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
};
