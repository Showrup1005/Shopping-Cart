import axios from 'axios'

const API_URL = '/api/carts'

const addToCart = async (cartdata, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, cartdata, config)
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