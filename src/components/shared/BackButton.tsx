'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  dark?: boolean;
}

export default function BackButton({
  onClick,
  label = 'Back to gifts',
  dark = false,
}: BackButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, x: -3 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-inter text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer select-none ${
        dark
          ? 'bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700/60 backdrop-blur-md'
          : 'bg-white/90 hover:bg-white text-[#252525] border border-[#e8dcc8] shadow-sm hover:shadow backdrop-blur-md'
      }`}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4 text-[#D9B978]" />
      <span>{label}</span>
    </motion.button>
  );
}

