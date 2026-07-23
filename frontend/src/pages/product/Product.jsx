import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../../features/carts/cartSlice"
import Spinner from "../../components/Spinner"
import { toast } from 'react-toastify'

function Product({ product }) {

    const [quantity, setQuantity] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()
    

    const increment = () => setQuantity((prev) => prev + 1)
    const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))

    const handleCart = async () => {
        if(quantity === 0) return
        const cartData = {
            productId: product._id,  //  _id: ObjectId("6878d2e1f4a123456789abcd"),
            quantity: quantity
        }

        try {
            setIsSubmitting(true)
            await dispatch(addToCart(cartData)).unwrap()  // .unwrap() waits for the async thunk to resolve successfully
            toast.success(`${product.title} added successfully to the cart`)
            setQuantity(0)
        } catch(error) {
            toast.error("Couldn't add product to cart")
            console.log('Failed to add to cart', error)
        } finally {
            setIsSubmitting(false)
        }
        
    }

    return (
        <>
        <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex">
          <div className="product w-100 h-100">
            <div className="card w-100 h-100 d-flex flex-column shadow-sm">
                <img 
                    className="card-img-top" 
                    src={product.image} 
                    alt={product.title} 
                    style={{ height: '220px', objectFit: 'cover' }} 
                />
                
                {/* flex-column and justify-content-between aligns buttons perfectly to the bottom of shorter cards */}
                <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 className="card-title text-truncate" title={product.title}>
                            {product.title}
                        </h5>
                        <p className="card-text text-success font-weight-bold mb-3">
                            ${product.price.toFixed(2)}
                        </p>
                    </div>
                    
                    <div>
                        <div className="d-flex align-items-center justify-content-center bg-light rounded py-1 mb-3">
                            <button className="btn btn-sm btn-link text-dark font-weight-bold px-3" onClick={decrement}>-</button>
                            <span className="mx-3 font-weight-bold">{quantity}</span>
                            <button className="btn btn-sm btn-link text-dark font-weight-bold px-3" onClick={increment}>+</button>
                        </div>
                        <button onClick={handleCart} className="btn btn-success w-100">
                            { isSubmitting ? <Spinner/> : "Add to cart" }
                        </button>
                    </div>
                </div>
            </div>
          </div>  
        </div>   
        </>
    )
}

export default Product