const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/auth');
const dashboardRoutes = require('./src/routes/dashboard');
const vehicleRoutes = require('./src/routes/vehicles');
const tripRoutes = require('./src/routes/trips');
const maintenanceRoutes = require('./src/routes/maintenance');
const fuelRoutes = require('./src/routes/fuel');
const expensesRoutes = require('./src/routes/expenses');

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/expenses', expensesRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
