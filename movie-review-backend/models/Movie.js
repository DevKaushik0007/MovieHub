const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    releaseDate: Date,
    poster: String,
    backdrop: String,
    genres: [String],
    rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
