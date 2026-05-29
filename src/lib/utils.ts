import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isToday, isTomorrow } from 'date-fns';
import type { SubmissionType, SubmissionStatus } from '@/types';

export function cn(...inputs: ClassValue[]): string
{
    return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string
{
    return format(new Date(dateStr), 'd MMMM yyyy');
}

export function formatDateTime(dateStr: string): string
{
    return format(new Date(dateStr), "d MMMM yyyy 'at' HH:mm");
}

export function relativeDay(dateStr: string): string
{
    const d = new Date(dateStr);
    if (isToday(d)) return 'Today';
    if (isTomorrow(d)) return 'Tomorrow';
    return format(d, 'd MMM yyyy');
}

export const TYPE_LABEL: Record<SubmissionType, string> = {
    bimbingan: 'Thesis Supervision',
    judul:     'Title Proposal',
    magang:    'Internship Application',
};

export const STATUS_LABEL: Record<SubmissionStatus, string> = {
    pending:  'Pending Review',
    approved: 'Approved',
    revision: 'Revision Required',
    denied:   'Not Approved',
};

export const STATUS_COLOR: Record<SubmissionStatus, string> = {
    pending:  'bg-amber-500/20 text-amber-300 border-amber-500/30',
    approved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    revision: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    denied:   'bg-red-500/20 text-red-300 border-red-500/30',
};

export const TYPE_COLOR: Record<SubmissionType, string> = {
    bimbingan: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    judul:     'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    magang:    'bg-purple-500/20 text-purple-300 border-purple-500/30',
};
