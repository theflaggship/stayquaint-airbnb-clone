const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { User, Lodging, Booking, Review, Image, Category, Address } = db;
const { check, validationResult } = require('express-validator');
const { response } = require('express');
const router = express.Router();

// GET /api/bookings

router.get('/users/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const bookings = await Booking.findAll({
        where: { userId },
        include: [User, Lodging]
    });
    res.json(bookings);
}));


// GET /api/bookings/:id

// POST /api/bookings

router.post('/', asyncHandler(async (req, res) => {
    const {
        lodgingId,
        userId,
        dateStart,
        dateEnd
    } = req.body

    const booking = await Booking.create({
        userId,
        lodgingId,
        dateStart,
        dateEnd
    })
    res.json(booking)
}));

// PUT /api/bookings/:id

// DELETE /api/bookings/:id

router.delete('/:bookingId', asyncHandler(async (req, res) => {
    const { bookingId } = req.params
    const booking = await Booking.findByPk(bookingId)
    await booking.destroy()
    res.json({message: 'Deleted successfully'})
}));




module.exports = router;
