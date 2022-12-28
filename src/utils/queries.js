export const createPassengerTable = `
CREATE TABLE IF NOT EXISTS passenger (
    passenger_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    profile_pic VARCHAR(150),
    PRIMARY KEY (passenger_id)
)
`;

export const createDriverTable = `
CREATE TABLE IF NOT EXISTS driver (
    driver_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    profile_pic VARCHAR(150),
    PRIMARY KEY (driver_id)
)
`;

export const createRideOffer = `
CREATE TABLE IF NOT EXISTS ride_offer (
    ride_offer_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    driver_id UUID,
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(50),
    PRIMARY KEY (ride_offer_id),
    CONSTRAINT fk_driver_details FOREIGN KEY (driver_id) REFERENCES driver(driver_id)
)
`;

export const createRideHistory = `
CREATE TABLE IF NOT EXISTS ride_history (
    ride_history_id UUID NOT NULL DEFAULT uuid_generate_v4(),
    driver_id UUID,
    passenger_id UUID,
    ride_offer_id UUID,
    amount INT NOT NULL,
    location VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    status VARCHAR(15) NOT NULL,
    PRIMARY KEY (ride_history_id),
    CONSTRAINT fk_driver_details FOREIGN KEY (driver_id) REFERENCES driver(driver_id),
    CONSTRAINT fk_passenger_details FOREIGN KEY (passenger_id) REFERENCES passenger(passenger_id),
    CONSTRAINT fk_offer_details FOREIGN KEY (ride_offer_id) REFERENCES ride_offer(ride_offer_id)
)   
`;

export const dropPassengerTable = 'DROP TABLE passenger';
export const dropDriverTable = 'DROP TABLE driver';
export const dropOfferTable = 'DROP TABLE ride_offer';
export const dropRideHistoryTable = 'DROP TABLE ride_history';
