import React, { useState, useEffect, useRef } from 'react';
import { Star, Cloud, Heart, Play, X, Trophy } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  type: 'star' | 'cloud' | 'heart';
  speed: number;
}

interface CatchDreamsGameProps {
  nightMode: boolean;
  onClose: () => void;
}

export const CatchDreamsGame: React.FC<CatchDreamsGameProps> = ({ nightMode, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const spawnRef = useRef<number>();

  const spawnItem = () => {
    if (!isPlaying || !gameRef.current) return;

    const types: Array<'star' | 'cloud' | 'heart'> = ['star', 'cloud', 'heart'];
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * (gameRef.current.clientWidth - 50);

    const newItem: FallingItem = {
      id: Date.now() + Math.random(),
      x,
      y: -50,
      type,
      speed: 2 + Math.random() * 3
    };

    setItems((prev) => [...prev, newItem]);
  };

  const updateItems = () => {
    if (!isPlaying) return;

    setItems((prev) => {
      const updated = prev
        .map((item) => ({
          ...item,
          y: item.y + item.speed
        }))
        .filter((item) => item.y < 600); // Remove items that fall off screen

      return updated;
    });
  };

  const handleCatch = (itemId: number, type: 'star' | 'cloud' | 'heart') => {
    audioManager.playTone(523.25, 0.1, 0.05); // Pleasant chime

    const points = type === 'star' ? 10 : type === 'heart' ? 15 : 5;
    setScore((prev) => prev + points);

    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setItems([]);
    setGameOver(false);
    audioManager.playClickSound();

    // Spawn items every 800ms
    spawnRef.current = window.setInterval(spawnItem, 800);

    // Update positions every 16ms (60fps)
    animationRef.current = window.setInterval(updateItems, 16);

    // Timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (animationRef.current) clearInterval(animationRef.current);
  };

  const resetGame = () => {
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setItems([]);
  };

  useEffect(() => {
    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  const getItemIcon = (type: 'star' | 'cloud' | 'heart') => {
    switch (type) {
      case 'star':
        return <Star className="w-8 h-8 text-yellow-400" />;
      case 'cloud':
        return <Cloud className="w-8 h-8 text-blue-300" />;
      case 'heart':
        return <Heart className="w-8 h-8 text-pink-400" />;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        nightMode ? 'bg-[#1B1222]/95' : 'bg-[#FFF8F1]/95'
      }`}
    >
      <div
        ref={gameRef}
        className={`relative w-full max-w-2xl h-[600px] rounded-3xl border-3 shadow-2xl overflow-hidden ${
          nightMode
            ? 'bg-[#1B1222] border-[#5E3B7A]'
            : 'bg-[#87CEEB] border-[#5C4033]'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => {
            audioManager.playClickSound();
            if (isPlaying) endGame();
            onClose();
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Game header */}
        <div className="absolute top-4 left-4 right-16 z-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-white/80 font-bold text-lg">
              Score: {score}
            </div>
            <div className="px-4 py-2 rounded-full bg-white/80 font-bold text-lg">
              Time: {timeLeft}s
            </div>
          </div>
        </div>

        {/* Start screen */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/50">
            <div className="text-center p-8">
              <h2
                className={`text-4xl font-bold mb-4 ${
                  nightMode ? 'text-[#F3E8FF]' : 'text-[#5C4033]'
                }`}
              >
                Catch the Dreams! ✨
              </h2>
              <p
                className={`text-lg mb-6 ${
                  nightMode ? 'text-[#D8C7E8]' : 'text-[#5C4033]'
                }`}
              >
                Catch falling stars, clouds, and hearts before they disappear!
              </p>
              <div className="flex gap-4 justify-center mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-sm">10 pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-6 h-6 text-blue-300" />
                  <span className="text-sm">5 pts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-pink-400" />
                  <span className="text-sm">15 pts</span>
                </div>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3 rounded-full bg-[#A34063] text-white font-bold text-lg hover:bg-[#852E4D] transition-colors cursor-pointer flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Game
              </button>
            </div>
          </div>
        )}

        {/* Game over screen */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/50">
            <div className="text-center p-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2
                className={`text-4xl font-bold mb-4 ${
                  nightMode ? 'text-[#F3E8FF]' : 'text-[#5C4033]'
                }`}
              >
                Game Over!
              </h2>
              <p
                className={`text-2xl mb-6 ${
                  nightMode ? 'text-[#D8C7E8]' : 'text-[#5C4033]'
                }`}
              >
                Final Score: {score}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 rounded-full bg-[#A34063] text-white font-bold hover:bg-[#852E4D] transition-colors cursor-pointer"
                >
                  Play Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full border-2 border-[#5C4033] font-bold hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Falling items */}
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCatch(item.id, item.type)}
            className="absolute cursor-pointer hover:scale-125 transition-transform"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              transition: 'none'
            }}
          >
            {getItemIcon(item.type)}
          </div>
        ))}
      </div>
    </div>
  );
};
