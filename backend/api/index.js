// api/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const lyricRoutes = require('./lyrics'); // Imported lyrics routes
const authRoutes = require('./auth'); // Imported authentication routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Sample route
app.get('/', (req, res) => {
    res.send("Welcome to the backend");
});

app.use('./auth', authRoutes);
app.use('./lyrics', lyricRoutes);

// Export the serverless function
module.exports = app;