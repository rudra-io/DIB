'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const services = [
  {
    id: 'expertise-cloud',
    number: '01',
    title: 'Cloud Solutions',
    description: "We architect and manage scalable, secure, and high-performance cloud infrastructure. Our certified experts help you leverage the full power of cloud platforms like AWS, Azure, and Google Cloud to drive innovation and efficiency.",
    activities: ["Cloud Strategy & Migration", "Infrastructure as Code (IaC)", "Serverless Architecture", "Cost Optimization & FinOps"],
    deliverables: "A fully provisioned cloud environment, CI/CD pipelines, comprehensive documentation, and a cost-optimization report."
  },
  {
    id: 'expertise-cybersecurity',
    number: '02',
    title: 'Cybersecurity Services',
    description: "Our cybersecurity services protect your digital assets from evolving threats. We offer a 360-degree approach, from proactive threat hunting and penetration testing to incident response and compliance management.",
    activities: ["Penetration Testing & Vulnerability Assessment", "Security Operations Center (SOC)", "Incident Response & Forensics", "Compliance (ISO 27001, SOC 2, GDPR)"],
    deliverables: "Detailed security assessment reports, a real-time monitoring dashboard, an incident response plan, and compliance certification support."
  },
  {
    id: 'expertise-data',
    number: '03',
    title: 'Data & Analytics',
    description: "We help you turn raw data into actionable insights. Our data scientists and engineers build robust data pipelines, BI dashboards, and machine learning models that empower you to make data-driven decisions and uncover new opportunities.",
    activities: ["Data Warehousing & ETL", "Business Intelligence (BI) Dashboards", "Machine Learning & AI Modeling", "Big Data Processing"],
    deliverables: "A scalable data warehouse, interactive BI dashboards, production-ready ML models, and predictive analytics reports."
  },
  {
    id: 'expertise-software',
    number: '04',
    title: 'Custom Software Development',
    description: "We design and build bespoke software solutions tailored to your unique business needs. Our agile development process ensures we deliver high-quality, scalable, and maintainable applications that provide a competitive edge.",
    activities: ["Web & Mobile Application Development", "API Design & Integration", "DevOps & CI/CD Automation", "Legacy System Modernization"],
    deliverables: "A production-ready application, complete source code, API documentation, and a full suite of automated tests."
  },
];

export function Expertise() {
  const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);


  const images = PlaceHolderImages.filter(img =>
    services.map(s => s.id).includes(img.id)
  );

  const activeImage = images.find(img => img.id === hoveredServiceId);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerRef.current && !isMobile) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
  };

  return (
    <section ref={sectionRef} id="services" className="w-full py-16 md:py-24 bg-transparent text-white">
      <motion.div 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="container px-6 lg:px-16 relative"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                We Offer Expertise in
            </h2>
        </div>
        
        <motion.div 
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map(service => (
            <Dialog key={service.id}>
              <DialogTrigger asChild>
                <motion.div
                  onMouseEnter={() => setHoveredServiceId(service.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  className="group relative border-b border-white/20 cursor-pointer"
                  variants={itemVariants}
                >
                  <div className="flex justify-between items-center py-6 sm:py-8">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="text-sm sm:text-base text-gray-400">{service.number}</span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium">{service.title}</h3>
                    </div>
                    <ArrowUpRight className="h-8 w-8 sm:h-10 sm:w-10 text-white transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-background/80 backdrop-blur-sm border-white/20 text-white max-w-2xl p-8 sm:p-10">
                <DialogHeader>
                  <DialogTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                    <span className="text-primary mr-4">{service.number}</span>{service.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 text-base text-gray-300">
                  <p className="leading-relaxed">{service.description}</p>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Key Activities:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {service.activities.map((activity, i) => <li key={i}>{activity}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Key Deliverables:</h4>
                    <p>{service.deliverables}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
        
        <AnimatePresence>
          {activeImage && hoveredServiceId && !isMobile &&(
            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: 0,
                x: mousePosition.x - 175, // Center the image on the cursor
                y: mousePosition.y - 200,
              }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute pointer-events-none"
              style={{
                top: 0,
                left: 0,
                width: '350px',
                height: '400px',
              }}
            >
              <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={activeImage.imageUrl}
                  alt={activeImage.description}
                  width={350}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint={activeImage.imageHint}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
