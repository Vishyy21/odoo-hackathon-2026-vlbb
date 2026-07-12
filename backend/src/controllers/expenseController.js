const db = require('../utils/db');

exports.getAll = (req, res) => {
  db.all('SELECT * FROM EXPENSES ORDER BY id DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const formatted = rows.map(r => ({
      id: `EXP-${String(r.id).padStart(3, '0')}`,
      category: r.category,
      date: r.date,
      description: r.description,
      amount: r.amount,
      status: r.status
    }));
    res.json(formatted);
  });
};

exports.logExpense = (req, res) => {
  const { category, date, description, amount, status } = req.body;
  
  const sql = 'INSERT INTO EXPENSES (category, date, description, amount, status) VALUES (?, ?, ?, ?, ?)';
  db.run(sql, [category, date, description, amount, status || 'Pending'], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      id: `EXP-${String(this.lastID).padStart(3, '0')}`,
      category, date, description, amount, status: status || 'Pending'
    });
  });
};
