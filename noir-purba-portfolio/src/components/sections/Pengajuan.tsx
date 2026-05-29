'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import type { SubmissionType } from '@/types';

const TABS: { value: SubmissionType; label: string; desc: string }[] = [
    { value: 'bimbingan', label: 'Thesis Supervision',     desc: 'Request supervision for your thesis or dissertation' },
    { value: 'judul',     label: 'Title Proposal',         desc: 'Submit a research title for review and approval' },
    { value: 'magang',    label: 'Internship Application', desc: 'Request a recommendation or endorsement letter for internship' },
];

const STUDY_PROGRAMS = [
    'Marine Science',
    'Oceanography',
    'Fisheries',
    'Aquatic Resource Management',
    'Other',
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

const EMPTY_FORM = {
    student_name: '',
    student_nim: '',
    student_email: '',
    student_phone: '',
    study_program: '',
    semester: '',
    subject: '',
    description: '',
};

export default function Pengajuan()
{
    const [tab, setTab]           = useState<SubmissionType>('bimbingan');
    const [form, setForm]         = useState(EMPTY_FORM);
    const [state, setState]       = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)
    {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent)
    {
        e.preventDefault();
        setState('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/submissions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, type: tab }),
            });

            if (!res.ok) {
                const data = await res.json() as { error?: string };
                throw new Error(data.error ?? 'An error occurred. Please try again.');
            }

            setState('success');
            setForm(EMPTY_FORM);
        } catch (err) {
            setState('error');
            setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred.');
        }
    }

    const activeTab = TABS.find((t) => t.value === tab)!;

    return (
        <SectionWrapper id="pengajuan" darker>
            <SectionHeader
                label="Academic Services"
                title="Student Services Portal"
                subtitle="Submit thesis supervision requests, title proposals, or internship applications directly. Every submission is reviewed and responded to via email."
            />

            <div className="max-w-3xl mx-auto">
                <div className="flex gap-2 mb-8 p-1 bg-ocean-900/60 rounded-2xl border border-ocean-700/40">
                    {TABS.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => { setTab(t.value); setState('idle'); }}
                            className={cn(
                                'flex-1 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-center',
                                tab === t.value
                                    ? 'bg-teal-500 text-ocean-950 shadow-lg shadow-teal-500/20'
                                    : 'text-slate-400 hover:text-white',
                            )}
                        >
                            <span className="hidden sm:block">{t.label}</span>
                            <span className="sm:hidden">{t.label.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {state === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-10 text-center"
                        >
                            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                            <h3 className="font-display text-xl text-white font-bold mb-2">Submission Received</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Your request has been received and will be reviewed within 1 to 3 business days.
                                A notification will be sent to the email address you provided.
                            </p>
                            <button onClick={() => setState('idle')} className="btn-ghost text-sm">
                                Submit Another
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key={tab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.25 }}
                            onSubmit={handleSubmit}
                            className="glass-card p-6 md:p-8 space-y-5"
                        >
                            <div className="mb-2 pb-4 border-b border-ocean-600/30">
                                <p className="text-slate-400 text-sm">{activeTab.desc}</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label-ocean">Full Name <span className="text-red-400">*</span></label>
                                    <input required name="student_name" value={form.student_name} onChange={handleChange} placeholder="Name as on student ID" className="input-ocean" />
                                </div>
                                <div>
                                    <label className="label-ocean">Student ID (NIM) <span className="text-red-400">*</span></label>
                                    <input required name="student_nim" value={form.student_nim} onChange={handleChange} placeholder="Student identification number" className="input-ocean" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label-ocean">Active Email <span className="text-red-400">*</span></label>
                                    <input required type="email" name="student_email" value={form.student_email} onChange={handleChange} placeholder="your@university.ac.id" className="input-ocean" />
                                </div>
                                <div>
                                    <label className="label-ocean">WhatsApp Number</label>
                                    <input name="student_phone" value={form.student_phone} onChange={handleChange} placeholder="+62 8xx xxxx xxxx" className="input-ocean" />
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label-ocean">Study Program <span className="text-red-400">*</span></label>
                                    <select required name="study_program" value={form.study_program} onChange={handleChange} className="input-ocean">
                                        <option value="">Select your program</option>
                                        {STUDY_PROGRAMS.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="label-ocean">Semester</label>
                                    <input type="number" min="1" max="14" name="semester" value={form.semester} onChange={handleChange} placeholder="e.g. 7" className="input-ocean" />
                                </div>
                            </div>

                            <div>
                                <label className="label-ocean">
                                    {tab === 'bimbingan' ? 'Research Topic' : tab === 'judul' ? 'Proposed Title' : 'Institution & Internship Position'}
                                    {' '}<span className="text-red-400">*</span>
                                </label>
                                <input
                                    required
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder={
                                        tab === 'bimbingan' ? 'Topic or research area of interest'
                                        : tab === 'judul' ? 'Your proposed research title'
                                        : 'Organisation name and target position'
                                    }
                                    className="input-ocean"
                                />
                            </div>

                            <div>
                                <label className="label-ocean">Additional Notes</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe your background, motivation, or any supporting information relevant to your request."
                                    className="textarea-ocean"
                                />
                            </div>

                            {state === 'error' && (
                                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25">
                                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-red-300 text-sm">{errorMsg}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={state === 'loading'}
                                className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {state === 'loading' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Submit Request
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-slate-600">
                                Your data is used solely for processing your academic request.
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </SectionWrapper>
    );
}
