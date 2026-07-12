const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, '../../../database/transitops.db');
const schemaPath = path.resolve(__dirname, '../../../database/schema.sql');
const seedPath = path.resolve(__dirname, '../../../database/seed.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Initialize schema
        const schema = fs.readFileSync(schemaPath, 'utf8');
        db.exec(schema, (err) => {
            if (err) {
                console.error('Error executing schema', err.message);
            } else {
                console.log('Database schema initialized.');
                
                // Seed data if no users exist
                db.get("SELECT COUNT(*) as count FROM USERS", (err, row) => {
                    if (row && row.count === 0) {
                        const seed = fs.readFileSync(seedPath, 'utf8');
                        db.exec(seed, (err) => {
                            if (err) {
                                console.error('Error seeding data', err.message);
                            } else {
                                console.log('Mock data seeded.');
                            }
                        });
                    }
                });
            }
        });
    }
});

module.exports = db;
