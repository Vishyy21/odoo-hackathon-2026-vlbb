const db = require('../utils/db');

exports.getVehicles = (req, res) => {
    const { status } = req.query;
    let query = 'SELECT * FROM VEHICLES';
    let params = [];
    if (status) {
        query += ' WHERE status = ?';
        params.push(status);
    }
    
    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};
