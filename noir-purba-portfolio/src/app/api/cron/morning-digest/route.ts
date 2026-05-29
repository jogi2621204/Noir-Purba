import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { sendMorningDigest } from '@/lib/email';

// Runs daily at 05:00 WIB (22:00 UTC)
// Vercel Cron config is in vercel.json

export async function GET(request: Request)
{
    // Validate cron secret to prevent unauthorized triggers
    const authHeader = request.headers.get('authorization');
    const expected   = `Bearer ${process.env.CRON_SECRET}`;

    if (authHeader !== expected) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const supabase = createServiceClient();

        // Count pending submissions
        const { count: pendingCount } = await supabase
            .from('submissions')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending');

        // Fetch today's scheduled consultations
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const { data: consultations } = await supabase
            .from('consultations')
            .select('student_name, type, scheduled_at')
            .gte('scheduled_at', todayStart.toISOString())
            .lte('scheduled_at', todayEnd.toISOString())
            .eq('status', 'confirmed')
            .order('scheduled_at', { ascending: true });

        await sendMorningDigest(
            pendingCount ?? 0,
            consultations ?? [],
        );

        return NextResponse.json({
            success:    true,
            pending:    pendingCount ?? 0,
            consultations: (consultations ?? []).length,
            sentAt:     new Date().toISOString(),
        });

    } catch (err) {
        console.error('[Cron] Morning digest failed:', err);
        return NextResponse.json({ error: 'Internal error' }, { status: 500 });
    }
}
