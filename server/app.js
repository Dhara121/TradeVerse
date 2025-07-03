const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express();
dotenv.config();
connectDB();

//  Add this middleware BEFORE any routes
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Mounting of all the routes 
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/stocks', require('./routes/stockRoutes'));
app.use("/api/trades", require('./routes/tradeRoutes'));
app.use("/api/portfolio", require('./routes/portfolioRoutes'));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));



module.exports = app;
