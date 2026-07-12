-- Dashboard
SELECT * FROM dashboard_stats;

-- Vehicle Status
SELECT * FROM vehicle_status_summary;

-- Driver Status
SELECT * FROM driver_status_summary;

-- Active Trips
SELECT * FROM active_trips;

-- Vehicles
SELECT * FROM VEHICLES;

-- Drivers
SELECT * FROM DRIVERS;

-- Trips
SELECT * FROM TRIPS;

-- Maintenance
SELECT * FROM MAINTENANCE;

-- Fuel Logs
SELECT * FROM FUEL_LOGS;

-- Expenses
SELECT * FROM EXPENSES;

-- Vehicles Under Maintenance
SELECT *
FROM VEHICLES
WHERE status='Maintenance';

-- Drivers Available
SELECT *
FROM DRIVERS
WHERE status='Available';