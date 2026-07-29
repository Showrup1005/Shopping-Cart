const asyncHandler = require('express-async-handler')
const Cart = require('../models/cartModel')

const getCarts = asyncHandler(async (req, res) => {
    // 1. Find the cart belonging to the logged-in user
    // 2. Use .populate() to go grab the full Product details matching that ID
    const cart = await Cart.findOne({ user: req.user.id }).populate({
        path: 'items.product',
        select: 'title price image rating quantity' // Only fetch necessary fields from Product collection
    })
    
    if (!cart || !cart.items) {
        return res.status(200).json([])
    }

    res.status(200).json(cart.items)
})

const addToCart = asyncHandler(async (req, res) => {
    
    const { cart } = req.body    // Array of { productId, quantity }
    
    // console.log(cart)
    if(!cart || !Array.isArray(cart)) {
        res.status(400)
        throw new Error("Invalid cart data provied")
    }

    // 1. Find or create the user's permanent database cart
    let dbCart = await Cart.findOne({user: req.user.id})
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
    // console.log(newCart)
    res.status(200).json(newCart)
})

const updateCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { productId, quantity } = cart[0];
    
    try {
        const dbcart = await Cart.findOne({user: req.user.id})

        if(!dbcart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const itemIndex = dbcart.items.findIndex(
            (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                if (quantity > 0) {
                    // Update to new quantity
                    dbcart.items[itemIndex].quantity = quantity;
                } else {
                    // If quantity is 0, remove item from cart
                    dbcart.items.splice(itemIndex, 1);
                }

                await dbcart.save();
                // Populate product details before returning
                await dbcart.populate("items.product");

                return res.status(200).json(dbcart);
            } else {
                return res.status(404).json({ message: "Item not found in cart" });
            }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

const deleteCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ "items._id": req.params.id })
    if (!cart) {
        res.status(404)
        throw new Error('Cart item not found')
    }

    // Remove ONLY that specific item from the items array
    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.id)
    await cart.save()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCarts,
    addToCart,
    updateCart,
    deleteCart
}