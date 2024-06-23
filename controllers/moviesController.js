// controllers/moviesController.js

const Movie = require('../models/Movie');
const mongoose = require('mongoose');
const { Types } = mongoose;

// 모든 영화 조회
const index = async (req, res, next) => {
    try {
        const movies = await Movie.find().sort({ createdAt: 'desc' });
        res.render('movies/index', { movies });
    } catch (err) {
        next(err);
    }
};

// 영화 생성 폼 보기
const newMovie = (req, res) => {
    res.render('movies/new');
};

// 영화 생성
const create = async (req, res, next) => {
    const { title, director, genre, year, rating } = req.body;
    try {
        const newMovie = new Movie({ title, director, genre, year, rating });
        await newMovie.save();
        res.redirect('/movies');
    } catch (err) {
        res.render('movies/new', { error: err.message });
    }
};

// 특정 영화 조회
const show = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid movie ID');
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        res.render('movies/show', { movie });
    } catch (err) {
        next(err);
    }
};


// 영화 편집 폼 보기
const edit = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid movie ID');
        }

        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        res.render('movies/edit', { movie });
    } catch (err) {
        next(err);
    }
};

// 영화 업데이트
const update = async (req, res, next) => {
    const { id } = req.params;
    const { title, director, genre, year, rating } = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { title, director, genre, year, rating },
            { new: true }
        );
        if (!updatedMovie) {
            return res.status(404).send('Movie not found');
        }
        res.redirect(`/movies/${id}`);
    } catch (err) {
        res.render('movies/edit', { movie: req.body, error: err.message });
    }
};

// 영화 삭제
const deleteMovie = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Movie.findByIdAndDelete(id);
        res.redirect('/movies');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    new: newMovie,
    create,
    show,
    edit,
    update,
    delete: deleteMovie,
};
