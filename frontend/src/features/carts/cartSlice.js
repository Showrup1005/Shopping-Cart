import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
    items: [],
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
            state.items.push(action.payload)
          })
          .addCase(getCart.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const {reset} = cartSlice.actions
export default cartSlice.reducer
