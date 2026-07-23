import { useEffect } from "react"
import Product from "./Product"
import { useSelector, useDispatch } from "react-redux"
import {reset as resetProducts , getProducts} from '../../features/products/productSlice'
import { reset as resetCart } from '../../features/carts/cartSlice'
import Spinner from "../../components/Spinner"

function ProductList() {

    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(
        (state) => state.product
    )

    useEffect(() => {
        dispatch(getProducts())
        return () => { 
            dispatch(resetProducts()) 
            dispatch(resetCart())
        }
    }, [dispatch])

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='products'>
                { products && products.length > 0 ? (
                <div className='row'>
                    { products.map((product) => {       
                        return <Product key={product._id} product={product} />  
                    })}
                </div>
                ) : (
                <h3>You need to add some products</h3>
                )}
            </section>
        </>
    )
}

export default ProductList