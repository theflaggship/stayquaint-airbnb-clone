const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { User, Lodging, Booking, Review, Image, Category, Address } = db;
const { check, validationResult } = require('express-validator');
const { response } = require('express');
const router = express.Router();

// GET /api/bookings


// GET /api/bookings/:id

// POST /api/bookings

router.post('/', asyncHandler(async (req, res) => {
    const {
        dateStart,
        dateEnd
    } = req.body

    const booking = await Booking.create({
        userId,
        lodgingId,
        dateStart,
        dateEnd
    })
    res.json({booking})
}));

// PUT /api/bookings/:id



module.exports = router;
