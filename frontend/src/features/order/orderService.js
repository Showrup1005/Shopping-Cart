import axios from 'axios'

const API_URL = '/api/order'

const createOrder = async (orderData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.post(API_URL, { cart: Array.isArray(orderData) ? orderData : [orderData] }, config)
    return response.data
}

const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const getOrder = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

const orderService = {
    createOrder,
    getOrders,
    getOrder
}
export default orderService