'use client';

import { motion } from 'framer-motion';

interface WelcomePageProps {
  onYes: () => void;
  onNo: () => void;
}

export default function WelcomePage({ onYes, onNo }: WelcomePageProps) {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-12 relative select-none">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full flex flex-col items-center text-center space-y-6"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-playfair text-4xl sm:text-5xl md:text-6xl text-[#252525] font-bold tracking-tight"
        >
          Hiiii Aditiiii!! <span className="inline-block text-rose-500 animate-pulse">❤️</span>
        </motion.h1>

        {/* Happy Shinchan GIF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="relative py-2"
        >
          <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden bg-transparent flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/shinchan.gif"
              alt="Happy Shinchan celebrating"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>
        </motion.div>

        {/* Teaser Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="space-y-2 px-2"
        >
          <p className="font-inter text-lg sm:text-xl text-[#777777] font-normal tracking-wide">
            I developed something special for you...
          </p>
          <p className="font-playfair text-2xl sm:text-3xl text-[#252525] font-semibold">
            Wanna see it? 👀
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onYes}
            className="w-full sm:w-auto min-w-[170px] px-8 py-3.5 bg-[#252525] text-white rounded-full font-inter font-medium text-lg shadow-md hover:shadow-xl hover:bg-[#353535] transition-all duration-200 cursor-pointer"
          >
            YES ❤️
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNo}
            className="w-full sm:w-auto min-w-[170px] px-8 py-3.5 bg-transparent border-2 border-[#252525] text-[#252525] rounded-full font-inter font-medium text-lg hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
          >
            NO 😤
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

