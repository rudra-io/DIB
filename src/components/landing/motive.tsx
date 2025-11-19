import { Card } from '@/components/ui/card';
import { AnimatedCounter } from './animated-counter';

const stats = [
  { value: 150, label: 'Projects Completed' },
  { value: 99, label: 'Client Satisfaction', suffix: '%' },
  { value: 25000, label: 'Hours of Work', prefix: '+' },
  { value: 10, label: 'Years Experience', prefix: '+' },
];

export function Motive() {
  return (
    <section id="motive" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container px-6 lg:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Motive in Numbers</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We are driven by results, and our track record speaks for itself. We are proud of the milestones we have achieved.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="flex flex-col items-center justify-center p-6 text-center shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
              <div className="text-5xl font-extrabold text-primary">
                {stat.prefix}
                <AnimatedCounter end={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-2">{stat.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
