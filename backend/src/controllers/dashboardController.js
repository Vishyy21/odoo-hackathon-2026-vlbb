const db = require('../utils/db');

exports.getStats = (req, res) => {
    const stats = {};
    db.serialize(() => {
        db.get('SELECT COUNT(*) as count FROM VEHICLES', (err, row) => {
            if (!err) stats.totalVehicles = row.count;
        });
        db.get('SELECT COUNT(*) as count FROM TRIPS WHERE status = "Ongoing"', (err, row) => {
            if (!err) stats.activeTrips = row.count;
        });
        db.get('SELECT COUNT(*) as count FROM VEHICLES WHERE status = "Maintenance"', (err, row) => {
            if (!err) stats.vehiclesInMaintenance = row.count;
            res.json(stats);
        });
    });
};
