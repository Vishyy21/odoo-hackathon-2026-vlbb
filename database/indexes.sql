-- =====================================================
-- TransitOps Database Indexes
-- Odoo Hackathon 2026
-- Database: SQLite
-- =====================================================

-- USERS
CREATE INDEX idx_users_email
ON users(email);

-- DRIVERS
CREATE INDEX idx_drivers_status
ON drivers(status);

CREATE INDEX idx_drivers_license
ON drivers(license_number);

-- VEHICLES
CREATE INDEX idx_vehicles_status
ON vehicles(status);

CREATE INDEX idx_vehicles_plate
ON vehicles(plate_number);

-- TRIPS
CREATE INDEX idx_trips_status
ON trips(status);

CREATE INDEX idx_trips_vehicle
ON trips(vehicle_id);

CREATE INDEX idx_trips_driver
ON trips(driver_id);

CREATE INDEX idx_trips_start_date
ON trips(start_date);

-- MAINTENANCE
CREATE INDEX idx_maintenance_vehicle
ON maintenance(vehicle_id);

CREATE INDEX idx_maintenance_date
ON maintenance(maintenance_date);

-- FUEL LOGS
CREATE INDEX idx_fuel_vehicle
ON fuel_logs(vehicle_id);

CREATE INDEX idx_fuel_date
ON fuel_logs(fuel_date);

-- EXPENSES
CREATE INDEX idx_expenses_trip
ON expenses(trip_id);

CREATE INDEX idx_expenses_type
ON expenses(expense_type);

CREATE INDEX idx_expenses_date
ON expenses(expense_date);