-- =====================================================
-- TransitOps Database Schema
-- Odoo Hackathon 2026
-- Database: SQLite
-- Author: Lakshya Dogra
-- =====================================================

PRAGMA foreign_keys = ON;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('Admin', 'Manager')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- DRIVERS
-- =====================================================

CREATE TABLE drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    license_number TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE,
    experience_years INTEGER DEFAULT 0 CHECK(experience_years >= 0),
    status TEXT NOT NULL DEFAULT 'Available'
        CHECK(status IN ('Available','OnTrip','Leave')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- VEHICLES
-- =====================================================

CREATE TABLE vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plate_number TEXT NOT NULL UNIQUE,
    model TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    vehicle_type TEXT NOT NULL,
    capacity INTEGER NOT NULL CHECK(capacity > 0),
    purchase_date DATE,
    status TEXT NOT NULL DEFAULT 'Active'
        CHECK(status IN ('Active','Maintenance','OnTrip')),
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TRIPS
-- =====================================================

CREATE TABLE trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    vehicle_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,

    start_location TEXT NOT NULL,
    end_location TEXT NOT NULL,

    start_date DATE NOT NULL,
    end_date DATE,

    distance_km REAL CHECK(distance_km >= 0),

    status TEXT NOT NULL DEFAULT 'Planned'
        CHECK(status IN ('Planned','Ongoing','Completed')),

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE,

    FOREIGN KEY(driver_id)
        REFERENCES drivers(id)
        ON DELETE CASCADE
);

-- =====================================================
-- MAINTENANCE
-- =====================================================

CREATE TABLE maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    vehicle_id INTEGER NOT NULL,

    maintenance_type TEXT NOT NULL,

    description TEXT,

    cost REAL NOT NULL CHECK(cost > 0),

    maintenance_date DATE NOT NULL,

    status TEXT DEFAULT 'Completed'
        CHECK(status IN ('Scheduled','InProgress','Completed')),

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE
);

-- =====================================================
-- FUEL LOGS
-- =====================================================

CREATE TABLE fuel_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    vehicle_id INTEGER NOT NULL,

    litres REAL NOT NULL CHECK(litres > 0),

    cost REAL NOT NULL CHECK(cost > 0),

    fuel_date DATE NOT NULL,

    odometer_reading INTEGER CHECK(odometer_reading >= 0),

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(vehicle_id)
        REFERENCES vehicles(id)
        ON DELETE CASCADE
);

-- =====================================================
-- EXPENSES
-- =====================================================

CREATE TABLE expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    trip_id INTEGER NOT NULL,

    expense_type TEXT NOT NULL
        CHECK(expense_type IN
        ('Fuel','Toll','Food','Repair','Parking','Other')),

    amount REAL NOT NULL CHECK(amount > 0),

    description TEXT,

    expense_date DATE NOT NULL,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(trip_id)
        REFERENCES trips(id)
        ON DELETE CASCADE
);