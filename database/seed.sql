-- Insert Admin User (password is 'admin123' hashed with bcrypt for example purposes, but we will just use a dummy hash or plain for now, wait we need bcrypt in the backend. 
-- In backend we will use bcrypt. Let's assume hash of 'password' is '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjIQqiRQYm'
INSERT INTO USERS (name, email, password_hash, role) VALUES 
('Admin User', 'admin@transitops.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjIQqiRQYm', 'Admin'),
('Manager User', 'manager@transitops.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjIQqiRQYm', 'Manager');

-- Insert Vehicles
INSERT INTO VEHICLES (plate_number, model, status) VALUES 
('TRK-1001', 'Volvo FH16', 'Active'),
('TRK-1002', 'Scania R500', 'Active'),
('TRK-1003', 'Mercedes Actros', 'Maintenance'),
('TRK-1004', 'MAN TGX', 'Trip');

-- Insert Drivers
INSERT INTO DRIVERS (name, license_no, status) VALUES 
('John Doe', 'DL-552199', 'Available'),
('Jane Smith', 'DL-883211', 'OnTrip'),
('Mike Johnson', 'DL-441233', 'Leave');

-- Insert Trips
INSERT INTO TRIPS (vehicle_id, driver_id, start_location, end_location, start_date, end_date, status) VALUES 
(4, 2, 'New York, NY', 'Chicago, IL', '2026-07-10', '2026-07-15', 'Ongoing');

-- ==========================================
-- Maintenance
-- ==========================================

INSERT INTO MAINTENANCE
(vehicle_id,maintenance_type,description,cost,maintenance_date,status)
VALUES
(3,'Engine Service','Oil replacement',3500,'2026-07-01','Completed'),
(1,'Brake Inspection','Routine service',1800,'2026-07-05','Scheduled');

-- ==========================================
-- Fuel Logs
-- ==========================================

INSERT INTO FUEL_LOGS
(vehicle_id,litres,cost,fuel_date,odometer_reading)
VALUES
(1,55,5200,'2026-07-10',25000),
(2,60,5700,'2026-07-11',31000),
(4,48,4600,'2026-07-12',18500);

-- ==========================================
-- Expenses
-- ==========================================

INSERT INTO EXPENSES
(trip_id,expense_type,amount,description,expense_date)
VALUES
(1,'Fuel',5200,'Diesel refill','2026-07-10'),
(1,'Toll',450,'National Highway Toll','2026-07-11'),
(1,'Food',700,'Driver meal','2026-07-11');