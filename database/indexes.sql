CREATE INDEX IF NOT EXISTS idx_vehicle_status
ON VEHICLES(status);

CREATE INDEX IF NOT EXISTS idx_driver_status
ON DRIVERS(status);

CREATE INDEX IF NOT EXISTS idx_trip_status
ON TRIPS(status);

CREATE INDEX IF NOT EXISTS idx_trip_vehicle
ON TRIPS(vehicle_id);

CREATE INDEX IF NOT EXISTS idx_trip_driver
ON TRIPS(driver_id);

CREATE INDEX IF NOT EXISTS idx_vehicle_plate
ON VEHICLES(plate_number);

CREATE INDEX IF NOT EXISTS idx_driver_license
ON DRIVERS(license_no);

CREATE INDEX IF NOT EXISTS idx_maintenance_vehicle
ON MAINTENANCE(vehicle_id);

CREATE INDEX IF NOT EXISTS idx_fuel_vehicle
ON FUEL_LOGS(vehicle_id);

CREATE INDEX IF NOT EXISTS idx_expense_trip
ON EXPENSES(trip_id);