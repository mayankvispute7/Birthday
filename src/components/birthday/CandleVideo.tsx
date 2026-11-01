'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

interface CandleVideoProps {
  onBlowout: () => void;
  // Configurable timestamp in seconds when the candles are blown out
  blowoutTimestamp?: number;
}

export default function CandleVideo({
  onBlowout,
  blowoutTimestamp = 7.0, // Configurable blowout timestamp
}: CandleVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [needsUserTap, setNeedsUserTap] = useState<boolean>(false);
  const [hasCelebrated, setHasCelebrated] = useState<boolean>(false);
  const [glowIntensity, setGlowIntensity] = useState<number>(0);

  // Attempt autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setNeedsUserTap(false);
        })
        .catch(() => {
          // Autoplay was prevented by browser policy
          setIsPlaying(false);
          setNeedsUserTap(true);
        });
    }
  }, []);

  const handleManualPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video
      .play()
      .then(() => {
        setIsPlaying(true);
        setNeedsUserTap(false);
      })
      .catch((err) => {
        console.error('Video playback failed:', err);
      });
  }, []);

  // Monitor timeline
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;

      // Warm glow buildup as we approach blowout
      if (currentTime >= blowoutTimestamp - 1.5 && currentTime < blowoutTimestamp) {
        const progress = (currentTime - (blowoutTimestamp - 1.5)) / 1.5;
        setGlowIntensity(progress * 0.6);
      }

      // Exact blowout trigger
      if (currentTime >= blowoutTimestamp && !hasCelebrated) {
        setHasCelebrated(true);
        setGlowIntensity(1);
        onBlowout();
      }
    };

    const handleEnded = () => {
      if (!hasCelebrated) {
        setHasCelebrated(true);
        setGlowIntensity(1);
        onBlowout();
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [blowoutTimestamp, hasCelebrated, onBlowout]);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
      {/* Dynamic Golden Ambient Light behind video */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
        style={{
          opacity: glowIntensity,
          background: 'radial-gradient(ellipse at center, rgba(217,185,120,0.55) 0%, rgba(217,185,120,0.15) 45%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Video Container - strict black background, object-fit contain, no crop */}
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        <video
          ref={videoRef}
          src="/assets/candlecakevideo.mp4"
          playsInline
          controls={false}
          className="w-full h-full object-contain bg-black"
          preload="auto"
        />

        {/* Fallback Play Button if browser blocks autoplay */}
        <AnimatePresence>
          {needsUserTap && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm z-30 cursor-pointer"
              onClick={handleManualPlay}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-[#D9B978] text-[#252525] flex items-center justify-center shadow-[0_0_30px_rgba(217,185,120,0.7)]"
                aria-label="Play birthday candle video"
              >
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </motion.button>
              <p className="font-playfair text-white text-lg sm:text-xl mt-4 tracking-wide font-medium">
                Tap to light the candles ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

