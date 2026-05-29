'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

export default function GlobalFootprint()
{
    return (
        <SectionWrapper id="global" darker>
            <SectionHeader
                label="International Collaborations"
                title="Global Footprint"
                subtitle={`Actively collaborating with researchers and institutions across ${profile.metrics.countriesCollaborated} countries.`}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.collaborations.map((col, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.07 }}
                        className="glass-card p-4 hover:border-teal-500/30 transition-colors duration-200"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0">{col.flag}</span>
                            <div className="min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-white text-sm font-semibold">{col.country}</span>
                                    <span className="text-[10px] font-mono text-teal-400/70 bg-teal-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                                        {col.type}
                                    </span>
                                </div>
                                <p className="text-slate-500 text-xs leading-relaxed">{col.institution}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
