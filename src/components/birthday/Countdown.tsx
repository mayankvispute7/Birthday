'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [step, setStep] = useState<number>(3); // 3, 2, 1, 0 (Blow candles)

  useEffect(() => {
    if (step > 0) {
      const timer = setTimeout(() => {
        setStep((s) => s - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [step, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <AnimatePresence mode="wait">
        {step > 0 ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <span className="font-playfair text-8xl sm:text-9xl md:text-[11rem] font-bold text-white tracking-widest drop-shadow-[0_0_35px_rgba(217,185,120,0.6)]">
              {step}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="blow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center px-4"
          >
            <p className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-wide drop-shadow-[0_0_30px_rgba(217,185,120,0.8)]">
              Now blow the candles! 🕯️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

