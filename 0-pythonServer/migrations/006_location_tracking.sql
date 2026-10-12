CREATE TABLE IF NOT EXISTS location_settings (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    write_interval_seconds INTEGER NOT NULL DEFAULT 2 CHECK (write_interval_seconds IN (1,2,5,10,30,60)),
    tracking_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS current_locations (
    user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    terminal_id BIGINT NOT NULL REFERENCES terminals(id) ON DELETE CASCADE,
    longitude DOUBLE PRECISION NOT NULL CHECK (longitude BETWEEN -180 AND 180),
    latitude DOUBLE PRECISION NOT NULL CHECK (latitude BETWEEN -90 AND 90),
    altitude DOUBLE PRECISION,
    accuracy DOUBLE PRECISION CHECK (accuracy IS NULL OR accuracy >= 0),
    speed DOUBLE PRECISION CHECK (speed IS NULL OR speed >= 0),
    heading DOUBLE PRECISION,
    recorded_at TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_current_locations_recorded ON current_locations(recorded_at);
CREATE INDEX IF NOT EXISTS idx_current_locations_terminal ON current_locations(terminal_id);

CREATE TABLE IF NOT EXISTS track_segments (
    id BIGSERIAL PRIMARY KEY,
    segment_uuid UUID NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    terminal_id BIGINT NOT NULL REFERENCES terminals(id) ON DELETE CASCADE,
    track_date DATE NOT NULL,
    frequency_seconds INTEGER NOT NULL CHECK (frequency_seconds IN (1,2,5,10,30,60)),
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ NOT NULL,
    point_count INTEGER NOT NULL DEFAULT 0 CHECK (point_count BETWEEN 0 AND 1000),
    points JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_track_segments_user_time ON track_segments(user_id, started_at, ended_at);
CREATE INDEX IF NOT EXISTS idx_track_segments_user_date ON track_segments(user_id, track_date);
CREATE INDEX IF NOT EXISTS idx_track_segments_terminal_time ON track_segments(terminal_id, started_at);

CREATE TABLE IF NOT EXISTS location_shares (
    id BIGSERIAL PRIMARY KEY,
    share_uuid UUID NOT NULL UNIQUE,
    owner_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    grantee_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    share_type VARCHAR(16) NOT NULL CHECK (share_type IN ('realtime','history')),
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (owner_user_id <> grantee_user_id),
    CHECK (ends_at >= starts_at)
);
CREATE INDEX IF NOT EXISTS idx_location_shares_owner ON location_shares(owner_user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_location_shares_grantee ON location_shares(grantee_user_id, expires_at);
