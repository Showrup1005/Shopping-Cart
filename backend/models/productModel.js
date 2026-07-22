const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    attributes: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    }
})

module.exports = mongoose.model('Product', productSchema)

