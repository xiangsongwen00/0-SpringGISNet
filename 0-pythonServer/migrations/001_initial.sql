BEGIN;

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    user_uuid UUID NOT NULL UNIQUE,
    username VARCHAR(32) NOT NULL,
    username_normalized VARCHAR(32) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    status SMALLINT NOT NULL DEFAULT 1 CHECK (status IN (1, 2, 3, 4)),
    password_changed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id BIGSERIAL PRIMARY KEY,
    session_uuid UUID NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    terminal_id BIGINT,
    access_token_hash CHAR(64) NOT NULL UNIQUE,
    refresh_token_hash CHAR(64) NOT NULL UNIQUE,
    client_type VARCHAR(32) NOT NULL DEFAULT 'web',
    access_expires_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_seen_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_active_access ON sessions(access_token_hash)
    WHERE revoked_at IS NULL;

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    terminal_id BIGINT,
    event_type VARCHAR(64) NOT NULL,
    result VARCHAR(32) NOT NULL,
    ip_hash CHAR(64),
    detail_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_event ON audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);

COMMIT;

