const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { User, Lodging, Booking, Review, Image, Category, Address } = db;
const { check, validationResult } = require('express-validator');
const { response } = require('express');
const router = express.Router();

// Get all reviews

// Create a review

router.post('/', asyncHandler(async (req, res) => {
    const {
        rating,
        comment,
        lodgingId,
        userId
    } = req.body

    const review = await Review.create({
        userId,
        lodgingId,
        rating,
        comment
    })
    res.json(review)
}));

// Edit a review

// Delete a review

module.exports = router;
