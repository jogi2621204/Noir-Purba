"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  darker?: boolean;
}

export default function SectionWrapper({
  id,
  className,
  children,
  darker = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "py-20 md:py-28 px-4",
        darker ? "bg-[#272729]" : "bg-black",
        className,
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}

export function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-14">
      <span className="inline-block text-[12px] font-mono font-medium tracking-[0.18em] uppercase text-[#2997ff] mb-3">
        {label}
      </span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle mt-2">{subtitle}</p>}
    </div>
  );
}
