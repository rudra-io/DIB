'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 w-full h-full z-[100] bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/infinity.mp4" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
      <div className="flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
        >
          <Image
            src="/bingo.png"
            alt="DIS Logo"
            width={120}
            height={60}
            unoptimized
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
