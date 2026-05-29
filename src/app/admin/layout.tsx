import type { ReactNode } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
    title: 'Admin Dashboard · Noir P. Purba',
};

export default function AdminLayout({ children }: { children: ReactNode })
{
    return (
        <div className="min-h-screen bg-ocean-950 flex">
            <AdminSidebar />
            <main className="flex-1 min-w-0 p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
}
