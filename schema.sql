-- 1. User Table
CREATE TABLE Users (
    user_id UUID PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_type VARCHAR(20) CHECK (user_type IN ('customer', 'business_owner')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Business Table
CREATE TABLE Businesses (
    business_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    business_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- 3. LoyaltyProgram Table
CREATE TABLE LoyaltyPrograms (
    program_id UUID PRIMARY KEY,
    business_id UUID NOT NULL,
    reward_threshold INTEGER NOT NULL,
    reward_details TEXT,
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- 4. QRCode Table
CREATE TABLE QRCodes (
    qr_id UUID PRIMARY KEY,
    business_id UUID NOT NULL,
    code_value VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- 5. Stamp Table
CREATE TABLE Stamps (
    stamp_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    qr_id UUID NOT NULL,
    business_id UUID NOT NULL,
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (qr_id) REFERENCES QRCodes(qr_id),
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- 6. RewardRedemption Table
CREATE TABLE RewardRedemptions (
    redemption_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    business_id UUID NOT NULL,
    reward_details TEXT,
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- 7. Notification Table
CREATE TABLE Notifications (
    notification_id UUID PRIMARY KEY,
    business_id UUID NOT NULL,
    message TEXT NOT NULL,
    target_segment JSON,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- 8. Referral Table
CREATE TABLE Referrals (
    referral_id UUID PRIMARY KEY,
    referrer_id UUID NOT NULL,
    referee_id UUID NOT NULL,
    referred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reward_given BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (referrer_id) REFERENCES Users(user_id),
    FOREIGN KEY (referee_id) REFERENCES Users(user_id)
);

-- 9. Feedback Table
CREATE TABLE Feedbacks (
    feedback_id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    business_id UUID NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (business_id) REFERENCES Businesses(business_id)
);

-- 10. Admin Table
CREATE TABLE Admins (
    admin_id UUID PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
