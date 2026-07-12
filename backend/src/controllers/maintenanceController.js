const db = require('../utils/db');

exports.logMaintenance = (req, res) => {
    const { vehicleId, cost, desc } = req.body;

    if (!vehicleId) {
        return res.status(400).json({ error: 'Vehicle ID is required' });
    }

    // Move vehicle to maintenance
    db.run('UPDATE VEHICLES SET status = "Maintenance" WHERE id = ?', [vehicleId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Vehicle not found' });

        // Cancel all Planned trips for this vehicle
        db.run('UPDATE TRIPS SET status = "Completed" WHERE vehicle_id = ? AND status = "Planned"', [vehicleId], (err) => {
            if (err) console.error('Error cancelling trips', err);
            // In a real app we might log the cost/desc to a MAINTENANCE table, but for MVP returning success
            res.status(201).json({ id: vehicleId, status: 201 });
        });
    });
};
