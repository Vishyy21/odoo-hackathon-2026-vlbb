CREATE VIEW IF NOT EXISTS dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM VEHICLES) total_vehicles,
    (SELECT COUNT(*) FROM DRIVERS) total_drivers,
    (SELECT COUNT(*) FROM TRIPS) total_trips,
    (SELECT COUNT(*) FROM TRIPS WHERE status='Ongoing') ongoing_trips;

CREATE VIEW IF NOT EXISTS vehicle_status_summary AS
SELECT
status,
COUNT(*) total
FROM VEHICLES
GROUP BY status;

CREATE VIEW IF NOT EXISTS driver_status_summary AS
SELECT
status,
COUNT(*) total
FROM DRIVERS
GROUP BY status;

CREATE VIEW IF NOT EXISTS active_trips AS
SELECT
t.id,
v.plate_number,
d.name driver_name,
t.start_location,
t.end_location,
t.start_date
FROM TRIPS t
JOIN VEHICLES v
ON t.vehicle_id=v.id
JOIN DRIVERS d
ON t.driver_id=d.id
WHERE t.status='Ongoing';