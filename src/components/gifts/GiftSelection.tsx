'use client';

import { motion } from 'framer-motion';
import GiftCard from './GiftCard';
import type { PageState } from '@/lib/navigation';

interface GiftSelectionProps {
  onSelectGift: (gift: PageState) => void;
}

export default function GiftSelection({ onSelectGift }: GiftSelectionProps) {
  const gifts: Array<{
    id: PageState;
    label: string;
    subtitle: string;
    imageSrc: string;
  }> = [
    {
      id: 'letter',
      label: 'A Letter 💌',
      subtitle: 'From my heart to yours',
      imageSrc: '/assets/box.png',
    },
    {
      id: 'memories',
      label: 'Our Memories 📸',
      subtitle: 'Unforgettable moments together',
      imageSrc: '/assets/box.png',
    },
    {
      id: 'aditi',
      label: "Aditi's Universe ✨",
      subtitle: 'Celebrating you in all your glory',
      imageSrc: '/assets/box.png',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFF9EF] flex flex-col items-center justify-center px-4 py-16 sm:py-24 relative select-none">
      {/* Subtle decorative background circles */}
      <div className="absolute top-12 left-8 w-64 h-64 rounded-full bg-[#D9B978]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-8 w-72 h-72 rounded-full bg-[#D9B978]/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full flex flex-col items-center text-center space-y-12 sm:space-y-16 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 px-4 max-w-2xl"
        >
          <span className="font-inter text-xs sm:text-sm uppercase tracking-[0.2em] text-[#B89648] font-semibold">
            Special Birthday Surprises
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#252525] font-bold leading-tight">
            I have three little surprises for you...
          </h1>
          <p className="font-inter text-sm sm:text-base text-[#777777]">
            Each box holds a different memory and message. Choose any box to begin!
          </p>
        </motion.div>

        {/* 3 Gift Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full px-2 sm:px-6">
          {gifts.map((gift, index) => (
            <GiftCard
              key={gift.id}
              id={gift.id}
              label={gift.label}
              subtitle={gift.subtitle}
              index={index}
              imageSrc={gift.imageSrc}
              onClick={() => onSelectGift(gift.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

