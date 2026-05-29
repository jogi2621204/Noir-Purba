"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, BookOpen, Mail } from "lucide-react";
import { profile } from "@/data/profile";

function OceanParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 14}s`,
            animationDelay: `${Math.random() * 8}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            backgroundColor: "rgba(41, 151, 255, 0.15)",
          }}
        />
      ))}
    </div>
  );
}

function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 80"
        className="w-full h-16 md:h-20"
        style={{ fill: "#272729" }}
        preserveAspectRatio="none"
      >
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,45 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <OceanParticles />

      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-24 flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="relative w-52 h-52 md:w-64 md:h-64">
            <div
              className="absolute inset-0 rounded-full p-[2px]"
              style={{
                background: "linear-gradient(135deg, #0066cc, #2997ff)",
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1c1c1e]">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className="inline-block text-xs tracking-[0.2em] uppercase font-medium mb-4"
              style={{ color: "#2997ff" }}
            >
              Associate Professor · Physical Oceanography
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight mb-3"
          >
            Noir Primadona
            <br />
            <span className="text-gradient-teal">Purba</span>
            <span
              className="text-2xl md:text-3xl font-normal"
              style={{ color: "#cccccc" }}
            >
              , PhD
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-base md:text-lg mb-6"
            style={{ color: "#cccccc" }}
          >
            {profile.department} · {profile.institution}
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="pl-4 mb-8 max-w-md lg:mx-0 mx-auto"
            style={{ borderLeft: "2px solid rgba(0, 102, 204, 0.5)" }}
          >
            <p
              className="italic text-base md:text-lg leading-relaxed"
              style={{ color: "#cccccc" }}
            >
              &ldquo;{profile.quote.text}&rdquo;
            </p>
            <cite
              className="text-xs font-mono not-italic mt-1 block"
              style={{ color: "rgba(41, 151, 255, 0.7)" }}
            >
              — {profile.quote.author}
            </cite>
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center gap-3 justify-center lg:justify-start mb-8"
          >
            {[
              {
                value: profile.metrics.citations.toLocaleString(),
                label: "Citations",
              },
              { value: `h-${profile.metrics.hIndex}`, label: "h-index" },
              { value: `i10: ${profile.metrics.i10Index}`, label: "i10-index" },
              {
                value: `${profile.metrics.yearsActive}+`,
                label: "Years Active",
              },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="glass-card px-4 py-2.5 text-center min-w-[90px]"
              >
                <div
                  className="font-mono font-bold text-lg leading-tight"
                  style={{ color: "#2997ff" }}
                >
                  {value}
                </div>
                <div
                  className="text-[10px] uppercase tracking-wider mt-0.5"
                  style={{ color: "#7a7a7a" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a
              href={profile.contact.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <BookOpen className="w-4 h-4" />
              Google Scholar
            </a>
            <a href="#contact" className="btn-ghost">
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors"
        style={{ color: "#7a7a7a" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#2997ff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#7a7a7a";
        }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.a>

      <WaveDivider />
    </section>
  );
}
