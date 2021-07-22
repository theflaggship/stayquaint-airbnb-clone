const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { User, Lodging, Booking, Review, Image, Category, Address } = db;
const { check, validationResult } = require('express-validator');
const { response } = require('express');
const router = express.Router();

//Get all lodgings

router.get('/', asyncHandler(async (req, res) => {
    const lodgings = await Lodging.findAll(
        {include: Image, Address}
    )
    res.json(lodgings)
}));

// Get single lodging

router.get('/:id', asyncHandler(async (req, res) => {
    const lodging = await Lodging.findByPk(req.params.id,
        {include: Image, Category, Review, Address}
    )
    res.json(lodging)
}));

// Get all lodgings by category

router.get('/categories/:categoryId', asyncHandler(async (req, res) => {
    const category = await Category.findByPk(req.params.categoryId)
    const lodgings = await Lodging.findAll({
        where: {
            categoryId: category.id
        },
    });
    res.json(lodgings)
}));



// Add new lodging
router.post('/', asyncHandler(async (req, res) => {
    const {
        addressLineOne,
        addressLineTwo,
        city,
        state,
        postalCode,
        country,
        name,
        description,
        categoryId,
        wifi,
        price,
        breakfast,
        pool,
        imgUrl,
        id
    } = req.body

    const address = await Address.create({
        addressLineOne,
        addressLineTwo,
        city,
        state,
        postalCode,
        country,
    })
    const lodging = await Lodging.create({
        name,
        description,
        categoryId,
        wifi,
        addressId: address.id,
        userId: id,
        price,
        breakfast,
        pool
    });
    const image = await Image.create({
        imgUrl,
        lodgingId: lodging.id
    })
    res.json({address, lodging, image})
}));

//TODO Edit lodging

//TODO Delete lodging


module.exports = router;
