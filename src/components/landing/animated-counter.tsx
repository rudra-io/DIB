'use client';

import { useEffect, useState, useRef } from 'react';

type AnimatedCounterProps = {
  end: number;
  duration?: number;
  className?: string;
};

export function AnimatedCounter({ end, duration = 2, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startTime = Date.now();
          const animate = () => {
            const now = Date.now();
            const timePassed = now - startTime;
            const progress = Math.min(timePassed / (duration * 1000), 1);
            const easedProgress = easeOutCubic(progress);
            
            setCount(Math.floor(easedProgress * end));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };
          animationFrameId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}
    </span>
  );
}
