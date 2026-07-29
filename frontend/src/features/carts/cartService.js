import axios from 'axios'

const API_URL = '/api/carts/'

const addToCart = async (cartData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const c = { cart: Array.isArray(cartData) ? cartData : [cartData] }
    console.log(c)

    const response = await axios.post(API_URL, { cart: Array.isArray(cartData) ? cartData : [cartData] }, config)
    return response.data
}

const getCart = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const updateCart = async (cartData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL, { cart: Array.isArray(cartData) ? cartData : [cartData] }, config)
    return response.data
}

const removeFromCart = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const cartService = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
}
export default cartService