const db = require('../utils/db');

exports.getAll = (req, res) => {
  db.all('SELECT * FROM FUEL_LOGS ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(r => ({
      id: `FUEL-${String(r.id).padStart(3, '0')}`,
      vehicleId: r.vehicleId,
      date: r.date,
      gallons: r.gallons,
      cost: r.cost
    }));
    res.json(formatted);
  });
};

exports.logFuel = (req, res) => {
  const { vehicleId, date, gallons, cost } = req.body;
  
  const sql = 'INSERT INTO FUEL_LOGS (vehicleId, date, gallons, cost) VALUES (?, ?, ?, ?)';
  db.run(sql, [vehicleId, date, gallons, cost], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      id: `FUEL-${String(this.lastID).padStart(3, '0')}`,
      vehicleId, date, gallons, cost
    });
  });
};
