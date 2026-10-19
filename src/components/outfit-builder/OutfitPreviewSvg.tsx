import React from 'react';
import { OutfitBase, OutfitColor, OutfitAccessory } from '../../types';

interface OutfitPreviewProps {
  base: OutfitBase;
  color: OutfitColor;
  accessory: OutfitAccessory;
  className?: string;
}

const COLOR_MAP: Record<OutfitColor, { primary: string; secondary: string; stroke: string; accent: string; label: string }> = {
  blush: {
    primary: '#F7DDE5',
    secondary: '#F2C8D5',
    stroke: '#5C4033',
    accent: '#A34063',
    label: 'Soft Blush'
  },
  cream: {
    primary: '#FFF8F1',
    secondary: '#F5E8D8',
    stroke: '#5C4033',
    accent: '#A34063',
    label: 'Warm Cream'
  },
  sage: {
    primary: '#DCE8D7',
    secondary: '#BED5B6',
    stroke: '#5C4033',
    accent: '#5E8255',
    label: 'Meadow Sage'
  },
  lavender: {
    primary: '#E8DFF5',
    secondary: '#D0C1E8',
    stroke: '#5C4033',
    accent: '#7E63A8',
    label: 'Twilight Lavender'
  },
  butter: {
    primary: '#F5D88B',
    secondary: '#E8C56B',
    stroke: '#5C4033',
    accent: '#C79A2B',
    label: 'Butter Yellow'
  }
};

export const OutfitPreviewSvg: React.FC<OutfitPreviewProps> = ({
  base,
  color,
  accessory,
  className = 'w-64 h-64 md:w-80 md:h-80'
}) => {
  const c = COLOR_MAP[color] || COLOR_MAP.cream;

  return (
    <div className={`relative flex items-center justify-center ${className} select-none`}>
      <svg
        viewBox="0 0 340 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-lg transition-all duration-300"
      >
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#5C4033" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Vintage wooden clothes hanger */}
        <g id="hanger" className="transition-transform duration-300">
          {/* Metal hook */}
          <path
            d="M170 30 C170 12, 185 12, 185 24 C185 36, 170 36, 170 48 V56"
            fill="none"
            stroke="#D4A373"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Wooden bar */}
          <path
            d="M90 84 C130 64, 210 64, 250 84 C255 86, 253 94, 246 92 C210 76, 130 76, 94 92 C87 94, 85 86, 90 84 Z"
            fill="#8B5A2B"
            stroke="#5C4033"
            strokeWidth="2"
          />
          {/* Tiny center ribbon on hanger */}
          <circle cx="170" cy="62" r="5" fill="#A34063" />
          <path d="M167 65 L160 76 M173 65 L180 76" stroke="#A34063" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Main Base Garment */}
        <g id="garment" filter="url(#softGlow)" className="transition-all duration-400">
          {base === 'onesie' && (
            <g id="onesie-base">
              {/* Onesie Sleeves & Body */}
              <path
                d="M110 85 C95 98, 70 118, 58 140 L90 162 L106 142 V246 C106 260, 118 270, 134 270 C150 270, 158 252, 170 252 C182 252, 190 270, 206 270 C222 270, 234 260, 234 246 V142 L250 162 L282 140 C270 118, 245 98, 230 85 C206 100, 134 100, 110 85 Z"
                fill={c.primary}
                stroke={c.stroke}
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Envelope Lap-Shoulder Neckline */}
              <path
                d="M110 85 C130 115, 150 120, 170 120 C190 120, 210 115, 230 85"
                fill="none"
                stroke={c.accent}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path d="M96 98 L138 122" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
              <path d="M244 98 L202 122" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />

              {/* Sleeve Cuffs */}
              <path d="M58 140 L90 162" stroke={c.secondary} strokeWidth="6" strokeLinecap="round" />
              <path d="M282 140 L250 162" stroke={c.secondary} strokeWidth="6" strokeLinecap="round" />

              {/* Bottom Snap Flap & Buttons */}
              <path
                d="M134 256 C144 264, 196 264, 206 256"
                fill="none"
                stroke={c.stroke}
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle cx="150" cy="262" r="3.5" fill="#FFF8F1" stroke={c.stroke} strokeWidth="2" />
              <circle cx="170" cy="262" r="3.5" fill="#FFF8F1" stroke={c.stroke} strokeWidth="2" />
              <circle cx="190" cy="262" r="3.5" fill="#FFF8F1" stroke={c.stroke} strokeWidth="2" />
            </g>
          )}

          {base === 'romper' && (
            <g id="romper-base">
              {/* Flutter Ruffled Sleeves */}
              <path
                d="M106 90 C80 86, 68 110, 76 136 C88 140, 102 120, 106 108 Z"
                fill={c.secondary}
                stroke={c.stroke}
                strokeWidth="3"
              />
              <path
                d="M234 90 C260 86, 272 110, 264 136 C252 140, 238 120, 234 108 Z"
                fill={c.secondary}
                stroke={c.stroke}
                strokeWidth="3"
              />

              {/* Romper Body (Chubby Bubble Style) */}
              <path
                d="M110 90 H230 V144 C256 168, 262 226, 232 250 C212 262, 196 250, 170 250 C144 250, 128 262, 108 250 C78 226, 84 168, 110 144 Z"
                fill={c.primary}
                stroke={c.stroke}
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Sweet Square/Curved Neckline */}
              <path
                d="M125 90 C125 112, 215 112, 215 90"
                fill="none"
                stroke={c.stroke}
                strokeWidth="3"
              />

              {/* Wooden Buttons Placket */}
              <circle cx="170" cy="120" r="4.5" fill="#D4A373" stroke={c.stroke} strokeWidth="1.8" />
              <circle cx="170" cy="144" r="4.5" fill="#D4A373" stroke={c.stroke} strokeWidth="1.8" />
              <circle cx="170" cy="168" r="4.5" fill="#D4A373" stroke={c.stroke} strokeWidth="1.8" />

              {/* Elastic Leg Gather Details */}
              <path d="M102 240 Q118 252 134 246" stroke={c.secondary} strokeWidth="3" fill="none" />
              <path d="M238 240 Q222 252 206 246" stroke={c.secondary} strokeWidth="3" fill="none" />
            </g>
          )}

          {base === 'pajamas' && (
            <g id="pajamas-base">
              {/* PJ Top */}
              <path
                d="M110 82 L70 114 L90 136 L112 122 V184 H228 V122 L250 136 L270 114 L230 82 C206 96, 134 96, 110 82 Z"
                fill={c.primary}
                stroke={c.stroke}
                strokeWidth="4"
                strokeLinejoin="round"
              />
              {/* Cozy Crew Neck Collar */}
              <path d="M110 82 C132 100, 208 100, 230 82" fill="none" stroke={c.stroke} strokeWidth="3.5" />

              {/* Top Hem Scallop */}
              <line x1="112" y1="184" x2="228" y2="184" stroke={c.stroke} strokeWidth="3" />
              <line x1="112" y1="180" x2="228" y2="180" stroke={c.secondary} strokeWidth="2" strokeDasharray="5 3" />

              {/* PJ Pants */}
              <path
                d="M116 192 H224 V276 H192 L170 228 L148 276 H116 Z"
                fill={c.primary}
                stroke={c.stroke}
                strokeWidth="4"
                strokeLinejoin="round"
              />

              {/* Ribbed Ankle Cuffs */}
              <rect x="116" y="276" width="32" height="14" rx="3" fill={c.secondary} stroke={c.stroke} strokeWidth="3" />
              <rect x="192" y="276" width="32" height="14" rx="3" fill={c.secondary} stroke={c.stroke} strokeWidth="3" />

              {/* Elastic Waist Stitch */}
              <path d="M116 196 H224" stroke={c.stroke} strokeWidth="2.5" strokeDasharray="4 2" />
            </g>
          )}
        </g>

        {/* Dynamic Interactive Accessories Layered on Top */}
        <g id="accessories" className="transition-all duration-300">
          {/* ACCESSORY 1: BUNNY HAT */}
          {accessory === 'bunny_hat' && (
            <g id="acc-bunny-hat" className="animate-float">
              {/* Floppy Left Ear */}
              <path
                d="M135 18 C115 -8, 95 10, 110 38 C120 44, 135 34, 135 18 Z"
                fill="#FFF8F1"
                stroke="#5C4033"
                strokeWidth="3"
              />
              <path d="M128 18 C116 2, 106 14, 116 32 Z" fill="#F7DDE5" />

              {/* Floppy Right Ear */}
              <path
                d="M205 18 C225 -8, 245 10, 230 38 C220 44, 205 34, 205 18 Z"
                fill="#FFF8F1"
                stroke="#5C4033"
                strokeWidth="3"
              />
              <path d="M212 18 C224 2, 234 14, 224 32 Z" fill="#F7DDE5" />

              {/* Beanie Cap on top of hanger */}
              <path
                d="M125 45 C125 15, 215 15, 215 45 C222 45, 222 56, 215 58 H125 C118 56, 118 45, 125 45 Z"
                fill={c.primary}
                stroke="#5C4033"
                strokeWidth="3.5"
              />
              {/* Rolled Cap Brim */}
              <rect x="122" y="44" width="96" height="12" rx="4" fill="#FFF8F1" stroke="#5C4033" strokeWidth="2.5" />
              {/* Little sleepy face embroidered on hat */}
              <circle cx="155" cy="34" r="2" fill="#5C4033" />
              <circle cx="185" cy="34" r="2" fill="#5C4033" />
              <path d="M167 36 Q170 39 173 36" stroke="#5C4033" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ACCESSORY 2: TINY BOW */}
          {accessory === 'tiny_bow' && (
            <g id="acc-tiny-bow" transform="translate(170, 115)">
              {/* Bow loops */}
              <path
                d="M0 0 C-18 -14, -22 10, -3 4 Z"
                fill="#A34063"
                stroke="#5C4033"
                strokeWidth="2.5"
              />
              <path
                d="M0 0 C18 -14, 22 10, 3 4 Z"
                fill="#A34063"
                stroke="#5C4033"
                strokeWidth="2.5"
              />
              {/* Center knot */}
              <circle cx="0" cy="2" r="5" fill="#F5D88B" stroke="#5C4033" strokeWidth="2" />
              {/* Ribbon tails */}
              <path d="M-2 5 Q-12 18 -6 24" stroke="#A34063" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M2 5 Q12 18 6 24" stroke="#A34063" strokeWidth="3" strokeLinecap="round" fill="none" />
            </g>
          )}

          {/* ACCESSORY 3: CLOUD PATCH */}
          {accessory === 'cloud_patch' && (
            <g id="acc-cloud-patch" transform="translate(142, 160)">
              {/* Cloud Badge */}
              <path
                d="M14 36 C8 36, 0 30, 0 22 C0 14, 8 10, 15 10 C18 4, 26 0, 35 0 C44 0, 52 6, 54 14 C60 14, 66 20, 66 26 C66 34, 60 36, 52 36 Z"
                fill="#FFF8F1"
                stroke="#A34063"
                strokeWidth="3"
                strokeDasharray="4 2"
              />
              {/* Happy smile on cloud */}
              <circle cx="24" cy="18" r="2.5" fill="#5C4033" />
              <circle cx="42" cy="18" r="2.5" fill="#5C4033" />
              <path d="M30 22 Q33 26 36 22" stroke="#5C4033" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Pink blush on cloud */}
              <ellipse cx="18" cy="22" rx="3" ry="1.5" fill="#F7DDE5" />
              <ellipse cx="48" cy="22" rx="3" ry="1.5" fill="#F7DDE5" />
            </g>
          )}

          {/* ACCESSORY 4: STAR PATCH */}
          {accessory === 'star_patch' && (
            <g id="acc-star-patch" transform="translate(150, 155)">
              <polygon
                points="20,0 26,14 40,15 29,25 32,39 20,31 8,39 11,25 0,15 14,14"
                fill="#F5D88B"
                stroke="#5C4033"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Inner stitch */}
              <polygon
                points="20,6 24,15 33,16 26,22 28,31 20,26 12,31 14,22 7,16 16,15"
                fill="none"
                stroke="#A34063"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <circle cx="20" cy="20" r="3" fill="#FFF8F1" />
            </g>
          )}
        </g>

        {/* Mimi's Quality Stitch Stamp on Hem */}
        <g transform="translate(196, 226) rotate(-8)">
          <rect x="0" y="0" width="30" height="16" rx="3" fill="#FFF8F1" stroke="#A34063" strokeWidth="1.5" strokeDasharray="3 1.5" />
          <text x="5" y="11" fontSize="7" fontWeight="bold" fill="#A34063" fontFamily="sans-serif">MIMI ♡</text>
        </g>
      </svg>
    </div>
  );
};
