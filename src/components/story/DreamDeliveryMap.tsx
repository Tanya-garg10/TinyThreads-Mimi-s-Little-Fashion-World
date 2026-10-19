import React, { useEffect, useRef, useState } from 'react';

interface DreamDeliveryMapProps {
  nightMode: boolean;
}

export const DreamDeliveryMap: React.FC<DreamDeliveryMapProps> = ({ nightMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = rect.height;

      // Calculate scroll progress (0 to 1)
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + containerHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathLength = 1000; // Approximate path length

  return (
    <div
      ref={containerRef}
      className={`w-full py-12 px-4 rounded-3xl border-3 overflow-hidden ${
        nightMode
          ? 'bg-[#1B1222] border-[#5E3B7A]'
          : 'bg-[#FFF8F1] border-[#5C4033]'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h3
          className={`text-2xl font-serif font-bold text-center mb-8 ${
            nightMode ? 'text-[#F3E8FF]' : 'text-[#5C4033]'
          }`}
        >
          🌙 Dream Delivery Journey
        </h3>

        <div className="relative w-full aspect-[16/9] max-h-[400px]">
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background stars (night mode) */}
            {nightMode && (
              <>
                <circle cx="100" cy="80" r="2" fill="#F5D88B" opacity="0.6" />
                <circle cx="200" cy="150" r="1.5" fill="#F5D88B" opacity="0.4" />
                <circle cx="300" cy="50" r="2" fill="#F5D88B" opacity="0.5" />
                <circle cx="500" cy="100" r="1.5" fill="#F5D88B" opacity="0.6" />
                <circle cx="600" cy="180" r="2" fill="#F5D88B" opacity="0.4" />
                <circle cx="700" cy="80" r="1.5" fill="#F5D88B" opacity="0.5" />
                <circle cx="400" cy="200" r="2" fill="#F5D88B" opacity="0.6" />
              </>
            )}

            {/* Simple map background */}
            <rect
              x="0"
              y="0"
              width="800"
              height="450"
              fill={nightMode ? '#1B1222' : '#F7DDE5'}
            />

            {/* Dream locations */}
            <circle cx="100" cy="350" r="20" fill="#A34063" opacity="0.3" />
            <text x="100" y="355" textAnchor="middle" fill="#5C4033" fontSize="12" fontWeight="bold">
              Mimi's Atelier
            </text>

            <circle cx="400" cy="100" r="20" fill="#A34063" opacity="0.3" />
            <text x="400" y="105" textAnchor="middle" fill="#5C4033" fontSize="12" fontWeight="bold">
              Cloud Kingdom
            </text>

            <circle cx="700" cy="350" r="20" fill="#A34063" opacity="0.3" />
            <text x="700" y="355" textAnchor="middle" fill="#5C4033" fontSize="12" fontWeight="bold">
              Baby's Nursery
            </text>

            {/* Dream delivery path */}
            <path
              d="M 100 350 Q 250 200 400 100 Q 550 200 700 350"
              stroke={nightMode ? '#7B2846' : '#EABAC8'}
              strokeWidth="4"
              fill="none"
              strokeDasharray="8 4"
              opacity="0.5"
            />

            {/* Animated path (progress based on scroll) */}
            <path
              d="M 100 350 Q 250 200 400 100 Q 550 200 700 350"
              stroke="#A34063"
              strokeWidth="4"
              fill="none"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - scrollProgress)}
              strokeLinecap="round"
              className="transition-all duration-300"
            />

            {/* Mimi character on the path */}
            <g
              transform={`translate(${100 + (600 * scrollProgress)}, ${350 - (250 * Math.sin(scrollProgress * Math.PI))})`}
              className="transition-all duration-300"
            >
              {/* Mimi body */}
              <circle cx="0" cy="0" r="15" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2" />
              {/* Mimi ears */}
              <ellipse cx="-8" cy="-12" rx="4" ry="10" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1.5" />
              <ellipse cx="8" cy="-12" rx="4" ry="10" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1.5" />
              {/* Mimi eyes */}
              <circle cx="-4" cy="-2" r="2" fill="#5C4033" />
              <circle cx="4" cy="-2" r="2" fill="#5C4033" />
              {/* Mimi smile */}
              <path d="M -2 4 Q 0 6 2 4" stroke="#A34063" strokeWidth="1.5" fill="none" />
            </g>

            {/* Dream parcels along the path */}
            {scrollProgress > 0.2 && (
              <g transform="translate(250, 200)">
                <rect x="-10" y="-10" width="20" height="20" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" rx="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="12">📦</text>
              </g>
            )}

            {scrollProgress > 0.5 && (
              <g transform="translate(550, 200)">
                <rect x="-10" y="-10" width="20" height="20" fill="#F7DDE5" stroke="#5C4033" strokeWidth="2" rx="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="12">🎁</text>
              </g>
            )}

            {/* Completion message */}
            {scrollProgress > 0.9 && (
              <text
                x="400"
                y="420"
                textAnchor="middle"
                fill="#A34063"
                fontSize="16"
                fontWeight="bold"
                className="animate-pulse"
              >
                Dreams Delivered! ✨
              </text>
            )}
          </svg>
        </div>

        <p
          className={`text-center mt-6 text-sm ${
            nightMode ? 'text-[#D8C7E8]' : 'text-[#5C4033]'
          }`}
        >
          Scroll to watch Mimi deliver dreams across the night sky
        </p>
      </div>
    </div>
  );
};
