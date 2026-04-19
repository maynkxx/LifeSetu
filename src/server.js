const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Dev Logger (fixed - no nested app.use)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// ✅ Health check (better than /test)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/resources', require('./routes/resourceRoutes'));
app.use('/requests', require('./routes/requestRoutes'));
app.use('/match', require('./routes/match.routes'));

// ❗ Global error handler (add this file next if not created yet)
const errorHandler = require('./middleware/error.middleware');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});