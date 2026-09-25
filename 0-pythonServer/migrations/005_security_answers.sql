BEGIN;

CREATE TABLE IF NOT EXISTS security_answers (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id VARCHAR(64) NOT NULL,
    answer_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_security_answers_user_question UNIQUE (user_id, question_id)
);
CREATE INDEX IF NOT EXISTS idx_security_answers_user ON security_answers(user_id);

COMMIT;
