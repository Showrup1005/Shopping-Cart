import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCart, getCart } from "../../features/carts/cartSlice";

function CartCard({ item }) {

    const dispatch = useDispatch()
    const product = item.product || {}

    const [quantity, setQuantity] = useState(item.quantity)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        setQuantity(item.quantity)
        setIsUpdating(false);
    }, [item.quantity]);


    const increment = () => {
        const updatedQuantity = quantity + 1
        setQuantity(updatedQuantity)
        setIsUpdating(updatedQuantity !== quantity)
    }

    const decrement = () => {
        const updatedQuantity = quantity > 0 ? quantity - 1 : quantity
        setQuantity(updatedQuantity)
        setIsUpdating(updatedQuantity !== quantity)
    }

    const handleUpdateCart = async () => {

        if(quantity === item.quantity || quantity === 0) {
            toast.error("Quantity cannot be same or zero")
            return
        } 
        const cartData = {
            productId: product._id,  
            quantity: quantity
        }

        try {
            setIsSubmitting(true)
            await dispatch(updateCart(cartData)).unwrap()  // .unwrap() waits for the async thunk to resolve successfully
            await dispatch(getCart())
            toast.success(`${product.title} updated successfully to the cart`)
            setIsUpdating(false)
        } catch(error) {
            toast.error("Couldn't update the cart", error)
        } finally {
            setIsSubmitting(false)
        }
            
    }

    return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
                <div className="row align-items-center">

                    {/* Product Image */}
                    <div className="col-md-2 text-center mb-3 mb-md-0">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="img-fluid rounded-3"
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="col-md-5">
                        <h5 className="fw-bold mb-2">
                            {product.title}
                        </h5>

                        <div className="d-flex align-items-center mb-2">
                            <span className="text-warning">
                                <i className="bi bi-star-fill"></i>
                            </span>

                            <span className="ms-2 fw-semibold">
                                {product.rating}
                            </span>
                        </div>

                        <h4 className="fw-bold text-primary mb-0">
                            ${product.price}
                        </h4>
                    </div>

                    {/* Quantity */}
                    <div className="col-md-3">
                        <div className="d-flex justify-content-center align-items-center">

                            <button className="btn btn-outline-secondary rounded-circle" onClick={decrement}>
                                <i className="bi bi-dash"></i>
                            </button>

                            <span className="mx-3 fs-5 fw-bold">
                                {quantity}
                            </span>

                            <button className="btn btn-dark rounded-circle" onClick={increment}>
                                <i className="bi bi-plus"></i>
                            </button>

                        </div>
                        {isUpdating && (
                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={handleUpdateCart}
                                    disabled={isSubmitting}
                                    className="btn btn-sm btn-primary rounded-pill px-3 mt-1"
                                >
                                    {isSubmitting ? "Updating..." : "Update Quantity"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Total */}
                    <div className="col-md-2 text-md-end text-center mt-3 mt-md-0">

                        <small className="text-muted d-block">
                            Total
                        </small>

                        <h4 className="fw-bold">
                            ${(product.price * quantity).toFixed(2)}
                        </h4>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default CartCard;