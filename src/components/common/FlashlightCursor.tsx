import React, { useState, useEffect } from 'react';

interface FlashlightCursorProps {
  nightMode: boolean;
}

export const FlashlightCursor: React.FC<FlashlightCursorProps> = ({ nightMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!nightMode || isTouch) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(27, 18, 34, 0.95) 100%)`,
      }}
    />
  );
};
