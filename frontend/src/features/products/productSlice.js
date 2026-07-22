import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: ''
}

export const getProducts = createAsyncThunk('products/getProduct',
    async (_, thunkAPI) => {
        try {
            return await productService.getProducts()
        } catch (error) {
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(getProducts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
         })
         .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
         })
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer