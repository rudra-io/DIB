'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ContainerScroll, CardSticky } from '@/components/ui/cards-stack'
import Image from 'next/image'
import { PlaceHolderImages } from '@/lib/placeholder-images'

const PROCESS_PHASES = [
  {
    id: 'process-1',
    title: 'Discovery and Strategy',
    description:
      "Our journey begins with a deep dive into your vision. We engage in meaningful conversations to understand your business objectives, technical requirements, and long-term goals. This phase sets the strategic foundation for a successful project.",
  },
  {
    id: 'process-2',
    title: 'Architecture and Design',
    description:
      "We move on to architecting a robust solution. Our team creates detailed system designs, wireframes, and prototypes to visualize the user experience and technical framework, ensuring alignment before development begins.",
  },
  {
    id: 'process-3',
    title: 'Development and Integration',
    description:
      "Following agile methodologies, our developers bring the designs to life, writing clean, efficient code. We focus on seamless integration with your existing systems to create a cohesive and powerful digital ecosystem.",
  },
  {
    id: 'process-4',
    title: 'Testing and Quality Assurance',
    description:
      'In the Development and Testing phase, our skilled developers turn designs into a fully functional website. Rigorous testing ensures everything works seamlessly, providing an exceptional user experience.',
  },
  {
    id: 'process-5',
    title: 'Deployment and Support',
    description:
      "Our commitment continues beyond launch. We manage the deployment process to ensure a smooth transition and provide ongoing support and maintenance to keep your solution secure, optimized, and up-to-date.",
  },
]

export default function Process() {
    const processImage = PlaceHolderImages.find(img => img.id === 'process-image');
  return (
    <section className="container min-h-svh bg-transparent text-white px-6 lg:px-16">
      <div className="grid md:grid-cols-2 md:gap-8 xl:gap-12 items-start">
        {/* Left Column */}
        <div className="left-0 top-0 md:sticky md:h-svh md:py-12">
          <motion.h5
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-wide text-primary"
          >
            our process
          </motion.h5>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 mt-4 text-4xl font-bold tracking-tight"
          >
            Your project's journey to{' '}
            <span className="text-primary">success</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-prose text-sm leading-relaxed text-gray-300"
          >
            Our structured and transparent process ensures your project is delivered on time and on budget, meeting the highest standards of quality and achieving your strategic business goals.
          </motion.p>
          {processImage && (
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Image
                    src={processImage.imageUrl}
                    alt={processImage.description}
                    width={400}
                    height={400}
                    className="rounded-lg w-full h-auto"
                    unoptimized
                />
              </motion.div>
          )}
        </div>

        {/* Right Column */}
        <ContainerScroll className="min-h-[400vh] space-y-8 py-12">
          {PROCESS_PHASES.map((phase, index) => (
            <CardSticky
              key={phase.id}
              index={index + 2}
              incrementY={50}
              incrementZ={15}
              className="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-md backdrop-blur-lg"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="my-6 text-2xl font-bold tracking-tighter">
                    {phase.title}
                  </h2>
                  <h3 className="text-2xl font-bold text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  )
}
