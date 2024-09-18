const mongoose = require('mongoose');


const lyricsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the User model

});

const Lyrics = mongoose.model('Lyrics', lyricsSchema);

module.exports = Lyrics;