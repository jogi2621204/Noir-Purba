'use client';

import { motion } from 'framer-motion';
import { Trophy, Tag, ExternalLink } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

export default function Innovations()
{
    const featured  = profile.innovations.find((i) => i.highlight);
    const secondary = profile.innovations.filter((i) => !i.highlight);

    return (
        <SectionWrapper id="innovations" darker>
            <SectionHeader
                label="Technological Innovations"
                title="Ocean Instruments & Platforms"
                subtitle="Low-cost marine monitoring technologies now deployed in Indonesia, the Philippines, Fiji, and Germany."
            />

            {featured && (
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-7 md:p-10 mb-6 border-teal-500/30 teal-glow"
                >
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                                <span className="text-2xl font-mono font-black text-white">R</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <h3 className="font-display text-2xl font-bold text-white">{featured.name}</h3>
                                <span className="text-xs font-mono bg-teal-500/15 text-teal-300 border border-teal-500/25 px-2.5 py-1 rounded-full">
                                    {featured.status}
                                </span>
                                <span className="text-xs font-mono text-slate-500">est. {featured.year}</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-2 font-medium">{featured.fullName}</p>
                            <p className="text-slate-300 text-sm leading-relaxed mb-5">{featured.description}</p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {featured.tags.map((tag) => (
                                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-ocean-700/60 text-slate-400 border border-ocean-600/40">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-2">
                                {featured.awards.map((award) => (
                                    <div key={award} className="flex items-start gap-2">
                                        <Trophy className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-xs text-amber-300/80">{award}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {secondary.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="glass-card p-6 flex flex-col gap-4 hover:border-teal-500/30 transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="font-bold text-white text-base">{item.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{item.fullName}</p>
                            </div>
                            <span className="text-xs font-mono text-teal-400 whitespace-nowrap">{item.year}</span>
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.description}</p>

                        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-ocean-600/30">
                            {item.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-ocean-700/60 text-slate-500 border border-ocean-600/40">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-1.5">
                            {item.awards.slice(0, 2).map((award) => (
                                <div key={award} className="flex items-start gap-1.5">
                                    <Trophy className="w-3 h-3 text-amber-400/70 mt-0.5 flex-shrink-0" />
                                    <span className="text-[11px] text-amber-300/60 leading-relaxed">{award}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
