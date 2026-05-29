"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Innovations", href: "#innovations" },
  { label: "Publications", href: "#publications" },
  { label: "Expeditions", href: "#expeditions" },
  { label: "Consulting", href: "#consultant" },
  { label: "Services", href: "#pengajuan" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive("#" + entry.target.id);
        });
      },
      { threshold: 0.4 },
    );

    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-black"
      style={{
        height: "44px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <a
          href="#"
          className="text-[13px] font-semibold text-white tracking-tight"
        >
          Noir P. Purba
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-colors duration-200",
                "text-[12px] leading-none tracking-[-0.12px] font-normal",
                active === href
                  ? "text-white"
                  : "text-[#cccccc] hover:text-white",
              )}
            >
              {label}
            </a>
          ))}
          <a
            href="https://scholar.google.com/citations?user=iuIvqCsAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-full text-white text-[12px] leading-none font-normal transition-colors duration-200"
            style={{ padding: "6px 14px", backgroundColor: "#0066cc" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0071e3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#0066cc";
            }}
          >
            Scholar
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-[#cccccc] hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-0.5">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-[14px] text-[#cccccc] hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
