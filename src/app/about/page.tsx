
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Cta } from '@/components/landing/cta';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground relative overflow-hidden">
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <source src="/infinity.mp4" type="video/mp4" />
      </motion.video>
      <div className="absolute inset-0 w-full h-full bg-black/50 -z-10" />

      <Header />
      <main className="text-white flex-1 z-10">

        {/* ===========================
            HERO SECTION
        ============================ */}
        <section className="w-full py-32 md:py-48">
          <div className="mx-auto max-w-7xl px-6 lg:px-16 text-center">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
            >
              We empower businesses through{" "}
              <span className="text-primary">innovation</span> and{" "}
              <span className="text-primary">precision</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.15 }}
              className="max-w-2xl mt-6 text-gray-300 text-lg leading-relaxed mx-auto"
            >
              DIS Solutions is a digital consultancy built around one mission:
              delivering forward-thinking, high-impact technology that helps brands
              excel in a rapidly evolving digital landscape.
            </motion.p>
          </div>
        </section>

        {/* ===========================
            OUR STORY / MISSION
        ============================ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                A team driven by excellence and long-term vision
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                What began as a small team of ambitious developers and designers
                has grown into a full-scale digital agency trusted by clients
                across industries. We combine creativity, engineering, and
                strategic thinking to build digital experiences that are timeless,
                scalable, and effective.
              </p>

              <p className="text-gray-300 leading-relaxed">
                Every project we touch is guided by a commitment to clarity,
                quality, and innovation—ensuring that your business doesn’t just
                adapt to the future, but leads it.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl overflow-hidden border border-white/10 shadow-xl"
            >
              <Image
                src="/team.jpg"
                alt="Our Team"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                data-ai-hint="team collaboration"
              />
            </motion.div>
          </div>
        </section>

        {/* ===========================
            OUR VALUES
        ============================ */}
        <section className="py-24 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-16">
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-16"
            >
              Our core values
            </motion.h2>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Innovation First",
                  desc: "We embrace emerging technologies and push boundaries to deliver future-ready solutions.",
                },
                {
                  title: "Client-Centric",
                  desc: "We put clarity, communication, and collaboration at the heart of every project.",
                },
                {
                  title: "Quality Obsessed",
                  desc: "We build with precision, stability, and purpose—no shortcuts, no compromises.",
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition"
                >
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ===========================
            PHILOSOPHY / APPROACH
        ============================ */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Our approach to building lasting solutions
              </h2>

              <p className="text-gray-300 leading-relaxed mb-6">
                We combine strategic thinking with engineering discipline.
                From research and prototyping to development and optimization,
                every phase is executed with clarity and measurable impact.
              </p>

              <p className="text-gray-300 leading-relaxed">
                Our work doesn’t end at delivery. We believe in ongoing support,
                long-term partnerships, and solutions that scale as your business grows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 rounded-2xl overflow-hidden border border-white/10 shadow-xl"
            >
              <Image
                src="/think.jpg"
                alt="Approach"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                data-ai-hint="strategy design"
              />
            </motion.div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </div>
  )
}
