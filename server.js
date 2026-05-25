require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const logRoutes = require('./routes/logRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', logRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API Logger Service' });
});

// Health check route (very useful for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'api-logger' });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`API Logger running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();