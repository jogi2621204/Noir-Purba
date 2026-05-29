'use client';

import { motion } from 'framer-motion';
import { Waves, MapPin, Cpu, BarChart3 } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ElementType> = {
    Waves, MapPin, Cpu, BarChart3,
};

export default function ResearchFocus()
{
    return (
        <SectionWrapper id="research">
            <SectionHeader
                label="Research Areas"
                title="Research Focus"
                subtitle="Four pillars of scientific inquiry underpinning more than a decade of scholarly contribution."
            />

            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {profile.researchFocus.map((item, idx) => {
                    const Icon = ICON_MAP[item.icon];
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="glass-card p-6 group hover:border-teal-500/40 hover:teal-glow transition-all duration-300"
                        >
                            <div className={cn(
                                'w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br',
                                item.color,
                                'opacity-90 group-hover:opacity-100 transition-opacity',
                            )}>
                                {Icon && <Icon className="w-5 h-5 text-white" />}
                            </div>
                            <h3 className="font-semibold text-white text-base mb-2 leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}
