const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const getProduct = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

const setProduct = asyncHandler(async (req, res) => {
    const {title, price, quantity, image, rating, ...dynamicAttributes} = req.body

    if(req.body.quantity == 0) {
        res.status(400)
        throw new Error("Please increase number of product from zero")
    }

    const product = await Product.create({
        title,
        price,
        quantity,
        image,
        rating,
        attributes: dynamicAttributes
    })
    res.status(200).json(product)
})

module.exports = {
    getProduct,
    setProduct,
}