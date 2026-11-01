'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { MediaItem } from '@/types/assets';

interface VideoViewerProps {
  video: MediaItem;
  onClose: () => void;
}

export default function VideoViewer({ video, onClose }: VideoViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 select-none"
      onClick={onClose}
    >
      {/* Top Bar with Title & Close Button */}
      <div
        className="w-full max-w-5xl flex items-center justify-between z-20 text-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-inter text-xs sm:text-sm tracking-wider uppercase text-white/60">
          Video Memory
        </div>

        <button
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close video viewer"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Main Video Area */}
      <div
        className="w-full max-w-4xl flex-1 flex items-center justify-center my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-h-[80vh] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center border border-white/10"
        >
          <video
            src={video.src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>

      {/* Bottom Hint */}
      <div
        className="text-white/50 text-xs font-inter tracking-wide text-center"
        onClick={(e) => e.stopPropagation()}
      >
        Press Escape or tap outside to close
      </div>
    </motion.div>
  );
}

