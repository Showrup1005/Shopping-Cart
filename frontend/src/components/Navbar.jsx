import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { reset, logout } from '../features/auth/authSlice'
import { clearCart } from "../features/carts/cartSlice"

function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentSearch = searchParams.get('search') || ''
    
    const updateSearchInput = (e) => {
        const query = e.target.value
        if(query.trim()) {
            setSearchParams({search: query})
        } else {
            setSearchParams({})
        }
    }
    

    const { user } = useSelector(
        (state) => state.auth
    )

    const { items: carts } = useSelector((state) => state.cart)


    const cartItems = Array.isArray(carts) 
        ? carts 
        : (carts?.items || [])

    const totalCartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 1), 
        0
    )

    const onLogOut = () => {
        dispatch(logout())
        dispatch(reset())
        dispatch(clearCart())
        navigate('/')
    }

    // Prevents guests from visiting protected routes manually
    const handleProtectedNavigation = (e) => {
        if (!user) {
            e.preventDefault()
            navigate('/login')
        }
    }

    return (
        <section className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                <Link className="navbar-brand mr-4" to="/">Shopping Cart</Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline my-2 my-lg-0 w-100 mx-lg-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group w-100">
                            <input className="form-control" type="search" placeholder="Search products..." aria-label="Search"
                                   value={currentSearch} onChange={updateSearchInput} />
                        </div>
                    </form>

                    <div className="navbar-nav align-items-center ml-auto">
                        {/* Show Cart and Orders ONLY when logged in (or redirect to login on click) */}
                        <Link 
                            className="nav-link mr-3" 
                            to="/orders" 
                            onClick={(e) => handleProtectedNavigation(e, '/orders')}
                        >
                            My Orders
                        </Link>

                        <Link 
                            className="nav-link position-relative mr-4 p-2" 
                            to="/cart" 
                            onClick={(e) => handleProtectedNavigation(e, '/cart')}
                            aria-label="Shopping Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dark">
                                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <path d="M16 10a4 4 0 0 1-8 0"></path>
                            </svg>
                            <span className="badge badge-pill badge-danger position-absolute" style={{ top: '-2px', right: '-2px', fontSize: '10px' }}>
                                { totalCartCount }
                            </span>
                        </Link>

                        <div className="d-flex align-items-center">
                            {user ? (
                                <button onClick={onLogOut} className="btn btn-link text-danger" type="button">Logout</button> 
                            ) : (
                                <>
                                    <Link to="/login" className="btn btn-link text-secondary mr-2">Login</Link>
                                    <Link to="/register" className="btn btn-outline-dark">Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Navbar