const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { User, Lodging, Booking, Review, Image, Category, Address } = db;
const { check, validationResult } = require('express-validator');
const router = express.Router();

//Get all lodgings

router.get('/', asyncHandler(async (req, res) => {
    const lodgings = await Lodging.findAll(
        {include: Image}
    )
    res.json(lodgings)
}));

//! Get all lodgings by category

router.get('categories/:categoryId', asyncHandler(async (req, res) => {
    const category = await Category.findByPk(req.params.categoryId)
    const lodgings = await Lodging.findAll({
        where: {
            categoryId: category.id
        },
    });
    res.json(lodgings)
}));

//TODO Add new lodging
// router.post('/', requireAuth, asyncHandler(async (req, res) => {
//     const address = await Address.create({
//         addressLineOne = req.body.addressLineOne,
//         addressLineTwo = req.body.addressLineTwo,
//         city = req.body.city,
//         state = req.body.state,
//         postalCode = req.body.postalCode,
//         country = req.body.country,
//     })
//     const lodging = await Lodging.create({
//         name: req.body.name,
//         description: req.body.description,
//         categoryId: req.body.categoryId,
//         wifi: req.body.wifi,
//         addressId: address.id,
//         price: req.body.price,
//         breakfast: req.body.breakfast,
//         pool: req.body.pool,
//     });
//     const image = await new Image.create({
//         imgUrl = req.body.imgUrl,
//         lodgingId = lodging.id
//     })
//     res.json(address, lodging, image)
//     return res.redirect(`${req.baseUrl}/${lodging.id}`)
// }));

module.exports = router;
