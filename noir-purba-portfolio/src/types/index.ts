export type SubmissionType = 'bimbingan' | 'judul' | 'magang';
export type SubmissionStatus = 'pending' | 'approved' | 'revision' | 'denied';
export type ConsultationStatus = 'confirmed' | 'completed' | 'cancelled';

export interface Submission {
    id: string;
    type: SubmissionType;
    status: SubmissionStatus;
    student_name: string;
    student_nim: string;
    student_email: string;
    student_phone: string | null;
    study_program: string;
    semester: number | null;
    subject: string;
    description: string | null;
    extra: Record<string, unknown>;
    admin_notes: string | null;
    reviewed_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Consultation {
    id: string;
    submission_id: string | null;
    student_name: string;
    student_email: string;
    student_nim: string;
    type: SubmissionType;
    status: ConsultationStatus;
    scheduled_at: string;
    duration_min: number;
    notes: string | null;
    meeting_link: string | null;
    created_at: string;
    updated_at: string;
}

export interface SubmissionFormData {
    type: SubmissionType;
    student_name: string;
    student_nim: string;
    student_email: string;
    student_phone: string;
    study_program: string;
    semester: string;
    subject: string;
    description: string;
    extra: Record<string, string>;
}

export interface AdminUpdatePayload {
    status: SubmissionStatus;
    admin_notes?: string;
}

export interface DashboardStats {
    total: number;
    pending: number;
    approved: number;
    denied: number;
    revision: number;
    todayConsultations: number;
}
