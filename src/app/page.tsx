'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PageState } from '@/lib/navigation';
import WelcomePage from '@/components/intro/WelcomePage';
import SadPage from '@/components/intro/SadPage';
import BirthdayExperience from '@/components/birthday/BirthdayExperience';
import GiftSelection from '@/components/gifts/GiftSelection';
import LetterExperience from '@/components/letter/LetterExperience';
import MemoriesGallery from '@/components/memories/MemoriesGallery';
import AditiUniverse from '@/components/aditi/AditiUniverse';

export default function Home() {
  const [page, setPage] = useState<PageState>('welcome');
  const [birthdayCompleted, setBirthdayCompleted] = useState<boolean>(false);

  const navigateTo = (nextPage: PageState) => {
    // Scroll window smoothly to top when switching main screens
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setPage(nextPage);
  };

  const handleBirthdayComplete = () => {
    setBirthdayCompleted(true);
    navigateTo('gifts');
  };

  return (
    <main className="min-h-screen w-full bg-white relative">
      <AnimatePresence mode="wait">
        {/* Page 1: Welcome Screen */}
        {page === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <WelcomePage
              onYes={() => navigateTo('birthday')}
              onNo={() => navigateTo('sad')}
            />
          </motion.div>
        )}

        {/* Page 2: Sad Shinchan Screen */}
        {page === 'sad' && (
          <motion.div
            key="sad"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SadPage onYes={() => navigateTo('birthday')} />
          </motion.div>
        )}

        {/* Page 3: Cinematic Birthday Surprise */}
        {page === 'birthday' && (
          <motion.div
            key="birthday"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BirthdayExperience
              alreadyCompleted={birthdayCompleted}
              onComplete={handleBirthdayComplete}
            />
          </motion.div>
        )}

        {/* Page 4: Three Gift Boxes Selection */}
        {page === 'gifts' && (
          <motion.div
            key="gifts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GiftSelection onSelectGift={(gift) => navigateTo(gift)} />
          </motion.div>
        )}

        {/* Page 5: Gift 1 - A Letter */}
        {page === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LetterExperience onBack={() => navigateTo('gifts')} />
          </motion.div>
        )}

        {/* Page 6: Gift 2 - Our Memories */}
        {page === 'memories' && (
          <motion.div
            key="memories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MemoriesGallery onBack={() => navigateTo('gifts')} />
          </motion.div>
        )}

        {/* Page 7: Gift 3 - Aditi's Universe */}
        {page === 'aditi' && (
          <motion.div
            key="aditi"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AditiUniverse onBack={() => navigateTo('gifts')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

