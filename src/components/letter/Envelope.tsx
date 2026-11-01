'use client';

import { motion } from 'framer-motion';

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

export default function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[460px] select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center"
      >
        <p className="font-playfair text-2xl sm:text-3xl text-[#252525] font-semibold mb-2">
          {isOpen ? 'Opening your letter...' : 'A Special Letter For You 💌'}
        </p>
        <p className="font-inter text-xs sm:text-sm text-[#777777] mb-8">
          {isOpen ? 'Unfolding memories & wishes...' : 'Click the envelope to read'}
        </p>

        {/* Interactive Envelope Graphic with paper emerging */}
        <div
          onClick={!isOpen ? onOpen : undefined}
          className={`relative w-72 h-56 sm:w-96 sm:h-72 flex items-center justify-center ${
            !isOpen ? 'cursor-pointer' : ''
          }`}
        >
          {/* Emerging Letter Paper when opened */}
          {isOpen && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.7 }}
              animate={{ y: -65, opacity: 1, scale: 0.9 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-10 w-52 sm:w-64 aspect-[3/4] rounded-lg shadow-2xl overflow-hidden border border-[#d9b978]/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/page.jpg"
                alt="Letter page emerging"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Envelope Body */}
          <motion.div
            animate={
              !isOpen
                ? {
                    y: [0, -6, 0],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={!isOpen ? { scale: 1.04 } : {}}
            whileTap={!isOpen ? { scale: 0.97 } : {}}
            className="relative z-20 w-full h-full flex items-center justify-center drop-shadow-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isOpen ? '/assets/envelopeopen.png' : '/assets/envelope.png'}
              alt={isOpen ? 'Open envelope' : 'Closed envelope'}
              className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-300"
            />
          </motion.div>
        </div>

        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="mt-8 px-6 py-2.5 bg-[#252525] text-white rounded-full font-inter text-xs sm:text-sm font-medium shadow-md hover:bg-[#383838] transition-colors cursor-pointer"
          >
            Tap to open letter ✨
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

