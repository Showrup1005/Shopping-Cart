import axios from 'axios';

const API_URL = '/api/payment/';

// Create Payment Intent
const createPaymentIntent = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}create-payment-intent`,
    { orderId },
    config
  );

  return response.data; // Returns { clientSecret, paymentIntentId }
};

const paymentService = {
  createPaymentIntent,
};

export default paymentService;