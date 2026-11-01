'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MediaItem } from '@/types/assets';

interface PhotoViewerProps {
  photos: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function PhotoViewer({
  photos,
  currentIndex,
  onClose,
  onIndexChange,
}: PhotoViewerProps) {
  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  const handleNext = useCallback(() => {
    onIndexChange((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  if (!currentPhoto) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 select-none"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close Button */}
      <div
        className="w-full max-w-6xl flex items-center justify-between z-20 text-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-inter text-xs sm:text-sm tracking-wider uppercase text-white/60">
          Photo {currentIndex + 1} of {photos.length}
        </div>

        <button
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close photo viewer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Image Area */}
      <div
        className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Buttons for desktop / tablet */}
        {photos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/15 transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/15 transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.src}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full flex items-center justify-center p-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.filename}
              className="max-w-full max-h-[78vh] object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom caption / hint */}
      <div
        className="text-white/50 text-xs font-inter tracking-wide text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="hidden sm:inline">Use Arrow keys to browse • </span>
        <span>Tap outside to close</span>
      </div>
    </motion.div>
  );
}

