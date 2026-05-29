'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, ExternalLink, Globe, FileText, MessageSquare } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { profile } from '@/data/profile';

const CONTACT_ITEMS = [
    {
        icon: Mail,
        label: 'Official Email',
        value: profile.contact.email,
        href: `mailto:${profile.contact.email}`,
        note: 'For academic correspondence and professional consultation',
    },
    {
        icon: MapPin,
        label: 'Office Address',
        value: 'Dept. of Marine Science, FPIK Unpad\nJl. Raya Bandung Sumedang Km. 21\nJatinangor, Sumedang 45363',
        href: null,
        note: 'Universitas Padjadjaran, West Java, Indonesia',
    },
];

const EXTERNAL_LINKS = [
    {
        label: 'Google Scholar',
        desc: `${profile.metrics.citations.toLocaleString()} citations · h-index ${profile.metrics.hIndex}`,
        href: profile.contact.scholar,
        color: 'text-blue-400',
    },
    {
        label: 'ResearchGate',
        desc: 'Research profile and article downloads',
        href: profile.contact.researchgate,
        color: 'text-teal-400',
    },
    {
        label: 'The Conversation',
        desc: 'Science communication and public articles',
        href: profile.contact.theconversation,
        color: 'text-emerald-400',
    },
    {
        label: 'LinkedIn',
        desc: 'Professional network and collaborations',
        href: profile.contact.linkedin,
        color: 'text-sky-400',
    },
    {
        label: 'PODC',
        desc: 'Padjadjaran Oceanographic Data Centre',
        href: profile.contact.podc,
        color: 'text-indigo-400',
    },
];

export default function Contact()
{
    return (
        <SectionWrapper id="contact">
            <SectionHeader
                label="Contact"
                title="Get in Touch"
                subtitle="Open for research discussions, international collaborations, speaking invitations, and professional consulting."
            />

            <div className="grid lg:grid-cols-2 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                >
                    {CONTACT_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const content = (
                            <div className="glass-card p-5 hover:border-teal-500/30 transition-colors duration-200">
                                <div className="flex items-start gap-4">
                                    <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-4 h-4 text-teal-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                                        <p className="text-white text-sm font-medium whitespace-pre-line leading-relaxed">{item.value}</p>
                                        <p className="text-slate-500 text-xs mt-1">{item.note}</p>
                                    </div>
                                </div>
                            </div>
                        );

                        return item.href ? (
                            <a key={item.label} href={item.href}>{content}</a>
                        ) : (
                            <div key={item.label}>{content}</div>
                        );
                    })}

                    <div className="glass-card p-5">
                        <div className="flex items-start gap-4">
                            <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="w-4 h-4 text-teal-400" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Office Hours</p>
                                <p className="text-white text-sm font-medium">Monday through Friday, 08:00 to 16:00 WIB</p>
                                <p className="text-slate-500 text-xs mt-1">Email responses within 1 to 2 business days</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">Academic Platforms</p>
                    <div className="space-y-3">
                        {EXTERNAL_LINKS.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-4 flex items-center justify-between group hover:border-teal-500/30 transition-colors duration-200"
                            >
                                <div className="flex items-center gap-3">
                                    <Globe className={`w-4 h-4 ${link.color}`} />
                                    <div>
                                        <p className="text-white text-sm font-medium">{link.label}</p>
                                        <p className="text-slate-500 text-xs">{link.desc}</p>
                                    </div>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-teal-400 transition-colors" />
                            </a>
                        ))}
                    </div>

                    <div className="mt-6 glass-card p-5 border-teal-500/20">
                        <div className="flex items-start gap-3">
                            <FileText className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-white text-sm font-semibold mb-1">Curriculum Vitae</p>
                                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                                    A full CV document is available on request via official email.
                                </p>
                                <a href={`mailto:${profile.contact.email}?subject=Request%20CV%20Noir%20Purba`} className="btn-primary text-xs">
                                    <Mail className="w-3.5 h-3.5" />
                                    Request CV
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
