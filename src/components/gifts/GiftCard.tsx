'use client';

import { motion } from 'framer-motion';

interface GiftCardProps {
  id: string;
  label: string;
  subtitle: string;
  index: number;
  imageSrc: string;
  onClick: () => void;
}

export default function GiftCard({
  label,
  subtitle,
  index,
  imageSrc,
  onClick,
}: GiftCardProps) {
  // Gentle staggered floating timing
  const floatDuration = 4 + index * 0.7;
  const floatDelay = index * 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <motion.div
        animate={{
          y: [-4, 6, -4],
          rotate: index === 0 ? [-0.8, 0.8, -0.8] : index === 2 ? [0.8, -0.8, 0.8] : 0,
        }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{
          scale: 1.05,
          rotate: index === 0 ? -2 : index === 2 ? 2 : 0,
          y: -10,
          transition: { duration: 0.25 },
        }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className="group w-full max-w-xs bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(217,185,120,0.22)] border border-[#f0e8d8]/80 transition-shadow duration-300 select-none"
      >
        {/* Gift Box Image */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center p-2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF9EF] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={label}
            className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 relative z-10"
          />
        </div>

        {/* Gift Label */}
        <div className="mt-5 space-y-1">
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#252525] group-hover:text-amber-800 transition-colors">
            {label}
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#888888]">
            {subtitle}
          </p>
        </div>

        {/* Tap to open pill */}
        <div className="mt-5">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-inter font-medium tracking-wide uppercase bg-[#FFF9EF] text-[#B89648] group-hover:bg-[#D9B978] group-hover:text-white transition-colors duration-200">
            Open Gift
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

