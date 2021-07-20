const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { User, Lodging, Booking, Review, Image, Category, Address } = db;
const { check, validationResult } = require('express-validator');
const router = express.Router();

//TODO Get all lodgings

router.get('/', asyncHandler(async (req, res) => {
    const lodgings = await Lodging.findAll()
    res.json(lodgings)
}));

//TODO Get all lodgings by category

// router.get('/:category', asyncHandler(async (req, res) => {
//     const category = await Category.findById(req.params.category);
//     const lodgings = await Lodging.findAll({
//         where: {
//             categoryId: category.id
//         },
//         include: Category, Images, Reviews, Address
//     });
//     return res.json(lodgings)
// }));

//TODO Add new lodging
// router.post('/', requireAuth, asyncHandler(async (req, res) => {
// }));

module.exports = router;
