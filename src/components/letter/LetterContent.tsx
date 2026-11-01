'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { letterContent } from '@/content/letter';

export default function LetterContent() {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number>(0);

  const totalParagraphs = letterContent.paragraphs.length;

  useEffect(() => {
    setVisibleParagraphs(0);
    const timers: NodeJS.Timeout[] = [];

    // Stagger each paragraph reveal smoothly
    for (let i = 0; i <= totalParagraphs + 1; i++) {
      const timer = setTimeout(() => {
        setVisibleParagraphs(i + 1);
      }, 500 + i * 750);
      timers.push(timer);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [animationKey, totalParagraphs]);

  const handleReplay = () => {
    setAnimationKey((k) => k + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center select-text"
    >
      {/* Paper Container - Realistic Parchment Paper Card with page.jpg texture */}
      <div className="relative w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-[#e3d7c3] overflow-hidden bg-[#FFFDF9]">
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/page.jpg')` }}
        />

        {/* Paper Header Ribbon / Glow */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#D9B978]/60 to-transparent" />

        {/* Letter Text Container - Scrollable if long */}
        <div className="relative z-10 px-6 sm:px-12 md:px-16 py-10 sm:py-14 max-h-[72vh] overflow-y-auto space-y-6">
          {/* Salutation */}
          <motion.div
            key={`salutation-${animationKey}`}
            initial={{ opacity: 0, y: 8 }}
            animate={visibleParagraphs >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.6 }}
            className="border-b border-[#e8ddcb]/70 pb-3"
          >
            <h2 className="font-caveat text-3xl sm:text-4xl text-[#252525] font-bold tracking-wide">
              {letterContent.salutation}
            </h2>
          </motion.div>

          {/* Paragraphs with smooth writing fade */}
          <div className="space-y-4 font-caveat text-xl sm:text-2xl text-[#2d2d2d] leading-relaxed tracking-wide">
            {letterContent.paragraphs.map((para, idx) => (
              <motion.p
                key={`p-${idx}-${animationKey}`}
                initial={{ opacity: 0, y: 10 }}
                animate={visibleParagraphs >= idx + 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Closing & Signature */}
          <motion.div
            key={`closing-${animationKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={
              visibleParagraphs >= totalParagraphs + 2
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.7 }}
            className="pt-6 border-t border-[#e8ddcb]/70 space-y-1 text-right"
          >
            <p className="font-caveat text-xl sm:text-2xl text-[#666666] italic">
              {letterContent.closing}
            </p>
            <p className="font-caveat text-2xl sm:text-3xl font-bold text-[#252525]">
              {letterContent.signature}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReplay}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#252525] border border-[#d9b978]/60 font-inter text-xs sm:text-sm font-medium shadow-sm hover:shadow hover:bg-[#FFF9EF] transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#D9B978]" />
          <span>Replay letter animation</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

