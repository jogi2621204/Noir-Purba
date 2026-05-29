'use client';

import { useState, useCallback, useEffect } from 'react';
import { Loader2, ChevronLeft, ChevronRight, CheckCircle, XCircle, RefreshCw, X } from 'lucide-react';
import { cn, TYPE_LABEL, STATUS_LABEL, STATUS_COLOR, TYPE_COLOR } from '@/lib/utils';
import type { Submission, SubmissionType, SubmissionStatus } from '@/types';

const TYPE_FILTERS: { value: SubmissionType | 'all'; label: string }[] = [
    { value: 'all',       label: 'All Types' },
    { value: 'bimbingan', label: 'Thesis Supervision' },
    { value: 'judul',     label: 'Title Proposal' },
    { value: 'magang',    label: 'Internship Application' },
];

const STATUS_FILTERS: { value: SubmissionStatus | 'all'; label: string }[] = [
    { value: 'all',      label: 'All Statuses' },
    { value: 'pending',  label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'revision', label: 'Revision' },
    { value: 'denied',   label: 'Not Approved' },
];

interface ReviewModalState {
    submission: Submission;
    action: 'approved' | 'revision' | 'denied';
}

export default function SubmissionsTable()
{
    const [typeFilter,   setTypeFilter]   = useState<SubmissionType | 'all'>('all');
    const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all');
    const [page,         setPage]         = useState(1);
    const [submissions,  setSubmissions]  = useState<Submission[]>([]);
    const [total,        setTotal]        = useState(0);
    const [loading,      setLoading]      = useState(true);
    const [modal,        setModal]        = useState<ReviewModalState | null>(null);
    const [notes,        setNotes]        = useState('');
    const [saving,       setSaving]       = useState(false);

    const limit = 20;

    const fetchSubmissions = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page) });
        if (typeFilter !== 'all')   params.set('type', typeFilter);
        if (statusFilter !== 'all') params.set('status', statusFilter);

        const res  = await fetch(`/api/submissions?${params.toString()}`);
        const json = await res.json() as { data: Submission[]; total: number };
        setSubmissions(json.data ?? []);
        setTotal(json.total ?? 0);
        setLoading(false);
    }, [page, typeFilter, statusFilter]);

    useEffect(() => { void fetchSubmissions(); }, [fetchSubmissions]);

    function openModal(sub: Submission, action: ReviewModalState['action'])
    {
        setModal({ submission: sub, action });
        setNotes(sub.admin_notes ?? '');
    }

    function closeModal()
    {
        setModal(null);
        setNotes('');
    }

    async function handleReview()
    {
        if (modal === null) return;
        setSaving(true);

        await fetch(`/api/submissions/${modal.submission.id}`, {
            method:  'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ status: modal.action, admin_notes: notes || undefined }),
        });

        setSaving(false);
        closeModal();
        void fetchSubmissions();
    }

    const totalPages = Math.ceil(total / limit);

    const ACTION_LABEL: Record<ReviewModalState['action'], string> = {
        approved: 'Approve',
        revision: 'Request Revision',
        denied:   'Not Approve',
    };

    const ACTION_COLOR: Record<ReviewModalState['action'], string> = {
        approved: 'bg-emerald-500 hover:bg-emerald-400 text-white',
        revision: 'bg-blue-500 hover:bg-blue-400 text-white',
        denied:   'bg-red-500 hover:bg-red-400 text-white',
    };

    return (
        <>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex gap-1.5 flex-wrap">
                    {TYPE_FILTERS.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => { setTypeFilter(value); setPage(1); }}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150',
                                typeFilter === value
                                    ? 'bg-teal-500 text-ocean-950'
                                    : 'bg-ocean-800/60 border border-ocean-600/40 text-slate-400 hover:text-white',
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {STATUS_FILTERS.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => { setStatusFilter(value); setPage(1); }}
                            className={cn(
                                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150',
                                statusFilter === value
                                    ? 'bg-teal-500 text-ocean-950'
                                    : 'bg-ocean-800/60 border border-ocean-600/40 text-slate-400 hover:text-white',
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-5 h-5 text-teal-400 animate-spin" />
                    </div>
                ) : submissions.length === 0 ? (
                    <div className="text-center py-16 text-slate-600 text-sm">
                        No submissions found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-ocean-600/30">
                                    <th className="text-left px-5 py-3 text-xs font-mono uppercase tracking-wider text-slate-500">Student</th>
                                    <th className="text-left px-5 py-3 text-xs font-mono uppercase tracking-wider text-slate-500">Type</th>
                                    <th className="text-left px-5 py-3 text-xs font-mono uppercase tracking-wider text-slate-500 hidden md:table-cell">Subject</th>
                                    <th className="text-left px-5 py-3 text-xs font-mono uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="text-right px-5 py-3 text-xs font-mono uppercase tracking-wider text-slate-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-ocean-700/30">
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-ocean-800/20 transition-colors duration-100">
                                        <td className="px-5 py-3.5">
                                            <p className="text-white font-medium">{sub.student_name}</p>
                                            <p className="text-slate-500 text-xs">{sub.student_nim} · {sub.study_program}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={cn('text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border', TYPE_COLOR[sub.type])}>
                                                {TYPE_LABEL[sub.type]}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <p className="text-slate-300 text-xs max-w-xs truncate">{sub.subject}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={cn('text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border', STATUS_COLOR[sub.status])}>
                                                {STATUS_LABEL[sub.status]}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            {sub.status === 'pending' && (
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button onClick={() => openModal(sub, 'approved')} title="Approve" className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => openModal(sub, 'revision')} title="Request Revision" className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                                                        <RefreshCw className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => openModal(sub, 'denied')} title="Not Approve" className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                            {sub.status !== 'pending' && (
                                                <button onClick={() => openModal(sub, sub.status as ReviewModalState['action'])} className="text-xs text-slate-600 hover:text-teal-400 transition-colors">
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-5 py-3 border-t border-ocean-600/30 flex items-center justify-between">
                        <span className="text-slate-500 text-xs">{total} total</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-white disabled:opacity-30 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-slate-400 text-xs font-mono">{page} / {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-white disabled:opacity-30 transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {modal !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-ocean-900 border border-ocean-600/40 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-white font-semibold">{ACTION_LABEL[modal.action]}</h3>
                            <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-3 mb-5">
                            <div className="glass-card p-3.5">
                                <p className="text-white text-sm font-medium">{modal.submission.student_name}</p>
                                <p className="text-slate-500 text-xs mt-0.5">{modal.submission.subject}</p>
                            </div>

                            <div>
                                <label className="label-ocean">Notes for Student <span className="text-slate-600">(optional)</span></label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                    maxLength={1000}
                                    placeholder="Provide feedback or guidance for the student..."
                                    className="textarea-ocean"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={closeModal} className="btn-ghost flex-1 justify-center py-2.5">
                                Cancel
                            </button>
                            <button
                                onClick={() => { void handleReview(); }}
                                disabled={saving}
                                className={cn('flex-1 justify-center py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-60', ACTION_COLOR[modal.action])}
                            >
                                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {ACTION_LABEL[modal.action]}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
