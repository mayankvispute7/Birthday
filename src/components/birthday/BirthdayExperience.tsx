'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from './Countdown';
import CandleVideo from './CandleVideo';
import BirthdayReveal from './BirthdayReveal';

interface BirthdayExperienceProps {
  alreadyCompleted: boolean;
  onComplete: () => void;
}

type Stage = 'teaser' | 'countdown' | 'video' | 'celebration';

export default function BirthdayExperience({
  alreadyCompleted,
  onComplete,
}: BirthdayExperienceProps) {
  const [stage, setStage] = useState<Stage>(alreadyCompleted ? 'celebration' : 'teaser');

  useEffect(() => {
    if (stage === 'teaser') {
      const timer = setTimeout(() => {
        setStage('countdown');
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {/* Stage 1: Teaser Text */}
        {stage === 'teaser' && (
          <motion.div
            key="teaser"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-6 max-w-xl"
          >
            <p className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide leading-relaxed">
              Aditiii, there&apos;s a surprise for you...
            </p>
          </motion.div>
        )}

        {/* Stage 2: 3, 2, 1 Countdown */}
        {stage === 'countdown' && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex items-center justify-center"
          >
            <Countdown onComplete={() => setStage('video')} />
          </motion.div>
        )}

        {/* Stage 3: Video Playing */}
        {stage === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full flex items-center justify-center px-4"
          >
            <CandleVideo
              onBlowout={() => setStage('celebration')}
              blowoutTimestamp={7.0} // Adjust based on the actual candle blow moment in candlecakevideo.mp4
            />
          </motion.div>
        )}

        {/* Stage 4: Celebration Golden Reveal & Confetti */}
        {stage === 'celebration' && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full min-h-screen"
          >
            <BirthdayReveal onContinue={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

