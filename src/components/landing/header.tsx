'use client';

import Link from 'next/link';
import { ArrowRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DISLogo } from '@/components/logo';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { useState } from 'react';

const fadeInAnimation = {
  initial: { opacity: 0, y: -20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08 + 0.5,
      ease: 'easeInOut',
      duration: 0.6,
    },
  }),
};

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'About Us' },
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
  ];
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-8xl mx-auto">
      <div className="flex items-center h-20 px-6 lg:px-8 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg">
        <motion.div
          custom={0}
          initial="initial"
          animate="animate"
          variants={fadeInAnimation}
        >
          <Link
            href="#"
            className="flex items-center justify-center"
            prefetch={false}
          >
            <DISLogo />
          </Link>
        </motion.div>
        <nav className="ml-auto hidden lg:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              custom={i + 1}
              initial="initial"
              animate="animate"
              variants={fadeInAnimation}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                prefetch={false}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div
          className="ml-auto lg:ml-8 hidden lg:block"
          custom={navLinks.length + 1}
          initial="initial"
          animate="animate"
          variants={fadeInAnimation}
        >
          <Button
            asChild
            size="sm"
            variant="default"
            className="text-white bg-transparent border border-white/50 hover:bg-white/20 rounded-full"
          >
            <Link href="#cta">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="ml-auto lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="bg-accent/12 rounded-lg">
                <Menu className="h-6 w-6 text-white" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/80 backdrop-blur-sm border-white/20 text-white w-full max-w-xs p-0">
              <SheetHeader className="p-6">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation links for the website.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-8 p-6 pt-0">
                <Link href="#" className="flex items-center" prefetch={false} onClick={() => setIsSheetOpen(false)}>
                  <DISLogo />
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium hover:text-gray-300 transition-colors"
                      prefetch={false}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild size="lg" variant="default" className="text-white bg-transparent border border-white/50 hover:bg-accent/15 rounded-full">
                  <Link href="#cta" onClick={() => setIsSheetOpen(false)}>
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
