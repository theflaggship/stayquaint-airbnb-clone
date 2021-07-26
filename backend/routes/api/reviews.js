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

    const returnReview = await Review.findOne({
        where: { id: review.id },
        include: [User]
    })

    res.json(returnReview)
}));

// Get lodging reviews

router.get('/lodgings/:lodgingId', asyncHandler(async (req, res) => {
    const { lodgingId } = req.params
    const reviews = await Review.findAll({
        where: { lodgingId },
        include: [User, Lodging]
    })
    res.json(reviews)
}));



// Edit a review


router.put('/:reviewId', asyncHandler(async (req, res) => {
    const { reviewId } = req.params
    const review = await Review.findByPk(reviewId)

    const {
        // rating,
        comment,
    } = req.body

    console.log(req.body)

    // review.rating = rating
    review.comment = comment
    await review.save()

    const returnReview = await Review.findByPk(reviewId, {
        include: [User]
    })
    
    res.json(returnReview)
}));


// Delete a review

router.delete('/:reviewId', asyncHandler(async (req, res) => {
    const { reviewId } = req.params
    const review = await Review.findByPk(reviewId)
    await review.destroy()
    res.json({message: 'Review deleted'})
}));



module.exports = router;
