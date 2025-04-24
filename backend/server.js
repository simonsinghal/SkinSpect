const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const scanRoutes = require('./routes/scanRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const textRoutes = require('./routes/textRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const activityRoutes = require('./routes/activityRoute');
const adminRoutes = require('./routes/adminRoutes');
const diseaseRoutes = require('./routes/diseaseRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes'); 
const doctorsRoutes = require("./routes/doctorsRoutes");

const app = express();

// Connect to MongoDB
require("dotenv").config();
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
app.use('/api', activityRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/content', diseaseRoutes);
app.use('/api', feedbackRoutes);
app.use('/api/doctors', doctorsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});