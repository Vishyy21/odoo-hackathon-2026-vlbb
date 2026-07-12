-- =====================================================
-- TransitOps Sample Data
-- Odoo Hackathon 2026
-- =====================================================

BEGIN TRANSACTION;

INSERT INTO users (full_name,email,password_hash,role) VALUES
('Lakshya Dogra','lakshya@transitops.com','hashed_password','Admin'),
('Jaggi Sharma','jaggi@transitops.com','hashed_password','Manager'),
('Vishesh Gupta','vishesh@transitops.com','hashed_password','Manager');

INSERT INTO drivers (full_name,license_number,phone,experience_years,status) VALUES
('Rahul Verma','DL001001','9876500001',5,'Available'),
('Amit Kumar','DL001002','9876500002',7,'Available'),
('Rohit Singh','DL001003','9876500003',4,'OnTrip'),
('Vikas Sharma','DL001004','9876500004',9,'Available'),
('Ankit Jain','DL001005','9876500005',3,'Leave'),
('Mohit Yadav','DL001006','9876500006',6,'Available'),
('Deepak Mehta','DL001007','9876500007',8,'OnTrip'),
('Nitin Arora','DL001008','9876500008',5,'Available'),
('Sanjay Gupta','DL001009','9876500009',10,'Available'),
('Karan Malhotra','DL001010','9876500010',2,'Available');

INSERT INTO vehicles
(plate_number,model,manufacturer,vehicle_type,capacity,purchase_date,status) VALUES
('RJ14AB1001','Ace Gold','Tata','Mini Truck',1000,'2022-01-15','Active'),
('DL01CD1002','Dost+','Ashok Leyland','Truck',1500,'2021-06-20','Active'),
('UP16EF1003','Bolero Pickup','Mahindra','Pickup',1200,'2023-02-10','OnTrip'),
('HR26GH1004','Pro 2049','Eicher','Truck',5000,'2020-09-12','Maintenance'),
('RJ45JK1005','Intra V30','Tata','Mini Truck',1300,'2022-07-01','Active'),
('DL09LM1006','Supro Maxitruck','Mahindra','Mini Truck',900,'2023-05-19','OnTrip'),
('UP32NP1007','Partner','Ashok Leyland','Truck',3000,'2021-12-11','Active'),
('HR38QR1008','Pro 3015','Eicher','Truck',7000,'2019-11-08','Active'),
('RJ22ST1009','Yodha','Tata','Pickup',1400,'2024-01-25','Active'),
('DL11UV1010','Jeeto','Mahindra','Mini Truck',800,'2023-09-17','Active');

INSERT INTO trips (vehicle_id,driver_id,start_location,end_location,start_date,end_date,distance_km,status) VALUES
(1,1,'Jaipur','Delhi','2026-07-10','2026-07-11',50,'Completed'),
(2,2,'Delhi','Noida','2026-07-11','2026-07-12',100,'Completed'),
(3,3,'Noida','Gurgaon','2026-07-12','2026-07-13',150,'Completed'),
(4,4,'Ajmer','Jaipur','2026-07-13','2026-07-14',200,'Completed'),
(5,5,'Kota','Udaipur','2026-07-14','2026-07-15',250,'Completed'),
(6,6,'Jaipur','Delhi','2026-07-15','2026-07-16',300,'Completed'),
(7,7,'Delhi','Noida','2026-07-16','2026-07-17',350,'Completed'),
(8,8,'Noida','Gurgaon','2026-07-17','2026-07-18',400,'Completed'),
(9,9,'Ajmer','Jaipur','2026-07-18','2026-07-19',450,'Completed'),
(10,10,'Kota','Udaipur','2026-07-09','2026-07-10',500,'Completed'),
(1,1,'Jaipur','Delhi','2026-07-10',NULL,550,'Ongoing'),
(2,2,'Delhi','Noida','2026-07-11',NULL,600,'Ongoing'),
(3,3,'Noida','Gurgaon','2026-07-12',NULL,650,'Ongoing'),
(4,4,'Ajmer','Jaipur','2026-07-13',NULL,700,'Ongoing'),
(5,5,'Kota','Udaipur','2026-07-14',NULL,750,'Ongoing'),
(6,6,'Jaipur','Delhi','2026-07-15',NULL,800,'Planned'),
(7,7,'Delhi','Noida','2026-07-16',NULL,850,'Planned'),
(8,8,'Noida','Gurgaon','2026-07-17',NULL,900,'Planned'),
(9,9,'Ajmer','Jaipur','2026-07-18',NULL,950,'Planned'),
(10,10,'Kota','Udaipur','2026-07-09',NULL,1000,'Planned');

INSERT INTO maintenance
(vehicle_id,maintenance_type,description,cost,maintenance_date,status) VALUES
(4,'Engine Service','Full engine inspection',12000,'2026-06-01','Completed'),
(2,'Oil Change','Routine service',3500,'2026-06-10','Completed'),
(5,'Tyre Replacement','Front tyres replaced',14000,'2026-06-20','Completed'),
(8,'Brake Service','Brake pads replaced',6000,'2026-06-25','Completed'),
(1,'Battery Check','Battery diagnostics',1800,'2026-07-01','Completed'),
(7,'AC Service','Cooling maintenance',2500,'2026-07-03','Scheduled'),
(9,'Suspension','Suspension inspection',5000,'2026-07-04','InProgress'),
(10,'General Service','Periodic maintenance',4200,'2026-07-05','Completed');

INSERT INTO fuel_logs
(vehicle_id,litres,cost,fuel_date,odometer_reading) VALUES
(1,36,3420,'2026-07-01',20750),
(2,37,3515,'2026-07-02',21500),
(3,38,3610,'2026-07-03',22250),
(4,39,3705,'2026-07-04',23000),
(5,40,3800,'2026-07-05',23750),
(6,41,3895,'2026-07-06',24500),
(7,42,3990,'2026-07-07',25250),
(8,43,4085,'2026-07-08',26000),
(9,44,4180,'2026-07-09',26750),
(10,45,4275,'2026-07-10',27500),
(1,46,4370,'2026-07-11',28250),
(2,47,4465,'2026-07-12',29000),
(3,48,4560,'2026-07-13',29750),
(4,49,4655,'2026-07-14',30500),
(5,50,4750,'2026-07-15',31250);

INSERT INTO expenses (trip_id,expense_type,amount,description,expense_date) VALUES
(1,'Fuel',350,'Fuel expense for trip 1','2026-07-02'),
(2,'Toll',500,'Toll expense for trip 2','2026-07-03'),
(3,'Food',650,'Food expense for trip 3','2026-07-04'),
(4,'Parking',800,'Parking expense for trip 4','2026-07-05'),
(5,'Other',950,'Other expense for trip 5','2026-07-06'),
(6,'Fuel',1100,'Fuel expense for trip 6','2026-07-07'),
(7,'Toll',1250,'Toll expense for trip 7','2026-07-08'),
(8,'Food',1400,'Food expense for trip 8','2026-07-09'),
(9,'Parking',1550,'Parking expense for trip 9','2026-07-10'),
(10,'Other',1700,'Other expense for trip 10','2026-07-11'),
(11,'Fuel',1850,'Fuel expense for trip 11','2026-07-12'),
(12,'Toll',2000,'Toll expense for trip 12','2026-07-13'),
(13,'Food',2150,'Food expense for trip 13','2026-07-14'),
(14,'Parking',2300,'Parking expense for trip 14','2026-07-15'),
(15,'Other',2450,'Other expense for trip 15','2026-07-01'),
(16,'Fuel',2600,'Fuel expense for trip 16','2026-07-02'),
(17,'Toll',2750,'Toll expense for trip 17','2026-07-03'),
(18,'Food',2900,'Food expense for trip 18','2026-07-04'),
(19,'Parking',3050,'Parking expense for trip 19','2026-07-05'),
(20,'Other',3200,'Other expense for trip 20','2026-07-06');

COMMIT;
