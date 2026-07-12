const db = require('../utils/db');

exports.getAll = (req, res) => {
  db.all('SELECT * FROM MAINTENANCE ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(r => ({
      id: `MTN-${String(r.id).padStart(3, '0')}`,
      vehicleId: r.vehicleId,
      serviceType: r.serviceType,
      date: r.date,
      description: r.description,
      cost: r.cost,
      status: r.status
    }));
    res.json(formatted);
  });
};

exports.logMaintenance = (req, res) => {
  const { vehicleId, serviceType, date, description, cost, status } = req.body;
  
  const sql = 'INSERT INTO MAINTENANCE (vehicleId, serviceType, date, description, cost, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.run(sql, [vehicleId, serviceType, date, description, cost, status || 'Scheduled'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    // Also update vehicle status
    db.run('UPDATE VEHICLES SET status = "Maintenance" WHERE id = ?', [vehicleId], (err2) => {
       if (err2) console.error('Failed to update vehicle status', err2);
    });

    res.json({
      id: `MTN-${String(this.lastID).padStart(3, '0')}`,
      vehicleId, serviceType, date, description, cost, status: status || 'Scheduled'
    });
  });
};
