'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

export default function Teaching()
{
    return (
        <SectionWrapper id="teaching">
            <SectionHeader
                label="Teaching"
                title="Universities & Courses"
                subtitle="Lecturing at seven universities across Indonesia and Malaysia."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.teaching.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        className="glass-card p-5 hover:border-teal-500/30 transition-colors duration-200"
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                                <GraduationCap className="w-4 h-4 text-teal-400" />
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-semibold leading-snug">{item.university}</h4>
                                <span className="text-slate-500 text-xs">{item.country}</span>
                            </div>
                        </div>
                        <div className="space-y-1.5 pl-1">
                            {item.courses.map((course) => (
                                <div key={course} className="flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-teal-500/60 flex-shrink-0" />
                                    <span className="text-slate-400 text-xs">{course}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
