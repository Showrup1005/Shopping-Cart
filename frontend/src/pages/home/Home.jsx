import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import ProductList from '../product/ProductList'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addToCart, clearCart, getCart } from '../../features/carts/cartSlice'


function Home() {
    const { user } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const search = searchParams.get("search") || ""

    useEffect(() => {
        const syncGuestCart = async () => {
            if(user) {
                const localCart = JSON.parse(localStorage.getItem('cartItems')) || []
                console.log(localCart)
                if(localCart.length > 0) {
                    try {
                        for (const item of localCart) {
                            const productId = item.product?._id || item.product || item.productId
                            await dispatch(addToCart({ 
                                productId: productId, 
                                quantity: item.quantity 
                            })).unwrap()
                        }
                        
                    } catch(error) {
                        console.log("Error adding product to cart", error)
                    } finally {
                        dispatch(clearCart())
                    }
                }
                dispatch(getCart())
            }
        }
        syncGuestCart()
    }, [user, dispatch])

    
    return (
        <>
          <Navbar />
          <ProductList search={search} />
        </>
    )
}

export default Home