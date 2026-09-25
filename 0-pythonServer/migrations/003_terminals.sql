BEGIN;

CREATE TABLE IF NOT EXISTS terminals (
    id BIGSERIAL PRIMARY KEY,
    terminal_uuid UUID NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    system_name VARCHAR(64) NOT NULL,
    display_name VARCHAR(128),
    public_key TEXT NOT NULL,
    public_key_fingerprint CHAR(64) NOT NULL UNIQUE,
    status SMALLINT NOT NULL DEFAULT 1 CHECK (status IN (1, 2, 3, 4)),
    key_version INTEGER NOT NULL DEFAULT 1,
    bound_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_verified_at TIMESTAMPTZ,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_terminals_user ON terminals(user_id);

CREATE TABLE IF NOT EXISTS auth_challenges (
    id BIGSERIAL PRIMARY KEY,
    challenge_uuid UUID NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    terminal_id BIGINT REFERENCES terminals(id) ON DELETE SET NULL,
    challenge_type VARCHAR(32) NOT NULL,
    nonce_hash CHAR(64) NOT NULL,
    pending_public_key TEXT,
    public_key_fingerprint CHAR(64),
    status SMALLINT NOT NULL DEFAULT 1 CHECK (status IN (1, 2, 3, 4)),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_auth_challenges_user ON auth_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_auth_challenges_expires ON auth_challenges(expires_at);

COMMIT;
