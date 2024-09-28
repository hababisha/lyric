const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const lyricRoutes = require('./api/lyrics'); //Imported lyrics routes
const authRoutes = require('./api/auth'); // Imported authentication routes


const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors(
    {
        origin: 'mezmure.vercel.app',
        methods: ["GET", "POST"],
        credentials: true
    }
    
));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

 app.listen(PORT, () => {
     console.log(`Server running on http://localhost:${PORT}`);
});
    

// Sample route
app.get('/', (req, res) => {
    res.send("Welcome to the backend")
});

app.use('/api/auth', authRoutes);
app.use('/api/lyrics', lyricRoutes)

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
