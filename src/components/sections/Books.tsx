"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import SectionWrapper, { SectionHeader } from "@/components/ui/SectionWrapper";
import { profile } from "@/data/profile";

const SPINE_COLORS = [
  "from-teal-700 to-teal-500",
  "from-blue-700 to-blue-500",
  "from-indigo-700 to-indigo-500",
  "from-cyan-700 to-cyan-500",
];

export default function Books() {
  return (
    <SectionWrapper id="books" darker>
      <SectionHeader
        label="Books"
        title="Books & Monographs"
        subtitle="Four volumes published by Unpad Press, covering oceanographic dynamics, marine technology, and island ecosystems."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {profile.books.map((book, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card overflow-hidden hover:border-teal-500/30 transition-colors duration-300 group"
          >
            <div className={`h-2 bg-gradient-to-r ${SPINE_COLORS[idx]}`} />
            <div className="p-5">
              <div className="w-10 h-10 rounded-xl bg-ocean-700/60 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-teal-400" />
              </div>
              <h4 className="text-white text-sm font-semibold leading-snug mb-1">
                {book.title}
              </h4>
              {(book.titleEn as string) !== (book.title as string) && (
                <p className="text-slate-500 text-xs italic mb-3 leading-relaxed">
                  {book.titleEn}
                </p>
              )}
              <div className="pt-3 border-t border-ocean-600/30 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-xs">
                    {book.publisher}
                  </span>
                  <span className="font-mono text-xs text-teal-400">
                    {book.year}
                  </span>
                </div>
                <p className="text-slate-600 text-xs">{book.pages} pages</p>
                {book.coAuthors && (
                  <p className="text-slate-600 text-xs">
                    With: {book.coAuthors}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
