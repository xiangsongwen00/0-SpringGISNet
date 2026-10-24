CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE SCHEMA IF NOT EXISTS history;

CREATE TABLE IF NOT EXISTS history.import_runs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    input_file TEXT NOT NULL,
    input_sha256 TEXT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ,
    status TEXT NOT NULL CHECK (status IN ('running','succeeded','failed')),
    record_count INTEGER NOT NULL DEFAULT 0,
    error TEXT
);
CREATE TABLE IF NOT EXISTS history.books (
    book_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS history.chapters (
    chapter_id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL REFERENCES history.books(book_id),
    chapter_index INTEGER NOT NULL CHECK (chapter_index >= 0),
    title TEXT NOT NULL,
    source_file TEXT NOT NULL,
    source_sha256 TEXT NOT NULL CHECK (source_sha256 ~ '^[a-f0-9]{64}$'),
    decoder TEXT NOT NULL,
    verification_status TEXT NOT NULL CHECK (verification_status IN ('decoded_unverified','verified_sample','metadata_only')),
    original_text TEXT,
    normalized_text TEXT,
    normalization_version TEXT NOT NULL DEFAULT 'nfkc-v1',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    import_run_id BIGINT NOT NULL REFERENCES history.import_runs(id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (book_id, chapter_index),
    CHECK ((verification_status = 'metadata_only' AND original_text IS NULL AND normalized_text IS NULL)
        OR (verification_status <> 'metadata_only' AND length(original_text) > 0 AND normalized_text IS NOT NULL))
);
CREATE TABLE IF NOT EXISTS history.paragraphs (
    chapter_id TEXT NOT NULL REFERENCES history.chapters(chapter_id) ON DELETE CASCADE,
    ordinal INTEGER NOT NULL CHECK (ordinal >= 0),
    original_text TEXT NOT NULL CHECK (length(original_text) > 0),
    normalized_text TEXT NOT NULL,
    PRIMARY KEY (chapter_id, ordinal)
);
CREATE INDEX IF NOT EXISTS chapters_book_idx ON history.chapters(book_id, chapter_index);
CREATE INDEX IF NOT EXISTS paragraphs_original_trgm ON history.paragraphs USING gin(original_text gin_trgm_ops);
CREATE INDEX IF NOT EXISTS paragraphs_normalized_trgm ON history.paragraphs USING gin(normalized_text gin_trgm_ops);

CREATE TABLE IF NOT EXISTS history.character_notes (
    chapter_id TEXT PRIMARY KEY REFERENCES history.chapters(chapter_id) ON DELETE CASCADE,
    source_sha256 TEXT NOT NULL,
    decoder TEXT NOT NULL,
    text_sha256 TEXT NOT NULL,
    mapping_version TEXT NOT NULL,
    record JSONB NOT NULL,
    reading_text TEXT NOT NULL,
    replacements INTEGER NOT NULL CHECK (replacements >= 0),
    unresolved INTEGER NOT NULL CHECK (unresolved >= 0),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS history.chapter_assets (
    chapter_id TEXT NOT NULL REFERENCES history.chapters(chapter_id) ON DELETE CASCADE,
    ordinal INTEGER NOT NULL CHECK (ordinal >= 0),
    kind TEXT NOT NULL CHECK (kind IN ('pict','object')),
    source_sha256 TEXT NOT NULL,
    decoder TEXT NOT NULL,
    raw_rtf_sha256 TEXT NOT NULL,
    start_byte INTEGER NOT NULL,
    end_byte INTEGER NOT NULL CHECK (end_byte > start_byte),
    parent_ordinal INTEGER,
    format TEXT NOT NULL,
    status TEXT NOT NULL,
    raw_group_sha256 TEXT NOT NULL,
    raw_group BYTEA NOT NULL,
    payload_sha256 TEXT,
    payload BYTEA,
    PRIMARY KEY (chapter_id, ordinal)
);

CREATE TABLE IF NOT EXISTS history_articles (
    id BIGSERIAL PRIMARY KEY,
    article_uuid UUID NOT NULL UNIQUE,
    path VARCHAR(1024) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    case_id VARCHAR(128),
    category_path JSONB NOT NULL DEFAULT '[]'::jsonb,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    sha256 CHAR(64) NOT NULL CHECK (sha256 ~ '^[a-f0-9]{64}$'),
    byte_size BIGINT NOT NULL CHECK (byte_size > 0),
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_history_articles_published_sort ON history_articles(published, sort_order);
CREATE INDEX IF NOT EXISTS idx_history_articles_case ON history_articles(case_id);
CREATE TABLE IF NOT EXISTS history_catalogs (
    catalog_key VARCHAR(64) PRIMARY KEY,
    payload JSONB NOT NULL,
    updated_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
