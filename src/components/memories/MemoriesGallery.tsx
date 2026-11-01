'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { assetManifest } from '@/generated/assets-manifest';
import type { MediaItem } from '@/types/assets';
import PhotoViewer from './PhotoViewer';
import VideoViewer from './VideoViewer';
import BackButton from '@/components/shared/BackButton';

interface MemoriesGalleryProps {
  onBack: () => void;
}

export default function MemoriesGallery({ onBack }: MemoriesGalleryProps) {
  const memories = assetManifest.memories || [];
  const photosOnly = memories.filter((item) => item.type === 'image');

  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);

  const handleMediaClick = (item: MediaItem) => {
    if (item.type === 'video') {
      setActiveVideo(item);
    } else {
      const idx = photosOnly.findIndex((p) => p.src === item.src);
      setActivePhotoIndex(idx >= 0 ? idx : 0);
    }
  };

  // Asymmetrical aspect ratios & card styles for a natural scrapbook feel
  const cardSpans = [
    'sm:col-span-1 sm:row-span-2 aspect-[3/4]', // Tall
    'sm:col-span-2 sm:row-span-1 aspect-[16/9]', // Wide / Video
    'sm:col-span-1 sm:row-span-1 aspect-square',  // Square
    'sm:col-span-1 sm:row-span-1 aspect-[4/5]',   // Portrait
    'sm:col-span-2 sm:row-span-1 aspect-[16/10]', // Landscape
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFF9EF] px-4 py-8 sm:py-12 relative overflow-x-hidden select-none">
      {/* Fixed/Sticky Header with Back Button */}
      <div className="sticky top-4 z-30 w-full max-w-6xl mx-auto flex items-center justify-between mb-8 pointer-events-auto">
        <BackButton onClick={onBack} label="Back to gifts" />
        <span className="px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e8dcc8] font-inter text-xs text-[#888888] tracking-wider uppercase backdrop-blur-sm">
          {memories.length} Memories Saved
        </span>
      </div>

      {/* Hero Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16 pt-2"
      >
        <span className="font-inter text-xs sm:text-sm tracking-[0.25em] uppercase text-[#B89648] font-semibold">
          Shared Moments
        </span>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-[#252525] font-bold">
          Our Memories 📸
        </h1>
        <p className="font-inter text-sm sm:text-base text-[#777777] max-w-lg mx-auto">
          Every photo is a chapter, every moment a treasure. Tap any picture or video to look back.
        </p>
      </motion.div>

      {/* Gallery Grid or Empty State */}
      {memories.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-20 space-y-4">
          <p className="font-playfair text-2xl text-[#252525]">No memories added yet!</p>
          <p className="font-inter text-sm text-[#777777]">
            Place your photos and videos inside the <code className="bg-white px-2 py-1 rounded">memories</code> folder.
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 auto-rows-[260px] sm:auto-rows-[280px]">
            {memories.map((item, index) => {
              const spanClass = cardSpans[index % cardSpans.length];
              const isVideo = item.type === 'video';

              return (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: Math.min(index * 0.12, 0.8),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    scale: 1.025,
                    y: -4,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMediaClick(item)}
                  className={`group relative rounded-3xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_40px_rgba(217,185,120,0.25)] border border-[#ede3cf] bg-white cursor-pointer transition-shadow duration-300 ${spanClass}`}
                >
                  {/* Media Content */}
                  {isVideo ? (
                    <div className="w-full h-full relative bg-neutral-900 flex items-center justify-center">
                      <video
                        src={item.src}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      {/* Video Play Badge */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white/90 text-[#252525] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                          <Play className="w-6 h-6 fill-current translate-x-0.5 text-amber-700" />
                        </div>
                      </div>
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white font-inter text-[11px] font-medium tracking-wide backdrop-blur-sm">
                        Video
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full relative overflow-hidden bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={`Memory ${item.filename}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Gentle hover shine gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Modals (Overlays, preserving scroll position) */}
      {activePhotoIndex !== null && (
        <PhotoViewer
          photos={photosOnly}
          currentIndex={activePhotoIndex}
          onClose={() => setActivePhotoIndex(null)}
          onIndexChange={(newIdx) => setActivePhotoIndex(newIdx)}
        />
      )}

      {activeVideo && (
        <VideoViewer video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}

