import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
    orders: [],
    order: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

export const createOrder = createAsyncThunk('order/createOrder',
    async (orderData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await orderService.createOrder(orderData, token)
        } catch (error) {
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getOrders = createAsyncThunk('order/getOrders',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await orderService.getOrders(token)
        } catch (error) {
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
        
    } 
)


export const getOrder = createAsyncThunk('order/getOrder',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await orderService.getOrder(id, token)
        } catch (error) {
            const message = (error.response && error.response.data 
                && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
        
    } 
)




export const orderSlice = createSlice({
    name: 'order',
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
          .addCase(createOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.order = action.payload; // Store created order
          })
          .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload; // Save array in orders
          })
          .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(getOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.order = action.payload; // Save object in order
          })
          .addCase(getOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });
    }
})

export const {reset} = orderSlice.actions
export default orderSlice.reducer
