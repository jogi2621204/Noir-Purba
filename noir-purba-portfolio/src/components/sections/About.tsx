'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

export default function About()
{
    return (
        <SectionWrapper id="about" darker>
            <div className="grid lg:grid-cols-2 gap-16 items-start">

                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <SectionHeader
                        label="Profile"
                        title="About Me"
                    />
                    <p className="text-slate-300 text-base leading-relaxed">
                        {profile.bio}
                    </p>
                    <blockquote className="border-l-2 border-teal-500/60 pl-4">
                        <p className="font-display italic text-teal-200 text-base">{profile.motto}</p>
                    </blockquote>

                    <div className="pt-4 space-y-2">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Current Positions</h3>
                        {[profile.position, `Permanent Lecturer, ${profile.department}`, profile.institution].map((item) => (
                            <div key={item} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-4"
                >
                    <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-6">Education</h3>
                    {profile.education.map((edu, idx) => (
                        <div key={idx} className="glass-card p-5 hover:border-teal-500/30 transition-colors duration-300">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-lg">
                                    {edu.flag}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="font-semibold text-white text-sm">{edu.degree}</span>
                                        <span className="font-mono text-xs text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                                            {edu.years}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm">{edu.institution}</p>
                                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed italic">
                                        {edu.thesis}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
