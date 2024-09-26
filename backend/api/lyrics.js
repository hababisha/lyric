const express = require('express');
const Lyric = require('../models/Lyrics');
const router = express.Router();
const auth = require('../middleware/auth');



// Get all lyrics
router.get('/', async (req, res) => {
    try {
        const lyrics = await Lyric.find();
        res.json(lyrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new lyric
router.post('/', auth, async (req, res) => {
    const { title, lyrics, category, createdAt } = req.body;

    try {
        const newLyric = new Lyric({ title, lyrics, category, createdAt });
        await newLyric.save();
        res.status(201).json(newLyric); // Respond with the created lyric
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Search lyrics by title
router.get('/search', async (req, res) => {
    const { title } = req.query;

    try {
        const lyrics = await Lyric.find({ title: { $regex: title, $options: 'i' } });
        res.json(lyrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;