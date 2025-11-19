'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const projects = [
    {
      id: 'impact-project-1',
      category: 'Cloud Solutions',
      title: 'Enterprise Cloud Migration',
      details: 'A detailed case study about a large-scale enterprise cloud migration to AWS. We orchestrated a seamless transition of critical infrastructure, resulting in a 40% reduction in operational costs and a 60% improvement in application performance and scalability.'
    },
    {
      id: 'impact-project-2',
      category: 'Cybersecurity',
      title: 'Threat Detection Platform',
      details: 'This project involved developing a proactive threat detection and response platform. By integrating AI-driven analytics, we empowered the client to identify and neutralize security threats in real-time, safeguarding their digital assets and ensuring business continuity.'
    },
    {
      id: 'impact-project-3',
      category: 'Data & Analytics',
      title: 'Customer Insights Dashboard',
      details: 'We built a scalable and robust e-commerce platform from the ground up. The platform features a custom shopping cart, secure payment integration, and a content management system for easy product updates. The result is a seamless shopping experience for customers.'
    },
    {
      id: 'impact-project-4',
      category: 'Software Development',
      title: 'Custom ERP System',
      details: 'A comprehensive fitness tracking app for iOS and Android. We designed and developed a user-friendly interface that allows users to monitor their workouts, track progress, and stay motivated. The app integrates with various wearables for a holistic health overview.'
    },
];

const projectImages = PlaceHolderImages.filter(img =>
    projects.map(p => p.id).includes(img.id)
);


export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);
  const image = projectImages.find(img => img.id === params.id);

  if (!project || !image) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main className="flex-1 pt-32">
        <div className="container px-6 lg:px-16">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="space-y-6">
              <p className="text-sm font-semibold text-primary">{project.category}</p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-white">
                {project.title}
              </h1>
              <p className="text-gray-300 text-lg">
                {project.details}
              </p>
            </div>
            <div>
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={800}
                height={600}
                className="object-cover w-full h-auto rounded-lg shadow-2xl"
                data-ai-hint={image.imageHint}
              />
            </div>
          </div>
          
          <div className="py-16 md:py-24">
              <h2 className="text-3xl font-bold tracking-tighter text-center mb-8 text-white">Project Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Image src="https://picsum.photos/seed/gallery1/800/600" alt="Gallery Image 1" width={800} height={600} className="rounded-lg" />
                  <Image src="https://picsum.photos/seed/gallery2/800/600" alt="Gallery Image 2" width={800} height={600} className="rounded-lg" />
                  <Image src="https://picsum.photos/seed/gallery3/800/600" alt="Gallery Image 3" width={800} height={600} className="rounded-lg" />
                  <Image src="https://picsum.photos/seed/gallery4/800/600" alt="Gallery Image 4" width={800} height={600} className="rounded-lg" />
              </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
