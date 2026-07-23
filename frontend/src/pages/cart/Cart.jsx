import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getCart, reset } from '../../features/carts/cartSlice';
import {createOrder} from '../../features/order/orderSlice'
import CartCard from './CartCard';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Cart() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items: carts, isLoading } = useSelector(
    (state) => state.cart
  )

  useEffect(() => {
    dispatch(getCart())
    return () => dispatch(reset())
  }, [dispatch])

  const cartItems = Array.isArray(carts) ? carts.flat() : []

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0
    return acc + price * item.quantity
  }, 0)

  const tax = subtotal > 0 ? 20 : 0
  const total = subtotal + tax

  if(isLoading) {
    return <Spinner />
  }

  const handleCheckout = async () => {

    if(cartItems.length === 0) return
    const orderData = {
        items: cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        }))
    }
    try {
      const order = await dispatch(createOrder(orderData)).unwrap();
      navigate(`/payment/${order._id}`);  // .unwrap() waits for the async thunk to resolve successfully
    } catch(error) {
      toast.error("Couldn't update the cart", error)
    }
  }
  
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Shopping Cart</h2>
          <p className="text-muted mb-0">{cartItems.length} Items</p>
        </div>

        <Link to='/' className="btn btn-outline-dark rounded-pill px-4">
          Continue Shopping
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {cartItems.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <CartCard key={item._id || item.product?._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="card border-0 shadow-sm p-5 text-center rounded-4">
              <h4 className="text-muted mb-0">You do not have any products in your cart</h4>
            </div>
          )}
        </div>

        {/* Order Summary Column (Takes up 4/12 grid spaces) */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow rounded-4"
            style={{ position: "sticky", top: "90px" }}
          >
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4">Order Summary</h3>

              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <strong className="text-success">Free</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Tax</span>
                <strong>${tax.toFixed(2)}</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <h4>Total</h4>
                <h4 className="text-primary">${total.toFixed(2)}</h4>
              </div>

              <button 
                className="btn btn-dark btn-lg w-100 rounded-pill mb-3"
                disabled={cartItems.length === 0} onClick={handleCheckout}
              >
                Checkout
              </button>

              <Link to="/" className="btn btn-outline-dark w-100 rounded-pill">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;