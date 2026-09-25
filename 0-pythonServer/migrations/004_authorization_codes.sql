BEGIN;

CREATE TABLE IF NOT EXISTS authorization_codes (
    id BIGSERIAL PRIMARY KEY,
    request_uuid UUID NOT NULL UNIQUE,
    code_hash CHAR(64) NOT NULL,
    purpose VARCHAR(32) NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    terminal_id BIGINT REFERENCES terminals(id) ON DELETE SET NULL,
    client_name VARCHAR(64),
    status SMALLINT NOT NULL DEFAULT 1 CHECK (status IN (1, 2, 3, 4, 5)),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    consumed_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_authorization_codes_hash ON authorization_codes(code_hash);
CREATE INDEX IF NOT EXISTS idx_authorization_codes_request ON authorization_codes(request_uuid);
CREATE INDEX IF NOT EXISTS idx_authorization_codes_expires ON authorization_codes(expires_at);

ALTER TABLE auth_challenges
    ADD COLUMN IF NOT EXISTS authorization_code_id BIGINT
    REFERENCES authorization_codes(id) ON DELETE SET NULL;

COMMIT;
