'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Waves, LayoutDashboard, FileText, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const NAV = [
    { label: 'Overview',    href: '/admin/dashboard',             icon: LayoutDashboard },
    { label: 'Submissions', href: '/admin/dashboard/submissions', icon: FileText },
];

export default function AdminSidebar()
{
    const pathname = usePathname();
    const router   = useRouter();

    async function handleSignOut()
    {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/admin/login');
    }

    return (
        <aside className="w-56 flex-shrink-0 bg-ocean-900/60 border-r border-ocean-700/40 flex flex-col py-6">
            <div className="px-5 mb-8 flex items-center gap-2.5">
                <Waves className="w-5 h-5 text-teal-400" />
                <div>
                    <p className="text-white text-sm font-semibold leading-tight">Admin</p>
                    <p className="text-slate-500 text-xs">Noir P. Purba</p>
                </div>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {NAV.map(({ label, href, icon: Icon }) => (
                    <a
                        key={href}
                        href={href}
                        className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150',
                            pathname === href
                                ? 'bg-teal-500/15 text-teal-300'
                                : 'text-slate-400 hover:text-white hover:bg-ocean-700/50',
                        )}
                    >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {label}
                    </a>
                ))}
            </nav>

            <div className="px-3 mt-4">
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
