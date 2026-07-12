-- =====================================================
-- TransitOps Sample SQL Queries
-- Odoo Hackathon 2026
-- Database: SQLite
-- =====================================================

---------------------------------------------------------
-- DASHBOARD
---------------------------------------------------------

-- Total Vehicles
SELECT COUNT(*) AS total_vehicles
FROM vehicles;

-- Total Drivers
SELECT COUNT(*) AS total_drivers
FROM drivers;

-- Total Trips
SELECT COUNT(*) AS total_trips
FROM trips;

---------------------------------------------------------
-- VEHICLE STATUS
---------------------------------------------------------

-- Vehicles by Status
SELECT status, COUNT(*) AS total
FROM vehicles
GROUP BY status;

---------------------------------------------------------
-- DRIVER STATUS
---------------------------------------------------------

-- Drivers by Status
SELECT status, COUNT(*) AS total
FROM drivers
GROUP BY status;

---------------------------------------------------------
-- ACTIVE TRIPS
---------------------------------------------------------

SELECT
    t.id,
    v.plate_number,
    d.full_name,
    t.start_location,
    t.end_location,
    t.start_date,
    t.distance_km
FROM trips t
JOIN vehicles v
ON t.vehicle_id = v.id
JOIN drivers d
ON t.driver_id = d.id
WHERE t.status = 'Ongoing';

---------------------------------------------------------
-- TRIP HISTORY
---------------------------------------------------------

SELECT
    t.id,
    d.full_name,
    v.plate_number,
    t.start_location,
    t.end_location,
    t.distance_km,
    t.status
FROM trips t
JOIN drivers d
ON t.driver_id = d.id
JOIN vehicles v
ON t.vehicle_id = v.id
ORDER BY t.start_date DESC;

---------------------------------------------------------
-- MAINTENANCE SUMMARY
---------------------------------------------------------

SELECT
    vehicle_id,
    COUNT(*) AS services,
    SUM(cost) AS total_cost
FROM maintenance
GROUP BY vehicle_id;

---------------------------------------------------------
-- FUEL CONSUMPTION
---------------------------------------------------------

SELECT
    vehicle_id,
    SUM(litres) AS total_litres,
    SUM(cost) AS total_cost
FROM fuel_logs
GROUP BY vehicle_id;

---------------------------------------------------------
-- EXPENSE SUMMARY
---------------------------------------------------------

SELECT
    expense_type,
    SUM(amount) AS total_amount
FROM expenses
GROUP BY expense_type;

---------------------------------------------------------
-- TOP 5 MOST EXPENSIVE TRIPS
---------------------------------------------------------

SELECT
    trip_id,
    SUM(amount) AS total_expense
FROM expenses
GROUP BY trip_id
ORDER BY total_expense DESC
LIMIT 5;

---------------------------------------------------------
-- VEHICLES CURRENTLY ON TRIP
---------------------------------------------------------

SELECT *
FROM vehicles
WHERE status='OnTrip';

---------------------------------------------------------
-- VEHICLES UNDER MAINTENANCE
---------------------------------------------------------

SELECT *
FROM vehicles
WHERE status='Maintenance';

---------------------------------------------------------
-- AVAILABLE DRIVERS
---------------------------------------------------------

SELECT *
FROM drivers
WHERE status='Available';

---------------------------------------------------------
-- DRIVER WORKLOAD
---------------------------------------------------------

SELECT
    d.full_name,
    COUNT(t.id) AS total_trips
FROM drivers d
LEFT JOIN trips t
ON d.id=t.driver_id
GROUP BY d.id
ORDER BY total_trips DESC;

---------------------------------------------------------
-- VEHICLE UTILIZATION
---------------------------------------------------------

SELECT
    v.plate_number,
    COUNT(t.id) AS total_trips
FROM vehicles v
LEFT JOIN trips t
ON v.id=t.vehicle_id
GROUP BY v.id
ORDER BY total_trips DESC;

---------------------------------------------------------
-- TOTAL MAINTENANCE COST
---------------------------------------------------------

SELECT
    SUM(cost) AS maintenance_cost
FROM maintenance;

---------------------------------------------------------
-- TOTAL FUEL COST
---------------------------------------------------------

SELECT
    SUM(cost) AS fuel_cost
FROM fuel_logs;

---------------------------------------------------------
-- TOTAL OPERATING EXPENSES
---------------------------------------------------------

SELECT
    SUM(amount) AS operating_expenses
FROM expenses;