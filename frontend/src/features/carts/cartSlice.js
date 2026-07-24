import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const localCart = JSON.parse(localStorage.getItem('cartItems')) || []

const initialState = {
    items: localCart,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const addToCart = createAsyncThunk('carts/createCart',
    async (cartData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await cartService.addToCart(cartData, token)
        } catch (error) {
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getCart = createAsyncThunk('carts/getCart',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await cartService.getCart(token)
        } catch (error) {
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
        
    } 
)

export const updateCart = createAsyncThunk('carts/updateCart',
    async (cartData, thunkAPI) => {
        try {
            
            const token = thunkAPI.getState().auth.user.token
            return await cartService.updateCart(cartData, token)
        } catch (error) {
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
        
    }
)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
        clearCart: (state) => {
            state.items = []
            localStorage.removeItem('cartItems')
        },
        addLocalItem: (state, action) => {
            const newItem = action.payload
            const itemQuantity = Number(newItem.quantity) || 1

            const existingIndex = state.items.findIndex(
                (item) => (item.product?._id || item.product) === (newItem.product?._id || newItem.product)
            );

            if (existingIndex >= 0) {
                const currentQty = Number(state.items[existingIndex].quantity) || 1;
                state.items[existingIndex].quantity = currentQty + itemQuantity;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: itemQuantity
                })
            }
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(addToCart.pending, (state) => {
            state.isLoading = true
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.items = action.payload
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(getCart.pending, (state) => {
            state.isLoading = true
          })
          .addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.items = action.payload
          })
          .addCase(getCart.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(updateCart.pending, (state) => {
            state.isLoading = true
          })
          .addCase(updateCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.items = action.payload
          })
          .addCase(updateCart.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const {reset, clearCart, addLocalItem} = cartSlice.actions
export default cartSlice.reducer
