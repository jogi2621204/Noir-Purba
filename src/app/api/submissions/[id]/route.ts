import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';
import { sendSubmissionUpdated } from '@/lib/email';
import type { Submission } from '@/types';

const UpdateSchema = z.object({
    status:      z.enum(['pending', 'approved', 'revision', 'denied']),
    admin_notes: z.string().max(1000).optional(),
});

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
)
{
    try {
        const { id } = await params;
        const body   = await request.json() as unknown;
        const data   = UpdateSchema.parse(body);

        const supabase = createServiceClient();

        const { data: row, error } = await supabase
            .from('submissions')
            .update({
                status:      data.status,
                admin_notes: data.admin_notes ?? null,
                reviewed_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single();

        if (error !== null) {
            return NextResponse.json({ error: 'Failed to update submission.' }, { status: 500 });
        }

        // Only notify student when status changes to a final or revision state
        if (data.status !== 'pending') {
            sendSubmissionUpdated(row as Submission).catch((err: unknown) => {
                console.error('Email update error:', err);
            });
        }

        return NextResponse.json({ success: true, data: row });

    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid request data.', details: err.flatten() }, { status: 400 });
        }
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
)
{
    const { id }   = await params;
    const supabase = createServiceClient();

    const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .eq('id', id)
        .single();

    if (error !== null) {
        return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
    }

    return NextResponse.json(data);
}
