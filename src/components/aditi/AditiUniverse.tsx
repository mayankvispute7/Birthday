'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { assetManifest } from '@/generated/assets-manifest';
import { aditiUniverseContent } from '@/content/messages';
import type { MediaItem } from '@/types/assets';
import PhotoViewer from '@/components/memories/PhotoViewer';
import VideoViewer from '@/components/memories/VideoViewer';
import BackButton from '@/components/shared/BackButton';

interface AditiUniverseProps {
  onBack: () => void;
}

export default function AditiUniverse({ onBack }: AditiUniverseProps) {
  const aditiMedia = assetManifest.aditi || [];
  const photosOnly = aditiMedia.filter((item) => item.type === 'image');

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

  return (
    <div className="min-h-screen w-full bg-[#FFF9EF] px-4 py-8 sm:py-12 relative overflow-x-hidden select-none">
      {/* Subtle Starry/Warm Ambient Light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#D9B978]/15 via-[#FFF9EF] to-transparent blur-3xl pointer-events-none" />

      {/* Top Header with Back Navigation */}
      <div className="sticky top-4 z-30 w-full max-w-6xl mx-auto flex items-center justify-between mb-8 pointer-events-auto">
        <BackButton onClick={onBack} label="Back to gifts" />
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#e8dcc8] font-inter text-xs text-[#B89648] font-medium backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Aditi&apos;s Special Space</span>
        </div>
      </div>

      {/* Hero: Central Poetic Tribute Message */}
      <div className="max-w-4xl mx-auto text-center space-y-6 pt-4 mb-14 sm:mb-20 relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/60 font-inter text-xs sm:text-sm font-medium tracking-wide"
        >
          <span>{aditiUniverseContent.heading}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        </motion.div>

        {/* Central Heartfelt Quote */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-3xl sm:text-5xl md:text-6xl text-[#252525] font-bold leading-tight tracking-tight"
        >
          &ldquo;{aditiUniverseContent.centralQuote}&rdquo;
        </motion.h1>

        {/* Handwritten subtitle in Caveat */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-caveat text-2xl sm:text-3xl text-amber-800/90 max-w-2xl mx-auto leading-relaxed"
        >
          {aditiUniverseContent.subtext}
        </motion.p>
      </div>

      {/* Media Showcase Section */}
      <div className="max-w-5xl mx-auto relative z-10">
        {aditiMedia.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 space-y-3">
            <p className="font-playfair text-2xl text-[#252525]">Universe is waiting for stars!</p>
            <p className="font-inter text-sm text-[#777777]">
              Add Aditi&apos;s photos and videos to the <code className="bg-white px-2 py-1 rounded">aditi</code> folder.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* If 1 or 2 items, elegant centered spotlight arrangement */}
            {aditiMedia.length === 1 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleMediaClick(aditiMedia[0])}
                className="group relative max-w-lg w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(217,185,120,0.3)] border-2 border-white bg-white p-3 cursor-pointer"
              >
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative bg-neutral-100">
                  {aditiMedia[0].type === 'video' ? (
                    <video
                      src={aditiMedia[0].src}
                      preload="metadata"
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={aditiMedia[0].src}
                      alt="Aditi"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="font-caveat text-3xl text-white font-bold">
                      {aditiUniverseContent.sparkleText}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Grid for 2+ items */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
                {aditiMedia.map((item, index) => {
                  const isVideo = item.type === 'video';
                  return (
                    <motion.div
                      key={item.src}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.2 + index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      whileHover={{ scale: 1.03, y: -6 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMediaClick(item)}
                      className="group rounded-3xl overflow-hidden bg-white p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(217,185,120,0.3)] border border-[#ece1cb] cursor-pointer transition-shadow"
                    >
                      <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative bg-neutral-100">
                        {isVideo ? (
                          <div className="w-full h-full relative flex items-center justify-center bg-black">
                            <video
                              src={item.src}
                              preload="metadata"
                              muted
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-12 h-12 rounded-full bg-white/90 text-amber-800 flex items-center justify-center shadow-md">
                                <Play className="w-5 h-5 fill-current translate-x-0.5" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.src}
                            alt="Aditi"
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Sparkle Footer */}
      <div className="mt-16 text-center">
        <p className="font-caveat text-2xl text-[#b09048]">
          {aditiUniverseContent.sparkleText}
        </p>
      </div>

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

