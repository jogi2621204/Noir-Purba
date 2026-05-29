'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Waves, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin()
{
    const router              = useRouter();
    const [email, setEmail]   = useState('');
    const [pass, setPass]     = useState('');
    const [loading, setLoad]  = useState(false);
    const [error, setError]   = useState('');

    async function handleSubmit(e: React.FormEvent)
    {
        e.preventDefault();
        setLoad(true);
        setError('');

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password: pass });

        if (authError !== null) {
            setError('Invalid email or password. Please try again.');
            setLoad(false);
            return;
        }

        router.push('/admin/dashboard');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-ocean-950 px-4">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-4">
                        <Waves className="w-6 h-6 text-teal-400" />
                    </div>
                    <h1 className="text-xl font-bold text-white">Admin Portal</h1>
                    <p className="text-slate-500 text-sm mt-1">Noir P. Purba · Academic Dashboard</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="glass-card p-6 space-y-4"
                >
                    <div>
                        <label className="label-ocean">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="input-ocean pl-9"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="label-ocean">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="password"
                                required
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="••••••••"
                                className="input-ocean pl-9"
                            />
                        </div>
                    </div>

                    {error !== '' && (
                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/25">
                            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
