BEGIN;

CREATE TABLE IF NOT EXISTS user_consents (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    terms_version VARCHAR(32) NOT NULL,
    privacy_version VARCHAR(32) NOT NULL,
    client_type VARCHAR(32) NOT NULL,
    consented_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_user_consents_user ON user_consents(user_id);

COMMIT;
