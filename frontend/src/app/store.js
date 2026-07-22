import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/carts/cartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  },
})