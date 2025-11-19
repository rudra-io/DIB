
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const gifRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 500], [1, 1.2]);

  const headingY = useTransform(scrollY, [0, 500], [0, -200]);
  const textY = useTransform(scrollY, [0, 500], [0, -200]);
  const gifScale = useTransform(scrollY, [0, 500], [1, 1.2]);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (gifRef.current) {
      const rect = gifRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (mouseX - centerX) * -0.1;
      const moveY = (mouseY - centerY) * -0.1;
      
      x.set(moveX);
      y.set(moveY);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };


  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image-gif');


  return (
    <section
      id="introduction"
      className="w-full min-h-screen bg-transparent flex items-center justify-center overflow-hidden relative lg:h-screen"
    >
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        style={{ scale: videoScale }}
      >
        <source src="/infinity.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0" />
      
      <div className="container px-6 lg:px-16 relative z-10 h-full pt-32 pb-16 lg:pt-0 lg:pb-0">
        <div 
          className="grid lg:grid-cols-2 gap-8 items-center h-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={gifRef}
        >
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div style={{ y: headingY }}>
              <motion.h1
                className="z-10 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
              >
                Driving Digital<br />
                Transformation with<br />
                Innovative IT Solutions
              </motion.h1>
            </motion.div>
            <motion.div style={{ y: textY }}>
              <motion.div
                  className="w-full max-w-xs sm:max-w-sm space-y-4 mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                >
                    <p className="text-gray-300 text-sm sm:text-base">
                      We empower businesses with cutting-edge technology and strategic insights to achieve sustainable growth and a competitive edge.
                    </p>
                    <Button
                        asChild
                        size="sm"
                        variant="default"
                        className="text-white bg-white/20 hover:bg-transparent hover:border-white/50 border border-transparent rounded-full"
                    >
                        <Link href="#cta">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>
            </motion.div>
          </div>

          <div className="flex justify-center items-center mt-8 lg:mt-0">
            <motion.div
              drag
              dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
              whileDrag={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
              style={{ x: springX, y: springY, scale: gifScale }}
              className='w-full max-w-[600px] h-auto flex items-center justify-center cursor-grab active:cursor-grabbing'
            >
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={600}
                  className="object-contain"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </motion.div>
          </div>

        </div>

        

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
