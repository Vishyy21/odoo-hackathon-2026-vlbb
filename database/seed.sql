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
