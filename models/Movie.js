// models/Movie.js

const mongoose = require('mongoose');

// Movie 스키마 정의
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    director: String,
    genre: String,
    year: Number,
    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Movie 모델 생성
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
