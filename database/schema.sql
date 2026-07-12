CREATE TABLE IF NOT EXISTS USERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('Admin', 'Manager'))
);

CREATE TABLE IF NOT EXISTS VEHICLES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate_number TEXT UNIQUE NOT NULL,
    model TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Active', 'Maintenance', 'Trip'))
);

CREATE TABLE IF NOT EXISTS DRIVERS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    license_no TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Available', 'OnTrip', 'Leave'))
);

CREATE TABLE IF NOT EXISTS TRIPS (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vehicle_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,
    start_location TEXT NOT NULL,
    end_location TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status TEXT NOT NULL CHECK (status IN ('Planned', 'Ongoing', 'Completed')),
    FOREIGN KEY(vehicle_id) REFERENCES VEHICLES(id),
    FOREIGN KEY(driver_id) REFERENCES DRIVERS(id)
);
