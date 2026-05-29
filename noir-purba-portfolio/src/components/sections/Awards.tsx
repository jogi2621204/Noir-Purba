'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Award, Globe, BookOpen } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

const CATEGORY_ICON: Record<string, React.ElementType> = {
    innovation:   Trophy,
    academic:     BookOpen,
    institutional: Award,
    communication: Star,
    grant:        Globe,
};

const CATEGORY_COLOR: Record<string, string> = {
    innovation:   'text-amber-400 bg-amber-400/10',
    academic:     'text-blue-400 bg-blue-400/10',
    institutional:'text-teal-400 bg-teal-400/10',
    communication:'text-purple-400 bg-purple-400/10',
    grant:        'text-emerald-400 bg-emerald-400/10',
};

export default function Awards()
{
    const sorted = [...profile.awards].sort((a, b) => b.year - a.year);

    return (
        <SectionWrapper id="awards" darker>
            <SectionHeader
                label="Honors & Recognition"
                title="Achievements"
                subtitle="National and international recognition for contributions in marine technology innovation, scientific writing, and teaching."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((award, idx) => {
                    const Icon  = CATEGORY_ICON[award.category] ?? Trophy;
                    const color = CATEGORY_COLOR[award.category] ?? CATEGORY_COLOR.innovation;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.06 }}
                            className="glass-card p-5 hover:border-teal-500/25 transition-colors duration-200"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h4 className="text-white text-sm font-semibold leading-snug">{award.title}</h4>
                                        <span className="font-mono text-xs text-teal-400 flex-shrink-0">{award.year}</span>
                                    </div>
                                    <p className="text-slate-500 text-xs">{award.org}</p>
                                    {award.context && (
                                        <p className="text-slate-400 text-xs mt-1.5 leading-relaxed italic">{award.context}</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
