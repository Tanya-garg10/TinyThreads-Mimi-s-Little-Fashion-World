import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

interface MusicBoxPlayerProps {
  nightMode: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MusicBoxPlayer: React.FC<MusicBoxPlayerProps> = ({
  nightMode,
  soundEnabled,
  onToggleSound
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNote, setCurrentNote] = useState<string>('');

  useEffect(() => {
    return () => {
      audioManager.stopLullaby();
    };
  }, []);

  const handleTogglePlay = () => {
    const nextState = audioManager.toggleLullaby((note) => {
      setCurrentNote(note);
    });
    setIsPlaying(nextState);
    if (nextState && !soundEnabled) {
      onToggleSound();
    }
  };

  const handleToggleMute = () => {
    onToggleSound();
    if (soundEnabled && isPlaying) {
      audioManager.stopLullaby();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border-2 p-3 sm:p-4 shadow-sm transition-all duration-300 flex items-center justify-between gap-3 ${
        nightMode
          ? 'bg-[#281B34] border-[#432A57] text-[#F3E8FF]'
          : 'bg-[#FFF8F1] border-[#F7DDE5] text-[#5C4033]'
      }`}
    >
      {/* Music Box Vintage Winding Key & Info */}
      <div className="flex items-center gap-3">
        {/* Animated Winding Key Icon */}
        <div
          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center relative cursor-pointer ${
            nightMode
              ? 'bg-[#1D1226] border-[#5E3B7A]'
              : 'bg-white border-[#EABAC8]'
          }`}
          onClick={handleTogglePlay}
          title={isPlaying ? 'Pause Mimi’s Music Box' : 'Wind up and play Mimi’s Music Box'}
        >
          <Music className={`w-5 h-5 text-[#A34063] ${isPlaying ? 'animate-bounce' : ''}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5D88B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A34063]" />
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-rounded font-bold text-xs sm:text-sm tracking-tight">
              Mimi's Lullaby Box
            </span>
            <span className="text-[10px] font-hand font-bold text-[#A34063]">
              {isPlaying ? currentNote || 'Playing ♪' : 'Synthesized Web Audio'}
            </span>
          </div>
          <span className="text-[11px] opacity-75 font-sans block">
            {isPlaying ? 'Gentle chime notes playing softly' : 'Click play for sweet music box chimes'}
          </span>
        </div>
      </div>

      {/* Controls: Play/Pause and Mute Switch */}
      <div className="flex items-center gap-2">
        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause Mimi’s Lullaby Music Box' : 'Play Mimi’s Lullaby Music Box'}
          className={`p-2.5 rounded-full border-2 transition-all cursor-pointer shadow-xs active:scale-95 flex items-center justify-center ${
            isPlaying
              ? 'bg-[#A34063] border-[#5C4033] text-white hover:bg-[#852E4D]'
              : 'bg-white border-[#EABAC8] text-[#A34063] hover:bg-[#F7DDE5]'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Global Sound Effects / Mute Switch */}
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={soundEnabled ? 'Mute all UI sounds' : 'Enable click sounds and music'}
          title={soundEnabled ? 'Mute UI sounds' : 'Enable UI sounds'}
          className={`p-2 rounded-xl border transition-all cursor-pointer ${
            soundEnabled
              ? 'bg-[#DCE8D7] border-[#BED5B6] text-[#2F4729]'
              : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
