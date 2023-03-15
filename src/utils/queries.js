export const createUserTable = `
CREATE TYPE usertype AS ENUM ('passenger', 'driver');
CREATE TABLE IF NOT EXISTS user_details (
    user_details_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50),
    password VARCHAR(250),
    email VARCHAR(100) NOT NULL,
    user_type usertype,
    profile_pic VARCHAR(150),
    PRIMARY KEY (user_details_id)
)
`;

export const createRideOffer = `
CREATE TABLE IF NOT EXISTS ride_offer (
    ride_offer_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    driver_id UUID,
    driver_first_name VARCHAR(50) NOT NULL,
    driver_last_name VARCHAR(50) NOT NULL,
    driver_phone_number VARCHAR(50),
    driver_profile_pic VARCHAR(150),
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(50),
    passenger_id VARCHAR,
    passenger_first_name VARCHAR(50),
    passenger_last_name VARCHAR(50),
    passenger_phone_number VARCHAR(50),
    passenger_profile_pic VARCHAR(150),
    PRIMARY KEY (ride_offer_id),
    CONSTRAINT fk_user_details FOREIGN KEY (driver_id) REFERENCES user_details(user_details_id)
)
`;

export const createRideHistory = `
CREATE TABLE IF NOT EXISTS ride_history (
    ride_history_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    passenger_id VARCHAR,
    driver_first_name VARCHAR(50) NOT NULL,
    driver_last_name VARCHAR(50) NOT NULL,
    ride_offer_id UUID,
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    driver_profile_pic VARCHAR(150) NOT NULL,
    created_at VARCHAR(150),
    PRIMARY KEY (ride_history_id),
    CONSTRAINT fk_offer_details FOREIGN KEY (ride_offer_id) REFERENCES ride_offer(ride_offer_id)
)   
`;

export const dropUserTable = 'DROP TABLE user_details';
export const dropOfferTable = 'DROP TABLE ride_offer';
export const dropRideHistoryTable = 'DROP TABLE ride_history';
