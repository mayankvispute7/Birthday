'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Envelope from './Envelope';
import LetterContent from './LetterContent';
import BackButton from '@/components/shared/BackButton';

interface LetterExperienceProps {
  onBack: () => void;
}

export default function LetterExperience({ onBack }: LetterExperienceProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showFullLetter, setShowFullLetter] = useState<boolean>(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // After flap & paper emerge animation, switch to letter content
    setTimeout(() => {
      setShowFullLetter(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF9EF] flex flex-col justify-between px-4 py-8 sm:py-12 relative overflow-x-hidden">
      {/* Top Navigation Bar with Back Button */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-20 mb-4">
        <BackButton onClick={onBack} label="Back to gifts" />
        <span className="font-inter text-xs text-[#999999] uppercase tracking-widest hidden sm:inline">
          Gift 1 of 3
        </span>
      </div>

      {/* Main Experience Container */}
      <div className="w-full flex-1 flex items-center justify-center my-4">
        <AnimatePresence mode="wait">
          {!showFullLetter ? (
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center"
            >
              <Envelope isOpen={isOpen} onOpen={handleOpenEnvelope} />
            </motion.div>
          ) : (
            <motion.div
              key="letter-stage"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full flex justify-center"
            >
              <LetterContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom subtle note */}
      <div className="text-center text-xs text-[#999999] font-inter pt-4">
        Forever grateful for this friendship ✨
      </div>
    </div>
  );
}

