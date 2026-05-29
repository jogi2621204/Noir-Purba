'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const TIER_STYLE: Record<string, string> = {
    Q1:       'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    Q2:       'bg-blue-500/15 text-blue-300 border-blue-500/25',
    Q3:       'bg-slate-500/15 text-slate-400 border-slate-500/25',
    National: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
};

const YEARS = ['All', ...Array.from(new Set(profile.publications.map((p) => p.year))).sort((a, b) => b - a).map(String)];

export default function Publications()
{
    const [filter, setFilter] = useState('All');

    const visible = filter === 'All'
        ? profile.publications
        : profile.publications.filter((p) => String(p.year) === filter);

    return (
        <SectionWrapper id="publications">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <SectionHeader
                        label="Scientific Publications"
                        title="Published Works"
                        subtitle={`${profile.metrics.i10Index} articles with 10+ citations · ${profile.metrics.citations.toLocaleString()} total citations · h-index ${profile.metrics.hIndex}`}
                    />
                </div>

                <div className="flex flex-wrap gap-2 pb-1">
                    {YEARS.map((y) => (
                        <button
                            key={y}
                            onClick={() => setFilter(y)}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200',
                                filter === y
                                    ? 'bg-teal-500 text-ocean-950'
                                    : 'bg-ocean-800/60 border border-ocean-600/40 text-slate-400 hover:text-white hover:border-teal-500/40',
                            )}
                        >
                            {y}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {visible.map((pub, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.04 }}
                        className="glass-card p-5 hover:border-teal-500/30 transition-colors duration-200 group"
                    >
                        <div className="flex items-start gap-4">
                            <BookOpen className="w-4 h-4 text-teal-500/50 mt-1 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-start gap-2 mb-1.5">
                                    <h4 className="text-white text-sm font-medium leading-snug flex-1">
                                        {pub.title}
                                    </h4>
                                    {pub.doi && (
                                        <a
                                            href={pub.doi}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-teal-500/50 hover:text-teal-400 transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                                <p className="text-slate-500 text-xs leading-relaxed mb-2">{pub.authors}</p>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-slate-400 text-xs italic">{pub.journal}</span>
                                    {pub.volume && (
                                        <span className="text-slate-600 text-xs">{pub.volume}</span>
                                    )}
                                    <span className="text-slate-600 text-xs">·</span>
                                    <span className="font-mono text-xs text-teal-400/70">{pub.year}</span>
                                    <span className={cn(
                                        'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border',
                                        TIER_STYLE[pub.tier] ?? TIER_STYLE.Q3,
                                    )}>
                                        {pub.tier}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <a
                    href={profile.contact.scholar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                >
                    <ExternalLink className="w-4 h-4" />
                    View All Publications on Google Scholar
                </a>
            </div>
        </SectionWrapper>
    );
}
