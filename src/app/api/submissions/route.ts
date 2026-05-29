import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';
import { sendSubmissionReceived } from '@/lib/email';
import type { Submission } from '@/types';

const SubmissionSchema = z.object({
    type:          z.enum(['bimbingan', 'judul', 'magang']),
    student_name:  z.string().min(2).max(120),
    student_nim:   z.string().min(5).max(30),
    student_email: z.string().email(),
    student_phone: z.string().max(20).optional().default(''),
    study_program: z.string().min(2).max(80),
    semester:      z.coerce.number().int().min(1).max(14).optional(),
    subject:       z.string().min(5).max(300),
    description:   z.string().max(2000).optional().default(''),
});

export async function POST(request: Request)
{
    try {
        const body = await request.json() as unknown;
        const data = SubmissionSchema.parse(body);

        const supabase = createServiceClient();

        const { data: row, error } = await supabase
            .from('submissions')
            .insert({
                type:          data.type,
                student_name:  data.student_name,
                student_nim:   data.student_nim,
                student_email: data.student_email,
                student_phone: data.student_phone || null,
                study_program: data.study_program,
                semester:      data.semester ?? null,
                subject:       data.subject,
                description:   data.description || null,
            })
            .select()
            .single();

        if (error !== null) {
            console.error('Supabase insert error:', error.message);
            return NextResponse.json({ error: 'Failed to save submission.' }, { status: 500 });
        }

        // Send emails asynchronously — do not block response
        sendSubmissionReceived(row as Submission).catch((err: unknown) => {
            console.error('Email send error:', err);
        });

        return NextResponse.json({ id: (row as Submission).id }, { status: 201 });

    } catch (err) {
        if (err instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid request data.', details: err.flatten() }, { status: 400 });
        }
        console.error('Unexpected error:', err);
        return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
    }
}

export async function GET(request: Request)
{
    const supabase = createServiceClient();
    const { searchParams } = new URL(request.url);

    const type   = searchParams.get('type');
    const status = searchParams.get('status');
    const page   = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const limit  = 20;
    const from   = (page - 1) * limit;

    let query = supabase
        .from('submissions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, from + limit - 1);

    if (type !== null && type !== 'all')   query = query.eq('type', type);
    if (status !== null && status !== 'all') query = query.eq('status', status);

    const { data, error, count } = await query;

    if (error !== null) {
        return NextResponse.json({ error: 'Failed to load data.' }, { status: 500 });
    }

    return NextResponse.json({ data, total: count ?? 0, page, limit });
}
