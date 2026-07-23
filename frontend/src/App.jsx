import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import RegisterUser from './pages/user/RegisterUser'
import LoginUser from './pages/user/LoginUser'
import Cart from './pages/cart/Cart'
import Order from './pages/order/Order'
import Payment from './pages/order/Payment'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {

  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<RegisterUser />} />
            <Route path='/login' element={<LoginUser />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Order />} />
            <Route path='/payment/:orderId' element={<Payment />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
