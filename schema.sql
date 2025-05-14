CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Users (
    user_id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name     VARCHAR(50)  NOT NULL,
    last_name      VARCHAR(50)  NOT NULL,
    email          VARCHAR(255) UNIQUE NOT NULL,
    password       VARCHAR(255) NOT NULL,
    phone          VARCHAR(20),
    date_of_birth  DATE,
    referral_code  VARCHAR(60)  UNIQUE,
    user_type      VARCHAR(20)  CHECK (user_type IN ('customer','business_owner')) NOT NULL DEFAULT 'customer',

    -- loyalty counters
    current_stamps INTEGER      NOT NULL DEFAULT 0,     -- 0-12 usable
    total_stamps   INTEGER      NOT NULL DEFAULT 0,     -- lifetime

    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Businesses (
    business_id   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id       UUID      NOT NULL,
    business_name VARCHAR(100) NOT NULL,
    description   TEXT,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS LoyaltyPrograms (
    program_id      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id     UUID      NOT NULL,
    reward_threshold INTEGER   NOT NULL,
    reward_details  TEXT,
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

CREATE TABLE IF NOT EXISTS QRCodes (
    qr_id       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID,
    code_value  VARCHAR(255) UNIQUE NOT NULL,
    is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Stamps (
    stamp_id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL,
    qr_id       UUID,
    business_id UUID,
    change      INTEGER NOT NULL,               -- +1 or negative when redeemed
    activity    TEXT    NOT NULL,
    scanned_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS RewardRedemptions (
    redemption_id  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID NOT NULL,
    business_id    UUID,
    reward_title   TEXT NOT NULL,
    reward_cost    INTEGER NOT NULL,
    redeemed_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Notifications (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id     UUID NOT NULL,
    message         TEXT NOT NULL,
    target_segment  JSON,
    sent_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

CREATE TABLE IF NOT EXISTS Referrals (
    referral_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID NOT NULL,
    referee_id  UUID NOT NULL,
    referred_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reward_given BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (referrer_id) REFERENCES Users(user_id),
    FOREIGN KEY (referee_id)  REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS Feedbacks (
    feedback_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL,
    business_id UUID NOT NULL,
    rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
    comments    TEXT,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

CREATE TABLE IF NOT EXISTS Admins (
    admin_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email    VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS SecretKeys (
    key_id     SERIAL PRIMARY KEY,
    key_value  VARCHAR(100) UNIQUE NOT NULL,
    is_active  BOOLEAN NOT NULL DEFAULT TRUE
);

-- preload ten reusable keys ---------------------------------------------------
INSERT INTO SecretKeys (key_value)
    VALUES  ('secret-key-1'), ('secret-key-2'), ('secret-key-3'),
            ('secret-key-4'), ('secret-key-5'), ('secret-key-6'),
            ('secret-key-7'), ('secret-key-8'), ('secret-key-9'),
            ('secret-key-10')
ON CONFLICT DO NOTHING;