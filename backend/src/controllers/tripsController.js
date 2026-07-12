const db = require('../utils/db');

exports.getTrips = (req, res) => {
    db.all(`
        SELECT t.*, v.plate_number, d.name as driver_name 
        FROM TRIPS t
        JOIN VEHICLES v ON t.vehicle_id = v.id
        JOIN DRIVERS d ON t.driver_id = d.id
    `, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createTrip = (req, res) => {
    const { vehicle_id, driver_id, start_location, end_location, start_date } = req.body;

    if (!vehicle_id || !driver_id || !start_location || !end_location || !start_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Business Rules validation
    db.get('SELECT status FROM VEHICLES WHERE id = ?', [vehicle_id], (err, vehicle) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
        if (vehicle.status === 'Maintenance' || vehicle.status === 'Trip') {
            return res.status(400).json({ error: 'Vehicle is not available' });
        }

        db.get('SELECT status FROM DRIVERS WHERE id = ?', [driver_id], (err, driver) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!driver) return res.status(404).json({ error: 'Driver not found' });
            if (driver.status === 'OnTrip' || driver.status === 'Leave') {
                return res.status(400).json({ error: 'Driver is not available' });
            }

            // Create trip
            db.run(`INSERT INTO TRIPS (vehicle_id, driver_id, start_location, end_location, start_date, status)
                    VALUES (?, ?, ?, ?, ?, 'Planned')`,
                [vehicle_id, driver_id, start_location, end_location, start_date],
                function (err) {
                    if (err) return res.status(500).json({ error: err.message });
                    const tripId = this.lastID;

                    // Update statuses
                    db.run('UPDATE VEHICLES SET status = "Trip" WHERE id = ?', [vehicle_id]);
                    db.run('UPDATE DRIVERS SET status = "OnTrip" WHERE id = ?', [driver_id]);

                    res.status(201).json({ tripId, status: 201 });
                }
            );
        });
    });
};
