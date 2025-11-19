'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { StandOut } from '@/components/landing/stand-out';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Expertise } from '@/components/landing/expertise';
import { Cta } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { LoadingScreen } from '@/components/landing/loading-screen';
import { AnimatePresence, motion } from 'framer-motion';
import Process from '@/components/landing/process';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const parallaxImages = PlaceHolderImages.filter(img =>
    [
      'parallax-2', // fm.png (center)
      'parallax-1', // bb.png (left portrait)
      'parallax-3', // lg.png (under portrait)
      'parallax-gq', // gq.png
      'parallax-8', // pp.png (right)
      'parallax-9', // me.png (right)
    ].includes(img.id)
  ).sort((a, b) => {
    const order = ['parallax-2', 'parallax-1', 'parallax-3', 'parallax-gq', 'parallax-8', 'parallax-9'];
    return order.indexOf(a.id) - order.indexOf(b.id);
  }).map(img => ({ src: img.imageUrl, alt: img.description }));

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col min-h-[100dvh] bg-transparent text-foreground"
          >
            <Header />
            <main className="flex-1">
              <Hero />
              <StandOut />
              <Process />
              <Expertise />
              <ZoomParallax images={parallaxImages} />
              <Cta />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
