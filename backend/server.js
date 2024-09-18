const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const lyricRoutes = require('./routes/lyrics'); //Imported lyrics routes
const authRoutes = require('./routes/auth'); // Imported authentication routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Sample route
app.get('/', (req, res) => {
    res.send("Welcome to the backend")
});

app.use('/api/auth', authRoutes);
app.use('/api/lyrics', lyricRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});