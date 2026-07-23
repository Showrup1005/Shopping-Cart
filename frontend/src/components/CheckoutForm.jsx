// src/components/CheckoutForm.jsx
import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return; // Stripe has not loaded yet

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders`,
      },
      redirect: 'if_required', 
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      
      navigate('/orders');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <PaymentElement />
      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
      <button 
        type="submit" 
        disabled={!stripe || isProcessing}
        style={{ marginTop: '20px', width: '100%', padding: '10px' }}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutForm;