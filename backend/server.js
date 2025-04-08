const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scanRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const textRoutes = require('./routes/textRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scans', scanRoutes); 
app.use('/api/upload', uploadRoutes);
app.use('/api', textRoutes);
app.use('/api/dashboard', dashboardRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});