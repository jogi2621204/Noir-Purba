'use client';

import { motion } from 'framer-motion';
import { Anchor, MapPin } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

export default function Expeditions()
{
    return (
        <SectionWrapper id="expeditions">
            <SectionHeader
                label="Scientific Expeditions"
                title="Voyages & Field Work"
                subtitle="Field experience aboard national and international research vessels, from the Java Sea to the North Atlantic Ocean."
            />

            <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-ocean-600/30 to-transparent" />

                <div className="space-y-6 pl-16">
                    {profile.expeditions.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative"
                        >
                            <div className="absolute -left-10 top-4 w-8 h-8 rounded-full bg-ocean-800 border-2 border-teal-500/50 flex items-center justify-center">
                                <Anchor className="w-3.5 h-3.5 text-teal-400" />
                            </div>

                            <div className="glass-card p-5 hover:border-teal-500/30 transition-colors duration-200">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <span className="font-mono text-xs font-bold text-teal-400">{exp.year}</span>
                                            <span className="text-slate-600 text-xs">·</span>
                                            <h4 className="text-white text-sm font-semibold">{exp.name}</h4>
                                        </div>
                                        <p className="text-slate-400 text-xs font-medium mb-1">{exp.vessel}</p>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <MapPin className="w-3 h-3 text-slate-500" />
                                            <span className="text-slate-500 text-xs">{exp.location}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs italic leading-relaxed">{exp.role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
