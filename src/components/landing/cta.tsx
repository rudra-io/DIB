
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Cta() {
  return (
    <section id="cta" className="w-full py-20 md:py-32 bg-transparent">
      <div className="container px-6 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8 md:gap-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
                Lets Collaborate<br className="hidden md:block" /> with us
            </h2>
            <Link 
              href="#" 
              prefetch={false} 
              className="group relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center overflow-hidden rounded-full border border-white/20 transition-all duration-300 hover:border-accent hover:bg-accent/10 focus:outline-none focus:ring-4 focus:ring-accent/50"
            >
              <ArrowUpRight className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 text-white transition-transform duration-300 ease-out group-hover:scale-110 group-hover:text-accent" />
            </Link>
        </div>
      </div>
    </section>
  );
}
