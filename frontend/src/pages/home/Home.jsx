import Navbar from '../../components/Navbar'
import ProductList from '../product/ProductList'
import { dummyCart } from '../../data/cartData'

function Home({ loadCart }) {
    return (
        <>
          <Navbar />
          <ProductList products={dummyCart} loadCart={loadCart} />
        </>
    )
}

export default Home