import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../../components/CheckoutForm";
import { getOrder } from "../../features/order/orderSlice";
import { createPaymentIntent } from "../../features/payment/paymentSlice";

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

function Payment() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order: orderData, isLoading: isOrderLoading } = useSelector((state) => state.order);
  const { clientSecret, isLoading: isPaymentLoading } = useSelector((state) => state.payment);
  

  const order = Array.isArray(orderData)
    ? orderData.find((o) => o._id === orderId) || orderData[0]
    : orderData;

  useEffect(() => {
    if (orderId) {
      dispatch(getOrder(orderId));
      dispatch(createPaymentIntent(orderId));
    }
  }, [orderId, dispatch]);

  if (isOrderLoading || isPaymentLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <h3>Loading payment details...</h3>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center text-danger">
        <h3>Order not found</h3>
        <p>Could not retrieve order details for ID: {orderId}</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Stripe Checkout Form Column */}
        <div className="col-lg-7">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="fw-bold mb-4">Payment Method</h2>

              {clientSecret ? (
                <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm orderId={orderId} />
                </Elements>
              ) : (
                <p className="text-muted">Initializing Stripe payment gateway...</p>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Order Summary Column */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="h4 fw-bold mb-0">Order Summary</h3>
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                  {order.paymentStatus || "Pending"}
                </span>
              </div>

              <p className="text-muted small mb-3">
                Order ID: <span className="fw-monospace">{order._id}</span>
              </p>

              <hr />

              {/* Items List */}
              <div className="order-items-list mb-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
                {order.items?.map((item) => {
                  const product = item.product || {};
                  const price = item.price || product.price || 0;
                  const title = product.title || "Product";
                  const image = product.image;

                  return (
                    <div
                      className="d-flex align-items-center justify-content-between mb-3"
                      key={product._id || item._id}
                    >
                      <div className="d-flex align-items-center gap-3">
                        {image && (
                          <img
                            src={image}
                            alt={title}
                            className="rounded-3 border"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        )}
                        <div>
                          <h6 className="mb-0 text-truncate" style={{ maxWidth: "180px" }}>
                            {title}
                          </h6>
                          <small className="text-muted">
                            Qty: {item.quantity} × ${price.toFixed(2)}
                          </small>
                        </div>
                      </div>

                      <strong className="text-nowrap">
                        ${(price * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  );
                })}
              </div>

              <hr />

              {/* Price Calculation Breakdown */}
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Subtotal</span>
                <span>${(order.subtotal || 0).toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Shipping</span>
                <span>
                  {order.shipping === 0 ? "FREE" : `$${(order.shipping || 0).toFixed(2)}`}
                </span>
              </div>

              <div className="d-flex justify-content-between text-muted mb-3">
                <span>Tax</span>
                <span>${(order.tax || 0).toFixed(2)}</span>
              </div>

              <hr />

              {/* Total Price */}
              <div className="d-flex justify-content-between align-items-center pt-2">
                <strong className="h5 fw-bold mb-0">Total Due</strong>
                <strong className="h4 fw-bold text-primary mb-0">
                  ${(order.total || 0).toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;