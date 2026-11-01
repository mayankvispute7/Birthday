'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChevronDown } from 'lucide-react';

interface BirthdayRevealProps {
  onContinue: () => void;
}

export default function BirthdayReveal({ onContinue }: BirthdayRevealProps) {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; top: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate subtle golden floating particles
    const items = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(items);

    // Launch subtle, elegant golden & champagne confetti
    const end = Date.now() + 3.5 * 1000;
    const colors = ['#D9B978', '#FFF9EF', '#FFD700', '#F3E7C4', '#FFFFFF'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 0.9,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-between px-4 py-12 select-none overflow-hidden">
      {/* Background warm golden ambient bloom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(217,185,120,0.22) 0%, rgba(217,185,120,0.06) 45%, transparent 75%)',
        }}
      />

      {/* Floating golden particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${2 + (p.id % 4)}px`,
            height: `${2 + (p.id % 4)}px`,
            backgroundColor: '#D9B978',
            boxShadow: '0 0 8px #D9B978',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [-10, -60],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Spacing top */}
      <div className="h-6" />

      {/* Central celebration reveal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-2xl w-full z-10 space-y-8"
      >
        <motion.div
          animate={{
            filter: [
              'drop-shadow(0 0 25px rgba(217, 185, 120, 0.45))',
              'drop-shadow(0 0 45px rgba(217, 185, 120, 0.85))',
              'drop-shadow(0 0 25px rgba(217, 185, 120, 0.45))',
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full max-w-md sm:max-w-lg px-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/happybday.png"
            alt="Happy Birthday Aditi celebration"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="font-playfair text-xl sm:text-2xl md:text-3xl text-white/90 font-light tracking-wide italic"
        >
          Wishing you the happiest birthday full of magic & joy! ✨
        </motion.p>
      </motion.div>

      {/* Bottom Continue / Scroll-down Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="z-10 flex flex-col items-center pt-8 cursor-pointer group"
        onClick={onContinue}
      >
        <button
          onClick={onContinue}
          className="flex flex-col items-center space-y-2 text-white/80 group-hover:text-white transition-colors cursor-pointer"
          aria-label="Continue to your birthday surprises"
        >
          <span className="font-inter text-xs sm:text-sm tracking-[0.25em] uppercase text-[#D9B978]">
            Discover your gifts
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D9B978] transition-colors"
          >
            <ChevronDown className="w-5 h-5 text-[#D9B978]" />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}

