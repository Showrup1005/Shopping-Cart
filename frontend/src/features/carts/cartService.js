import axios from 'axios'

const API_URL = '/api/carts'

const addToCart = async (cartData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
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


const cartService = {
    addToCart,
    getCart,
}
export default cartService