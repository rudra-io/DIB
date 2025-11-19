
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatedCounter } from './animated-counter';
import DatabaseWithRestApi from '../ui/database-with-rest-api';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: 150, label: 'Project Completed', suffix: '+' },
  { value: 99, label: 'Client Satisfaction', suffix: '%' },
  { value: 25000, label: 'Hours of work', suffix: '+' },
  { value: 10, label: 'Years Experience', prefix: '0', suffix: '+' },
];

export function StandOut() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1]);

  const svgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(svgRef, { once: true, amount: 0.5 });
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const title = "We make your business stand out";
  const words = title.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: i * 0.04 },
    }),
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="stand-out"
      ref={targetRef}
      className="w-full py-16 md:py-24 bg-transparent text-white overflow-hidden"
    >
      <div className="container px-6 lg:px-16">
        <motion.div 
          ref={sectionRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isSectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <motion.h2
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white"
              variants={containerVariants}
              initial="hidden"
              animate={isTitleInView ? "visible" : "hidden"}
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <motion.div 
              ref={svgRef}
              className="relative mx-auto lg:mx-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            >
              <DatabaseWithRestApi />
            </motion.div>
          </div>
          <motion.div
            whileHover={{ rotateX: 30, rotateY: 20 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="flex flex-col justify-center"
          >
            <motion.div style={{ scale: scale, transformStyle: 'preserve-3d' }} className="absolute -inset-4 bg-white/[.11] rounded-2xl -z-10 border border-white/20"></motion.div>
            <motion.div style={{ scale: scale, transformStyle: 'preserve-3d' }} className="flex flex-col justify-center space-y-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg">
              <motion.p 
                whileHover={{ scale: 1.1, translateZ: 50 }}
                className="max-w-md text-gray-300 mx-auto text-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                At DIS Solutions, we are your strategic partner in navigating the complexities of the digital world. We craft distinctive and memorable creative experiences that not only align with but surpass the continually evolving standards of the IT landscape.
              </motion.p>
              <motion.div 
                className="grid grid-cols-2 gap-x-6 gap-y-10 text-center"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ scale: 1.1, translateZ: 50 }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-bold text-white">
                      {stat.prefix}
                      <AnimatedCounter end={stat.value} />
                      {stat.suffix}
                    </div>
                    <p className="text-sm sm:text-base text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
