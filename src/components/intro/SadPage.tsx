'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SadPageProps {
  onYes: () => void;
}

interface MiniGif {
  id: number;
  x: number; // percentage of viewport width
  y: number; // percentage of viewport height
  scale: number;
  rotation: number;
}

export default function SadPage({ onYes }: SadPageProps) {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [playfulMessage, setPlayfulMessage] = useState<string>('');
  const [miniGifs, setMiniGifs] = useState<MiniGif[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const playfulMessages = [
    "Go away, go away! 😂",
    "Hey! You can't catch me! 🏃‍♂️💨",
    "Pleeeease? Just one little peek! 🥺",
    "I worked so hard on this for you! 😭",
    "Don't be so stubborn Aditiiii! 😜",
    "Okay, the YES button is getting bigger... you can't resist! 😉",
    "Look at how cute Shinchan is, say YES! 💕",
    "You know you want to see it! ✨",
  ];

  // Random positions restricted to perimeter zones so they never cover central text/buttons
  const getSafePerimeterPosition = useCallback((index: number): { x: number; y: number } => {
    // 8 perimeter zones around the edges
    const zones = [
      { xMin: 5, xMax: 18, yMin: 8, yMax: 25 },    // Top-left
      { xMin: 82, xMax: 95, yMin: 8, yMax: 25 },   // Top-right
      { xMin: 3, xMax: 16, yMin: 40, yMax: 65 },   // Mid-left
      { xMin: 84, xMax: 97, yMin: 40, yMax: 65 },  // Mid-right
      { xMin: 5, xMax: 20, yMin: 75, yMax: 92 },   // Bottom-left
      { xMin: 80, xMax: 95, yMin: 75, yMax: 92 },  // Bottom-right
      { xMin: 25, xMax: 40, yMin: 4, yMax: 12 },   // Top-mid-left
      { xMin: 60, xMax: 75, yMin: 4, yMax: 12 },   // Top-mid-right
    ];
    const zone = zones[index % zones.length];
    return {
      x: Math.floor(zone.xMin + Math.random() * (zone.xMax - zone.xMin)),
      y: Math.floor(zone.yMin + Math.random() * (zone.yMax - zone.yMin)),
    };
  }, []);

  const dodgeNoButton = useCallback(() => {
    setNoCount((prev) => {
      const next = prev + 1;
      const msgIndex = (next - 1) % playfulMessages.length;
      setPlayfulMessage(playfulMessages[msgIndex]);

      // Add a mini sad gif up to 8 max
      if (next <= 8) {
        const pos = getSafePerimeterPosition(next - 1);
        setMiniGifs((curr) => [
          ...curr,
          {
            id: next,
            x: pos.x,
            y: pos.y,
            scale: 0.75 + Math.random() * 0.35,
            rotation: (Math.random() - 0.5) * 30,
          },
        ]);
      }

      return next;
    });

    // Calculate a safe bounded jump for the NO button
    if (containerRef.current) {
      const maxOffset = Math.min(180, window.innerWidth > 640 ? 160 : 90);
      const randomX = (Math.random() - 0.5) * 2 * maxOffset;
      const randomY = (Math.random() - 0.5) * 2 * (maxOffset * 0.7);
      setNoPosition({ x: randomX, y: randomY });
    }
  }, [playfulMessages, getSafePerimeterPosition]);

  // YES button scale grows smoothly with each NO attempt, capped at 1.45
  const yesScale = Math.min(1 + noCount * 0.08, 1.45);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden select-none"
    >
      {/* Background Decorative Mini Sad Shinchan GIFs */}
      {miniGifs.map((gif) => (
        <motion.div
          key={gif.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: gif.scale, rotate: gif.rotation }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed pointer-events-none z-0 hidden sm:block"
          style={{
            left: `${gif.x}vw`,
            top: `${gif.y}vh`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/sad.gif"
            alt="Mini sad Shinchan"
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow"
          />
        </motion.div>
      ))}

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full flex flex-col items-center text-center space-y-6 relative z-10"
      >
        {/* Apology Heading */}
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#252525] font-bold leading-tight px-2">
          You&apos;re still angry with me? <br />
          <span className="text-amber-700 italic">I&apos;m sorryyy</span> 🥺
        </h1>

        {/* Sad Shinchan GIF */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-3xl overflow-hidden flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/sad.gif"
            alt="Sad Shinchan crying"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </motion.div>

        {/* Persuasion Text */}
        <p className="font-inter text-base sm:text-lg text-[#555555] max-w-md px-4 leading-relaxed">
          At least take a look at the website I developed for you...
        </p>

        {/* Playful Floating Alert Message */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {playfulMessage && (
              <motion.div
                key={playfulMessage}
                initial={{ opacity: 0, y: -6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="font-caveat text-xl sm:text-2xl text-[#D9B978] font-bold tracking-wide"
              >
                {playfulMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-2 w-full min-h-[140px] sm:min-h-[100px] relative">
          {/* YES Button - Scales up smoothly, always reachable */}
          <motion.button
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={onYes}
            className="w-full sm:w-auto min-w-[210px] px-8 py-4 bg-[#252525] text-white rounded-full font-inter font-semibold text-base sm:text-lg shadow-lg hover:shadow-2xl hover:bg-[#383838] transition-colors cursor-pointer z-20"
          >
            YESSS, SHOW ME ❤️
          </motion.button>

          {/* NO Button - Dodges cursor on hover/pointer enter and touch */}
          <motion.div
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="w-full sm:w-auto z-10"
          >
            <button
              onMouseEnter={dodgeNoButton}
              onTouchStart={(e) => {
                e.preventDefault();
                dodgeNoButton();
              }}
              onClick={(e) => {
                e.preventDefault();
                dodgeNoButton();
              }}
              className="w-full sm:w-auto min-w-[210px] px-6 py-4 bg-transparent border-2 border-[#888888] text-[#555555] rounded-full font-inter font-medium text-base hover:border-[#252525] hover:text-[#252525] transition-colors cursor-pointer select-none"
            >
              NO, NOT INTERESTED 😤
            </button>
          </motion.div>
        </div>

        {noCount > 0 && (
          <p className="text-xs text-[#999999] font-inter pt-2">
            (Attempts to resist: {noCount} 😂)
          </p>
        )}
      </motion.div>
    </div>
  );
}

