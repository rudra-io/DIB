import { cn } from '@/lib/utils';
import Image from 'next/image';

export function DISLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/bingo.png"
        alt="DIS Logo"
        width={80}
        height={40}
        unoptimized
      />
    </div>
  );
}

export function DISSolutionsLogo({ className }: { className?: string }) {
    return (
      <div className={cn("flex items-center", className)}>
         <Image
            src="/bingo.png"
            alt="DIS Solutions Logo"
            width={100}
            height={50}
            unoptimized
          />
      </div>
    );
  }
