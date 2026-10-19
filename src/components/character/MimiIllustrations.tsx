import React, { useState, useEffect, useRef } from 'react';

interface MimiProps {
  className?: string;
  pose?: 'standing' | 'designing' | 'celebrating' | 'holding-needle';
  nightMode?: boolean;
  interactive?: boolean;
}

export const MimiCharacter: React.FC<MimiProps> = ({
  className = 'w-64 h-64',
  pose = 'standing',
  interactive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [isWinking, setIsWinking] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    if (!interactive) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.4; // eye level

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      // Max eye pupil movement of 4px
      const maxRadius = 4.5;
      const angle = Math.atan2(deltaY, deltaX);
      const clampedDist = Math.min(distance / 25, maxRadius);

      const px = Math.cos(angle) * clampedDist;
      const py = Math.sin(angle) * clampedDist;

      setPupilOffset({ x: px, y: py });

      // Subtle head tilt: -3deg to +3deg based on mouse horizontal position
      const tilt = Math.max(-3.5, Math.min(3.5, (deltaX / window.innerWidth) * 7));
      setHeadTilt(tilt);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Touch tap interaction: Mimi winks and blushes with little heart floating up
  const handleTap = () => {
    setIsWinking(true);
    setShowHearts(true);
    setTimeout(() => setIsWinking(false), 900);
    setTimeout(() => setShowHearts(false), 1400);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleTap}
      className={`relative select-none cursor-pointer transition-transform duration-200 active:scale-95 ${className}`}
      title="Click or tap Mimi for a sweet wink!"
    >
      {/* Floating heart on tap */}
      {showHearts && (
        <div className="absolute top-0 right-8 z-30 pointer-events-none animate-bounce text-2xl">
          💖
        </div>
      )}

      <svg
        viewBox="0 0 320 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <radialGradient id="blushGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#F7DDE5" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F7DDE5" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="bunnyFur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF8F1" />
          </linearGradient>
          <linearGradient id="earInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE4EC" />
            <stop offset="100%" stopColor="#F7DDE5" />
          </linearGradient>
          <linearGradient id="smockColor" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DCE8D7" />
            <stop offset="100%" stopColor="#BED5B6" />
          </linearGradient>
          <linearGradient id="tapeYellow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F5D88B" />
          </linearGradient>
        </defs>

        {/* Shadow under feet */}
        <ellipse cx="160" cy="340" rx="68" ry="12" fill="#5C4033" fillOpacity="0.12" />

        {/* Fluffy Bunny Tail (peeking from side) */}
        <ellipse cx="98" cy="285" rx="18" ry="18" fill="#FFF8F1" stroke="#5C4033" strokeWidth="3" />
        <circle cx="95" cy="282" r="14" fill="#FFFFFF" />

        {/* Bunny Feet */}
        <ellipse cx="135" cy="328" rx="20" ry="14" fill="url(#bunnyFur)" stroke="#5C4033" strokeWidth="3" />
        <ellipse cx="185" cy="328" rx="20" ry="14" fill="url(#bunnyFur)" stroke="#5C4033" strokeWidth="3" />
        {/* Foot pads */}
        <ellipse cx="135" cy="328" rx="9" ry="6" fill="#F7DDE5" />
        <ellipse cx="185" cy="328" rx="9" ry="6" fill="#F7DDE5" />

        {/* Main Body with Smock */}
        <path
          d="M125 185 C115 220, 110 280, 115 310 C118 318, 202 318, 205 310 C210 280, 205 220, 195 185 Z"
          fill="url(#smockColor)"
          stroke="#5C4033"
          strokeWidth="3.5"
        />

        {/* Smock details: patch pocket & decorative stitch */}
        <path
          d="M142 240 H178 C182 240, 184 244, 184 248 V275 C184 282, 178 288, 170 288 H150 C142 288, 136 282, 136 275 V248 C136 244, 138 240, 142 240 Z"
          fill="#FFF8F1"
          stroke="#5C4033"
          strokeWidth="2.5"
        />
        <path d="M148 245 L158 226 L164 229 L154 248 Z" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" />
        <path d="M158 226 L162 216 M160 227 L167 220" stroke="#7B2846" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="160" cy="265" r="4" fill="#A34063" />

        <path
          d="M118 304 Q130 300 142 304 Q154 300 166 304 Q178 300 190 304 Q202 300 204 304"
          fill="none"
          stroke="#A34063"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Designer Measuring Tape Scarf */}
        <path
          d="M116 182 C130 196, 190 196, 204 182 C210 178, 214 188, 208 196 C195 212, 125 212, 112 196 C106 188, 110 178, 116 182 Z"
          fill="url(#tapeYellow)"
          stroke="#5C4033"
          strokeWidth="2.5"
        />
        <path
          d="M172 196 C176 215, 184 240, 180 252 C178 256, 168 256, 166 250 C168 238, 168 215, 168 196"
          fill="url(#tapeYellow)"
          stroke="#5C4033"
          strokeWidth="2"
        />
        <line x1="171" y1="208" x2="175" y2="208" stroke="#5C4033" strokeWidth="1.5" />
        <line x1="171" y1="218" x2="177" y2="218" stroke="#5C4033" strokeWidth="1.5" />
        <line x1="172" y1="228" x2="176" y2="228" stroke="#5C4033" strokeWidth="1.5" />
        <line x1="173" y1="238" x2="178" y2="238" stroke="#5C4033" strokeWidth="1.5" />

        {/* Cursor-Reactive Head and Ears Group */}
        <g
          style={{
            transform: `rotate(${headTilt}deg)`,
            transformOrigin: '160px 180px',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Floppy Left Ear */}
          <g className="origin-[125px_130px] transition-transform duration-300">
            <path
              d="M125 130 C110 95, 95 40, 105 18 C112 5, 134 6, 142 28 C150 54, 145 95, 140 130 Z"
              fill="url(#bunnyFur)"
              stroke="#5C4033"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M123 115 C114 88, 106 48, 112 30 C116 20, 128 22, 132 35 C137 54, 134 88, 132 115 Z"
              fill="url(#earInner)"
            />
          </g>

          {/* Right Ear (playfully tipped) */}
          <g className="origin-[195px_130px] transition-transform duration-300">
            <path
              d="M180 130 C182 90, 195 45, 218 32 C232 24, 246 36, 238 58 C226 84, 212 105, 195 130 Z"
              fill="url(#bunnyFur)"
              stroke="#5C4033"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M188 116 C192 85, 204 52, 218 44 C226 40, 233 46, 227 58 C218 78, 208 96, 196 116 Z"
              fill="url(#earInner)"
            />
          </g>

          {/* Mimi's Round Chubby Head */}
          <circle cx="160" cy="142" r="54" fill="url(#bunnyFur)" stroke="#5C4033" strokeWidth="3.5" />

          {/* Rosy Blushing Cheeks */}
          <ellipse cx="126" cy="154" rx="12" ry="7" fill={showHearts ? "#F48FB1" : "#F7DDE5"} />
          <ellipse cx="194" cy="154" rx="12" ry="7" fill={showHearts ? "#F48FB1" : "#F7DDE5"} />

          {/* Mimi's Eyes (Cursor Reactive!) */}
          {/* Left Eye */}
          <g>
            <ellipse cx="140" cy="138" rx="6.5" ry="8.5" fill="#5C4033" />
            {/* Pupil follows mouse */}
            <circle cx={142 + pupilOffset.x} cy={135 + pupilOffset.y} r="2.8" fill="#FFFFFF" />
            <circle cx={138 + pupilOffset.x * 0.7} cy={142 + pupilOffset.y * 0.7} r="1.2" fill="#FFFFFF" />
          </g>

          {/* Right Eye: Can wink on tap! */}
          {isWinking ? (
            <path
              d="M173 140 Q180 146 187 140"
              fill="none"
              stroke="#5C4033"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          ) : (
            <g>
              <ellipse cx="180" cy="138" rx="6.5" ry="8.5" fill="#5C4033" />
              {/* Pupil follows mouse */}
              <circle cx={182 + pupilOffset.x} cy={135 + pupilOffset.y} r="2.8" fill="#FFFFFF" />
              <circle cx={178 + pupilOffset.x * 0.7} cy={142 + pupilOffset.y * 0.7} r="1.2" fill="#FFFFFF" />
            </g>
          )}

          {/* Cute bunny nose */}
          <path
            d="M160 148 C158 144, 153 145, 153 148 C153 151, 160 156, 160 156 C160 156, 167 151, 167 148 C167 145, 162 144, 160 148 Z"
            fill="#A34063"
          />

          {/* Gentle smiling mouth */}
          <path
            d="M153 158 Q160 163 160 156 Q160 163 167 158"
            fill="none"
            stroke="#5C4033"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Whiskers */}
          <line x1="112" y1="148" x2="94" y2="146" stroke="#5C4033" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
          <line x1="114" y1="156" x2="98" y2="159" stroke="#5C4033" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
          <line x1="208" y1="148" x2="226" y2="146" stroke="#5C4033" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
          <line x1="206" y1="156" x2="222" y2="159" stroke="#5C4033" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />

          {/* Hair button barrette */}
          <g transform="translate(186, 96)">
            <circle cx="6" cy="6" r="8" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" />
            <circle cx="4" cy="4" r="1.5" fill="#5C4033" />
            <circle cx="8" cy="4" r="1.5" fill="#5C4033" />
            <circle cx="4" cy="8" r="1.5" fill="#5C4033" />
            <circle cx="8" cy="8" r="1.5" fill="#5C4033" />
          </g>
        </g>

        {/* Arms */}
        {/* Left Arm holding sewing needle */}
        <path
          d="M124 200 C110 215, 96 230, 90 238 C86 244, 94 250, 100 245 C110 235, 126 215, 130 205"
          fill="url(#bunnyFur)"
          stroke="#5C4033"
          strokeWidth="3"
        />

        <g transform="translate(76, 212) rotate(-35)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#B8A072" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="60" y2="0" stroke="#F5D88B" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="6" cy="0" rx="4" ry="1.2" fill="#5C4033" />
          <path
            d="M6 0 C2 -12, 15 -25, 28 -18 C40 -12, 35 15, 60 10 C75 8, 85 -6, 96 -2"
            fill="none"
            stroke="#A34063"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
        </g>

        {/* Right Arm */}
        {pose === 'celebrating' ? (
          <path
            d="M195 200 C210 180, 224 165, 232 158 C238 152, 244 160, 238 168 C226 182, 204 212, 195 216"
            fill="url(#bunnyFur)"
            stroke="#5C4033"
            strokeWidth="3"
          />
        ) : (
          <path
            d="M196 202 C212 215, 226 230, 230 240 C234 246, 226 252, 220 246 C210 236, 196 216, 192 208"
            fill="url(#bunnyFur)"
            stroke="#5C4033"
            strokeWidth="3"
          />
        )}
      </svg>
    </div>
  );
};

/* Mini Sewing Machine Illustration */
export const MimiSewingMachine: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="150" width="200" height="18" rx="6" fill="#F5D88B" stroke="#5C4033" strokeWidth="3" />
        <rect x="36" y="168" width="12" height="24" rx="2" fill="#5C4033" />
        <rect x="192" y="168" width="12" height="24" rx="2" fill="#5C4033" />

        <path
          d="M50 150 V80 C50 66, 62 55, 76 55 H175 C186 55, 195 64, 195 75 V150 H165 V95 C165 90, 160 85, 155 85 H95 C88 85, 82 90, 82 98 V150 Z"
          fill="#DCE8D7"
          stroke="#5C4033"
          strokeWidth="3"
        />

        <rect x="90" y="98" width="4" height="42" fill="#888" stroke="#5C4033" strokeWidth="1.5" />
        <polygon points="90,140 94,140 92,146" fill="#5C4033" />

        <rect x="192" y="85" width="10" height="40" rx="3" fill="#A34063" stroke="#5C4033" strokeWidth="2" />

        <rect x="145" y="40" width="16" height="15" rx="2" fill="#F7DDE5" stroke="#5C4033" strokeWidth="2" />
        <line x1="153" y1="36" x2="153" y2="40" stroke="#5C4033" strokeWidth="2" />
        <line x1="145" y1="47" x2="161" y2="47" stroke="#A34063" strokeWidth="1.5" />

        <path d="M153 38 Q115 42 92 105" fill="none" stroke="#A34063" strokeWidth="1.8" strokeDasharray="3 2" />

        <path
          d="M60 148 C75 145, 110 145, 125 148 L122 154 H62 Z"
          fill="#F7DDE5"
          stroke="#A34063"
          strokeWidth="1.5"
        />

        <circle cx="120" cy="70" r="7" fill="#F5D88B" stroke="#5C4033" strokeWidth="1.5" />
        <text x="117" y="73" fontSize="8" fontWeight="bold" fill="#5C4033" fontFamily="sans-serif">M</text>
      </svg>
    </div>
  );
};

/* Secret Sewing Box (Easter Egg discovery) */
export const MimiSecretBox: React.FC<{ className?: string; open?: boolean }> = ({ className = 'w-40 h-40', open = false }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="100" cy="100" r="75" fill="#F5D88B" fillOpacity={open ? "0.35" : "0.1"} className="transition-all duration-700" />

        <rect x="35" y="85" width="130" height="70" rx="10" fill="#5C4033" stroke="#2D1B28" strokeWidth="3" />
        <rect x="42" y="92" width="116" height="56" rx="6" fill="#835C49" />

        <path d="M35 95 V85 H45" stroke="#F5D88B" strokeWidth="3" fill="none" />
        <path d="M165 95 V85 H155" stroke="#F5D88B" strokeWidth="3" fill="none" />
        <path d="M35 145 V155 H45" stroke="#F5D88B" strokeWidth="3" fill="none" />
        <path d="M165 145 V155 H155" stroke="#F5D88B" strokeWidth="3" fill="none" />

        <rect x="92" y="82" width="16" height="20" rx="3" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" />
        <circle cx="100" cy="94" r="3" fill="#5C4033" />

        {open ? (
          <g className="transition-all duration-500">
            <path
              d="M32 40 L168 40 L165 85 L35 85 Z"
              fill="#5C4033"
              stroke="#2D1B28"
              strokeWidth="3"
            />
            <rect x="40" y="46" width="120" height="34" rx="4" fill="#A34063" />

            <polygon points="70,75 73,81 80,82 75,87 77,93 70,89 63,93 65,87 60,82 67,81" fill="#F5D88B" stroke="#5C4033" strokeWidth="1.5" />
            <rect x="85" y="70" width="16" height="20" rx="3" fill="#E8DFF5" stroke="#5C4033" strokeWidth="2" />
            <line x1="85" y1="76" x2="101" y2="76" stroke="#A34063" strokeWidth="2" />
            <line x1="85" y1="84" x2="101" y2="84" stroke="#A34063" strokeWidth="2" />
            <path d="M115 80 C110 70, 130 70, 128 84 C126 92, 118 92, 115 80 Z" fill="#A34063" stroke="#5C4033" strokeWidth="1.5" />
            <line x1="120" y1="72" x2="114" y2="64" stroke="#F5D88B" strokeWidth="2" />
            <circle cx="113" cy="62" r="2.5" fill="#F5D88B" />
            <line x1="126" y1="74" x2="132" y2="65" stroke="#FFF8F1" strokeWidth="2" />
            <circle cx="133" cy="64" r="2.5" fill="#FFF8F1" />
          </g>
        ) : (
          <g>
            <path
              d="M30 70 H170 C173 70, 175 74, 175 78 V85 H25 V78 C25 74, 27 70, 30 70 Z"
              fill="#7A4E38"
              stroke="#2D1B28"
              strokeWidth="3"
            />
            <path d="M85 70 C85 60, 115 60, 115 70" fill="none" stroke="#F5D88B" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

/* High quality SVG product illustrations */
export const ProductIllustration: React.FC<{
  type: string;
  className?: string;
  colorHex?: string;
}> = ({ type, className = 'w-36 h-36' }) => {
  switch (type) {
    case 'onesie-cloud':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path
            d="M50 36 C42 42, 30 52, 25 64 L42 74 L48 64 V116 C48 122, 54 126, 62 126 C70 126, 74 116, 80 116 C86 116, 90 126, 98 126 C106 126, 112 122, 112 116 V64 L118 74 L135 64 C130 52, 118 42, 110 36 C98 44, 62 44, 50 36 Z"
            fill="#FFF8F1"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M50 36 C60 52, 70 55, 80 55 C90 55, 100 52, 110 36" fill="none" stroke="#A34063" strokeWidth="2.5" />
          <path d="M42 42 L64 54" stroke="#5C4033" strokeWidth="2" />
          <path d="M118 42 L96 54" stroke="#5C4033" strokeWidth="2" />
          <g transform="translate(62, 72) scale(0.75)">
            <path
              d="M10 22 C6 22, 2 18, 2 14 C2 9, 6 6, 11 6 C12 2, 17 0, 23 0 C29 0, 35 4, 36 9 C40 9, 44 13, 44 17 C44 22, 40 22, 35 22 Z"
              fill="#E8F1F5"
              stroke="#A34063"
              strokeWidth="2"
            />
            <circle cx="16" cy="12" r="1.5" fill="#5C4033" />
            <circle cx="28" cy="12" r="1.5" fill="#5C4033" />
            <path d="M20 15 Q22 18 24 15" stroke="#5C4033" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>
          <circle cx="70" cy="120" r="2.5" fill="#F5D88B" stroke="#5C4033" strokeWidth="1" />
          <circle cx="80" cy="120" r="2.5" fill="#F5D88B" stroke="#5C4033" strokeWidth="1" />
          <circle cx="90" cy="120" r="2.5" fill="#F5D88B" stroke="#5C4033" strokeWidth="1" />
        </svg>
      );

    case 'snuggle-set':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path
            d="M48 28 L24 48 L38 58 L48 50 V84 H112 V50 L122 58 L136 48 L112 28 C96 36, 64 36, 48 28 Z"
            fill="#F7DDE5"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M54 30 L98 84" stroke="#A34063" strokeWidth="2.5" />
          <ellipse cx="98" cy="74" rx="4" ry="2.5" fill="#A34063" />
          <path d="M96 74 Q92 84 94 88 M99 74 Q105 82 108 86" stroke="#A34063" strokeWidth="1.5" fill="none" />

          <path
            d="M52 88 H108 V126 C108 132, 114 136, 114 140 C114 144, 100 144, 96 140 L88 126 L80 102 L72 126 L64 140 C60 144, 46 144, 46 140 C46 136, 52 132, 52 126 Z"
            fill="#FFF8F1"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <line x1="52" y1="92" x2="108" y2="92" stroke="#A34063" strokeWidth="2" strokeDasharray="3 2" />
        </svg>
      );

    case 'romper-sun':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M48 40 C34 38, 28 50, 32 62 C38 64, 46 54, 48 48 Z" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" />
          <path d="M112 40 C126 38, 132 50, 128 62 C122 64, 114 54, 112 48 Z" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" />

          <path
            d="M50 40 H110 V66 C124 78, 126 108, 110 120 C100 126, 92 120, 80 120 C68 120, 60 126, 50 120 C34 108, 36 78, 50 66 Z"
            fill="#FFF8F1"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="80" cy="52" r="3" fill="#D4A373" stroke="#5C4033" strokeWidth="1.2" />
          <circle cx="80" cy="64" r="3" fill="#D4A373" stroke="#5C4033" strokeWidth="1.2" />

          <path
            d="M68 84 H92 C92 98, 68 98, 68 84 Z"
            fill="#F5D88B"
            stroke="#5C4033"
            strokeWidth="2"
          />
          <circle cx="80" cy="84" r="5" fill="#E29578" />
          <line x1="74" y1="79" x2="72" y2="76" stroke="#E29578" strokeWidth="1.5" />
          <line x1="80" y1="77" x2="80" y2="74" stroke="#E29578" strokeWidth="1.5" />
          <line x1="86" y1="79" x2="88" y2="76" stroke="#E29578" strokeWidth="1.5" />
        </svg>
      );

    case 'overalls-explorer':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path d="M46 36 L28 48 L38 56 L46 50 V60 H114 V50 L122 56 L132 48 L114 36 Z" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2.5" />

          <rect x="54" y="32" width="12" height="36" rx="2" fill="#DCE8D7" stroke="#5C4033" strokeWidth="2.5" />
          <rect x="94" y="32" width="12" height="36" rx="2" fill="#DCE8D7" stroke="#5C4033" strokeWidth="2.5" />
          <circle cx="60" cy="62" r="3" fill="#5C4033" />
          <circle cx="100" cy="62" r="3" fill="#5C4033" />

          <path
            d="M50 62 H110 V96 L114 136 H92 L86 102 L80 102 L74 102 L68 136 H46 L50 96 Z"
            fill="#DCE8D7"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <path
            d="M64 74 H96 C96 90, 64 90, 64 74 Z"
            fill="#FFF8F1"
            stroke="#5C4033"
            strokeWidth="2"
          />
          <path d="M78 82 C78 78, 82 78, 82 82 C82 86, 78 86, 78 82 Z" fill="#A34063" />

          <rect x="44" y="130" width="24" height="6" rx="1.5" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2" />
          <rect x="92" y="130" width="24" height="6" rx="1.5" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2" />
        </svg>
      );

    case 'acorn-tee':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path
            d="M48 36 L20 54 L32 68 L48 58 V120 H112 V58 L128 68 L140 54 L112 36 C96 46, 64 46, 48 36 Z"
            fill="#F5D88B"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M48 36 C64 46, 96 46, 112 36" fill="none" stroke="#5C4033" strokeWidth="2.5" />
          <circle cx="56" cy="38" r="2" fill="#5C4033" />
          <circle cx="64" cy="40" r="2" fill="#5C4033" />

          <rect x="74" y="68" width="26" height="26" rx="4" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2" />
          <path d="M82 77 C82 74, 92 74, 92 77 Z" fill="#5C4033" />
          <path d="M83 77 C83 84, 91 84, 91 77 Z" fill="#D4A373" />
          <line x1="87" y1="74" x2="87" y2="72" stroke="#5C4033" strokeWidth="1.5" />
        </svg>
      );

    case 'sunshine-set':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path
            d="M52 32 C38 32, 30 46, 36 58 L48 54 V80 C48 86, 112 86, 112 80 V54 L124 58 C130 46, 122 32, 108 32 Z"
            fill="#FFF8F1"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <line x1="56" y1="50" x2="104" y2="50" stroke="#DCE8D7" strokeWidth="2" />
          <line x1="56" y1="62" x2="104" y2="62" stroke="#DCE8D7" strokeWidth="2" />
          <line x1="70" y1="42" x2="70" y2="78" stroke="#DCE8D7" strokeWidth="2" />
          <line x1="90" y1="42" x2="90" y2="78" stroke="#DCE8D7" strokeWidth="2" />

          <path
            d="M50 86 H110 C118 86, 122 100, 116 118 C110 126, 96 126, 90 120 L80 106 L70 120 C64 126, 50 126, 44 118 C38 100, 42 86, 50 86 Z"
            fill="#DCE8D7"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M48 84 Q80 88 112 84" stroke="#5C4033" strokeWidth="2" fill="none" />
          <circle cx="80" cy="90" r="2.5" fill="#F5D88B" />
          <path d="M78 90 Q72 96 74 100 M82 90 Q88 96 86 100" stroke="#F5D88B" strokeWidth="1.8" fill="none" />
        </svg>
      );

    case 'moonbeam-pj':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path
            d="M48 30 L22 48 L34 60 L48 52 V86 H112 V52 L126 60 L138 48 L112 30 C96 38, 64 38, 48 30 Z"
            fill="#E8DFF5"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <line x1="60" y1="44" x2="60" y2="84" stroke="#C9BCE2" strokeWidth="1.5" />
          <line x1="72" y1="44" x2="72" y2="84" stroke="#C9BCE2" strokeWidth="1.5" />
          <line x1="88" y1="44" x2="88" y2="84" stroke="#C9BCE2" strokeWidth="1.5" />
          <line x1="100" y1="44" x2="100" y2="84" stroke="#C9BCE2" strokeWidth="1.5" />

          <path
            d="M84 52 C81 52, 78 54, 78 58 C78 62, 81 65, 85 65 C83 63, 83 58, 85 54 C85 53, 84 52, 84 52 Z"
            fill="#F5D88B"
          />

          <path
            d="M52 90 H108 V128 H92 L80 106 L68 128 H52 Z"
            fill="#E8DFF5"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x="52" y="128" width="16" height="8" rx="2" fill="#C9BCE2" stroke="#5C4033" strokeWidth="2" />
          <rect x="92" y="128" width="16" height="8" rx="2" fill="#C9BCE2" stroke="#5C4033" strokeWidth="2" />
        </svg>
      );

    case 'sleepy-bunny':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path
            d="M50 32 L26 48 L36 58 L48 52 V118 C48 124, 40 128, 40 134 C40 140, 54 140, 60 136 L70 120 L80 102 L90 120 L100 136 C106 140, 120 140, 120 134 C120 128, 112 124, 112 118 V52 L124 58 L134 48 L110 32 C96 40, 64 40, 50 32 Z"
            fill="#F7DDE5"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M80 40 L62 118" stroke="#A34063" strokeWidth="2.5" strokeDasharray="4 2" />
          <rect x="76" y="36" width="8" height="6" rx="2" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1.5" />

          <circle cx="48" cy="132" r="5" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1.2" />
          <ellipse cx="45" cy="125" rx="1.5" ry="4" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1" />
          <ellipse cx="51" cy="125" rx="1.5" ry="4" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1" />

          <circle cx="112" cy="132" r="5" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1.2" />
          <ellipse cx="109" cy="125" rx="1.5" ry="4" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1" />
          <ellipse cx="115" cy="125" rx="1.5" ry="4" fill="#FFF8F1" stroke="#5C4033" strokeWidth="1" />
        </svg>
      );

    case 'starlight-sleep':
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <path
            d="M62 26 C62 18, 70 12, 76 12 C78 12, 80 15, 80 18 C80 22, 74 24, 76 28 C88 28, 98 34, 100 42 H60 C62 36, 62 30, 62 26 Z"
            fill="#E8DFF5"
            stroke="#5C4033"
            strokeWidth="2.5"
          />
          <circle cx="76" cy="14" r="3" fill="#F5D88B" />

          <path
            d="M62 48 H98 V62 C116 76, 122 108, 114 136 C108 144, 52 144, 46 136 C38 108, 44 76, 62 62 Z"
            fill="#FFF8F1"
            stroke="#5C4033"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M60 80 L80 100 L100 80 M60 100 L80 120 L100 100 M70 130 L80 140 L90 130"
            fill="none"
            stroke="#E8DFF5"
            strokeWidth="1.8"
            strokeDasharray="3 3"
          />
          <polygon points="78,74 80,78 84,79 81,82 82,86 78,84 74,86 75,82 72,79 76,78" fill="#F5D88B" />
          <polygon points="92,106 93,109 96,110 94,112 95,115 92,114 89,115 90,112 88,110 91,109" fill="#F5D88B" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="40" y="40" width="80" height="80" rx="16" fill="#F7DDE5" stroke="#5C4033" strokeWidth="2" />
          <circle cx="80" cy="80" r="16" fill="#FFF8F1" stroke="#A34063" strokeWidth="2" />
        </svg>
      );
  }
};
