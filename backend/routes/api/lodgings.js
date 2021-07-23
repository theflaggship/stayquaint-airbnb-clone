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
        {include: [Image, Address]}
    )
    res.json(lodgings)
}));

// Get single lodging

router.get('/:id', asyncHandler(async (req, res) => {
    const lodging = await Lodging.findByPk(req.params.id,
        {include: [Image, Category, Review, Address]}
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

// Get lodgings by user
router.get('/user/:userId', asyncHandler(async (req, res) => {
    const lodgings = await Lodging.findAll({
        where: {
            userId: req.params.userId
        },
        include: [Image, Address, Review, Category]
    })
    res.json(lodgings)
}));

//Edit lodging

router.put('/:id', asyncHandler(async (req, res) => {

    const lodgingId = req.params.id
    console.log("++++++++++", lodgingId, "+++++++++++++")
    const lodging = await Lodging.findByPk(lodgingId)
    const address = await Address.findByPk(lodging.addressId)
    const image = await Image.findOne({
        where: {lodgingId}
    })
    console.log("++++++++++++", image, "++++++++++++")

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

    address.addressLineOne = addressLineOne
    address.addressLineTwo = addressLineTwo
    address.city = city
    address.state = state
    address.postalCode = postalCode
    address.country = country
    lodging.name = name
    lodging.description = description
    lodging.categoryId = categoryId
    lodging.wifi = wifi
    lodging.price = price
    lodging.breakfast = breakfast
    lodging.pool = pool
    lodging.userId = id
    image.imgUrl = imgUrl
    await address.save()
    await lodging.save()
    await image.save()
    res.json(address, lodging, image)
}));

//Delete lodging

router.delete('/:id', asyncHandler(async (req, res) => {
    const lodgingId = req.params.id
    const lodging = await Lodging.findByPk(lodgingId)
    const address = await Address.findByPk(lodging.addressId)
    const image = await Image.findOne({
        where: {lodgingId}
    })
    await image.destroy()
    await lodging.destroy()
    await address.destroy()
    res.json({message: 'Deleted successfully'})
}));



module.exports = router;
