const asyncHandler = require('express-async-handler')
const Cart = require('../models/cartModel')

const getCarts = asyncHandler(async (req, res) => {
    // 1. Find the cart belonging to the logged-in user
    // 2. Use .populate() to go grab the full Product details matching that ID
    const cart = await Cart.find({user: req.user.id}).populate('items.product')
    res.status(200).json(cart)
})

const addToCart = asyncHandler(async (req, res) => {
    
    const { cart } = req.body    // Array of { productId, quantity }
    

    if(!cart || !Array.isArray(cart)) {
        res.status(400)
        throw new Error("Invalid cart data provied")
    }

    // 1. Find or create the user's permanent database cart
    const dbCart = await Cart.findOne({user: req.user.id})
    if(!dbCart) {
        dbCart = await Cart.create({user: req.user.id, items: []})
    }

    // 2. Loop through cart 
    for(const cartItem of cart) {
        const targetProductId = cartItem.productId 
        
        // 3. Check if this item is already in the db
        const existingIndex = await dbCart.items.findIndex(
            (item) => item.product.toString() === targetProductId
        )

        if(existingIndex > -1){
            // 4. item already in the db
            dbCart.items[existingIndex].quantity += cartItem.quantity
        } else {
            dbCart.items.push(
                {
                    product: cartItem.productId,
                    quantity: cartItem.quantity
                }
            )
        }
    }

    await dbCart.save()
    const newCart = await dbCart.populate('items.product')
    res.status(200).json(newCart)
})

module.exports = {
    getCarts,
    addToCart,
}