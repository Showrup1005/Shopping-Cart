import { useEffect } from "react"
import Product from "./Product"
import { useSelector, useDispatch } from "react-redux"
import { getProducts} from '../../features/products/productSlice'
import Spinner from "../../components/Spinner"

function ProductList({ search }) {

    const dispatch = useDispatch()
    const { products, isLoading } = useSelector(
        (state) => state.product
    )

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const productFilter = products.filter((product) => 
        product.title?.toLowerCase().includes(search.toLowerCase())
    )

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='products'>
                { productFilter && productFilter.length > 0 ? (
                <div className='row'>
                    { productFilter.map((product) => {       
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