import { createServiceClient } from '@/lib/supabase/server';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

async function fetchStats()
{
    const supabase = createServiceClient();

    const [total, pending, approved, denied] = await Promise.all([
        supabase.from('submissions').select('*', { count: 'exact', head: true }),
        supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
        supabase.from('submissions').select('*', { count: 'exact', head: true }).eq('status', 'denied'),
    ]);

    return {
        total:    total.count    ?? 0,
        pending:  pending.count  ?? 0,
        approved: approved.count ?? 0,
        denied:   denied.count   ?? 0,
    };
}

async function fetchRecentSubmissions()
{
    const supabase = createServiceClient();
    const { data } = await supabase
        .from('submissions')
        .select('id, student_name, type, subject, status, created_at')
        .order('created_at', { ascending: false })
        .limit(8);
    return data ?? [];
}

const TYPE_LABEL: Record<string, string> = {
    bimbingan: 'Thesis Supervision',
    judul:     'Title Proposal',
    magang:    'Internship Application',
};

const STATUS_STYLE: Record<string, string> = {
    pending:  'bg-amber-500/20 text-amber-300',
    approved: 'bg-emerald-500/20 text-emerald-300',
    revision: 'bg-blue-500/20 text-blue-300',
    denied:   'bg-red-500/20 text-red-300',
};

const STATUS_LABEL: Record<string, string> = {
    pending:  'Pending',
    approved: 'Approved',
    revision: 'Revision',
    denied:   'Not Approved',
};

export default async function DashboardPage()
{
    const [stats, recent] = await Promise.all([fetchStats(), fetchRecentSubmissions()]);

    const STAT_CARDS = [
        { label: 'Total Submissions', value: stats.total,    icon: FileText,    color: 'text-teal-400 bg-teal-500/10' },
        { label: 'Pending Review',    value: stats.pending,  icon: Clock,       color: 'text-amber-400 bg-amber-500/10' },
        { label: 'Approved',          value: stats.approved, icon: CheckCircle, color: 'text-emerald-400 bg-emerald-500/10' },
        { label: 'Not Approved',      value: stats.denied,   icon: XCircle,     color: 'text-red-400 bg-red-500/10' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Overview</h1>
                <p className="text-slate-500 text-sm mt-1">Academic portal activity at a glance.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STAT_CARDS.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="glass-card p-5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                            <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">{value}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{label}</div>
                    </div>
                ))}
            </div>

            <div className="glass-card overflow-hidden">
                <div className="px-6 py-4 border-b border-ocean-600/30 flex items-center justify-between">
                    <h2 className="text-white font-semibold text-sm">Recent Submissions</h2>
                    <a href="/admin/dashboard/submissions" className="text-teal-400 text-xs hover:underline">
                        View all →
                    </a>
                </div>
                <div className="divide-y divide-ocean-700/30">
                    {recent.map((row) => (
                        <div key={row.id as string} className="px-6 py-3.5 flex items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">{row.student_name as string}</p>
                                <p className="text-slate-500 text-xs truncate">{row.subject as string}</p>
                            </div>
                            <span className="text-slate-600 text-xs hidden sm:block">
                                {TYPE_LABEL[row.type as string] ?? (row.type as string)}
                            </span>
                            <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full ${STATUS_STYLE[row.status as string] ?? ''}`}>
                                {STATUS_LABEL[row.status as string] ?? (row.status as string)}
                            </span>
                        </div>
                    ))}
                    {recent.length === 0 && (
                        <div className="px-6 py-8 text-center text-slate-600 text-sm">
                            No submissions yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
