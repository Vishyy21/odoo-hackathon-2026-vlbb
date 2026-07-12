-- =====================================================
-- TransitOps Database Views
-- Odoo Hackathon 2026
-- Database: SQLite
-- =====================================================

---------------------------------------------------------
-- Dashboard Statistics
---------------------------------------------------------

CREATE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM vehicles) AS total_vehicles,
    (SELECT COUNT(*) FROM drivers) AS total_drivers,
    (SELECT COUNT(*) FROM trips) AS total_trips,
    (SELECT COUNT(*) FROM maintenance) AS total_maintenance_records,
    (SELECT COUNT(*) FROM fuel_logs) AS total_fuel_logs,
    (SELECT COUNT(*) FROM expenses) AS total_expenses;

---------------------------------------------------------
-- Vehicle Status Summary
---------------------------------------------------------

CREATE VIEW vehicle_status_summary AS
SELECT
    status,
    COUNT(*) AS total
FROM vehicles
GROUP BY status;

---------------------------------------------------------
-- Driver Status Summary
---------------------------------------------------------

CREATE VIEW driver_status_summary AS
SELECT
    status,
    COUNT(*) AS total
FROM drivers
GROUP BY status;

---------------------------------------------------------
-- Trip Status Summary
---------------------------------------------------------

CREATE VIEW trip_status_summary AS
SELECT
    status,
    COUNT(*) AS total
FROM trips
GROUP BY status;

---------------------------------------------------------
-- Active Trips
---------------------------------------------------------

CREATE VIEW active_trips AS
SELECT
    t.id,
    v.plate_number,
    d.full_name AS driver,
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
-- Maintenance Summary
---------------------------------------------------------

CREATE VIEW maintenance_summary AS
SELECT
    vehicle_id,
    COUNT(*) AS total_services,
    SUM(cost) AS total_cost
FROM maintenance
GROUP BY vehicle_id;

---------------------------------------------------------
-- Fuel Consumption Summary
---------------------------------------------------------

CREATE VIEW fuel_summary AS
SELECT
    vehicle_id,
    SUM(litres) AS total_litres,
    SUM(cost) AS total_fuel_cost
FROM fuel_logs
GROUP BY vehicle_id;

---------------------------------------------------------
-- Expense Summary
---------------------------------------------------------

CREATE VIEW expense_summary AS
SELECT
    expense_type,
    SUM(amount) AS total_amount
FROM expenses
GROUP BY expense_type;