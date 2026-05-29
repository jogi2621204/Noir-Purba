'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Waves, Trash2, Cpu, BarChart3, FileText, Globe } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

const SERVICES = [
    {
        icon: Waves,
        title: 'Physical Oceanography',
        desc: 'Water mass analysis, current circulation, wave dynamics, and thermohaline processes for research and industry applications.',
    },
    {
        icon: Trash2,
        title: 'Marine Debris Studies',
        desc: 'Lagrangian trajectory modelling, in-situ sampling campaigns, and national or regional marine litter action plan development.',
    },
    {
        icon: Cpu,
        title: 'Low-Cost Ocean Instruments',
        desc: 'Design, fabrication, and field deployment of IoT-based ocean monitoring instruments tailored to project-specific requirements.',
    },
    {
        icon: BarChart3,
        title: 'Marine Spatial Planning',
        desc: 'Zoning plan development for coastal and ocean areas for regional governments, the Ministry of Marine Affairs, and private sector clients.',
    },
    {
        icon: FileText,
        title: 'Scientific & Policy Writing',
        desc: 'International journal manuscript preparation, policy briefs, and technical reports for national and international agencies.',
    },
    {
        icon: Globe,
        title: 'Coastal Environmental Assessment',
        desc: 'Pollution assessment, coastal vulnerability analysis, and ecosystem evaluation for marine infrastructure projects.',
    },
];

const PARTNERS = [
    'FAO', 'UNDP', 'World Bank', 'British Council', 'Nippon Foundation',
    'Ministry of Marine Affairs & Fisheries', 'West Java Provincial Government', 'PLN Indonesia', 'BRIN',
];

export default function Consultant()
{
    return (
        <SectionWrapper id="consultant">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div>
                    <SectionHeader
                        label="Consulting Services"
                        title="Open for Professional Engagements"
                    />
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        With a track record of collaboration with FAO, UNDP, the World Bank, and multiple government ministries, I provide scientific and technical consulting services in marine science for government institutions, private sector clients, and international research organisations.
                    </p>

                    <div className="space-y-2 mb-8">
                        {[
                            'Available for short-term and long-term engagements',
                            'Field experience across 11 countries and diverse marine ecosystems',
                            'Established partnerships with UN agencies and central government bodies',
                            'Response within 1 to 2 business days',
                        ].map((point) => (
                            <div key={point} className="flex items-start gap-2.5">
                                <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                                <span className="text-slate-300 text-sm">{point}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-8">
                        <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                            Previous Partners & Clients
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {PARTNERS.map((p) => (
                                <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-ocean-800/60 border border-ocean-600/40 text-slate-400">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>

                    <a href="#contact" className="btn-primary">
                        Start a Conversation
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {SERVICES.map((svc, idx) => {
                        const Icon = svc.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: idx * 0.08 }}
                                className="glass-card p-5 hover:border-teal-500/30 transition-colors duration-200"
                            >
                                <Icon className="w-5 h-5 text-teal-400 mb-3" />
                                <h4 className="text-white text-sm font-semibold mb-1.5 leading-snug">{svc.title}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">{svc.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
}
