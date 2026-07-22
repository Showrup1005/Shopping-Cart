import { useEffect } from "react"
import Product from "./Product"
import { useSelector, useDispatch } from "react-redux"
import {reset, getProducts} from '../../features/products/productSlice'
import Spinner from "../../components/Spinner"

function ProductList() {

    const dispatch = useDispatch()
    const { products, isLoading, isError, message } = useSelector(
        (state) => state.product
    )

    useEffect(() => {
        dispatch(getProducts())
        
        return () => {  
            dispatch(reset())   // Cleanup on unmount
        }
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <div className="alert alert-danger text-center mt-4">{message}</div>
    }

    return (
        <>
            <section className='products'>
                { products.length > 0 ? (
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