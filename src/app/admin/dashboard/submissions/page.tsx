import SubmissionsTable from '@/components/admin/SubmissionsTable';

export const metadata = {
    title: 'Submissions · Admin Dashboard',
};

export default function SubmissionsPage()
{
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Submissions</h1>
                <p className="text-slate-500 text-sm mt-1">Review and manage all student academic requests.</p>
            </div>
            <SubmissionsTable />
        </div>
    );
}
