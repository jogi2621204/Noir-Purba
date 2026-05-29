-- ============================================================
-- AcademiCore: Noir Purba Portfolio — Initial Schema
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE submission_type AS ENUM ('bimbingan', 'judul', 'magang');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'revision', 'denied');

-- ── Submissions ──────────────────────────────────────────────
CREATE TABLE submissions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type            submission_type NOT NULL,
    status          submission_status NOT NULL DEFAULT 'pending',

    -- Student identity
    student_name    TEXT NOT NULL,
    student_nim     TEXT NOT NULL,
    student_email   TEXT NOT NULL,
    student_phone   TEXT,
    study_program   TEXT NOT NULL,
    semester        INTEGER,

    -- Core content
    subject         TEXT NOT NULL,
    description     TEXT,
    extra           JSONB DEFAULT '{}',

    -- Admin response
    admin_notes     TEXT,
    reviewed_at     TIMESTAMPTZ,

    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Consultations (scheduled sessions) ───────────────────────
CREATE TABLE consultations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id   UUID REFERENCES submissions(id) ON DELETE SET NULL,

    student_name    TEXT NOT NULL,
    student_email   TEXT NOT NULL,
    student_nim     TEXT NOT NULL,
    type            submission_type NOT NULL,
    status          TEXT NOT NULL DEFAULT 'confirmed'
                        CHECK (status IN ('confirmed', 'completed', 'cancelled')),

    scheduled_at    TIMESTAMPTZ NOT NULL,
    duration_min    INTEGER NOT NULL DEFAULT 60,
    notes           TEXT,
    meeting_link    TEXT,

    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Email logs ────────────────────────────────────────────────
CREATE TABLE email_logs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id   UUID REFERENCES submissions(id) ON DELETE SET NULL,
    recipient       TEXT NOT NULL,
    template        TEXT NOT NULL,
    resend_id       TEXT,
    status          TEXT NOT NULL DEFAULT 'sent',
    sent_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── updated_at trigger ────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE TRIGGER submissions_updated_at
    BEFORE UPDATE ON submissions
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER consultations_updated_at
    BEFORE UPDATE ON consultations
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Indexes ───────────────────────────────────────────────────
CREATE INDEX idx_submissions_status   ON submissions(status);
CREATE INDEX idx_submissions_type     ON submissions(type);
CREATE INDEX idx_submissions_created  ON submissions(created_at DESC);
CREATE INDEX idx_consultations_date   ON consultations(scheduled_at);
CREATE INDEX idx_consultations_status ON consultations(status);

-- ── Row Level Security ────────────────────────────────────────
ALTER TABLE submissions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs    ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a submission (public form)
CREATE POLICY "public_insert_submissions"
    ON submissions FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated admins can read/update/delete
CREATE POLICY "admin_all_submissions"
    ON submissions FOR ALL TO authenticated
    USING (true);

CREATE POLICY "admin_all_consultations"
    ON consultations FOR ALL TO authenticated
    USING (true);

CREATE POLICY "admin_all_email_logs"
    ON email_logs FOR ALL TO authenticated
    USING (true);
