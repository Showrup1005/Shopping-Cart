import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from './paymentService';

const initialState = {
  clientSecret: null,
  paymentIntentId: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Create Payment Intent Thunk
export const createPaymentIntent = createAsyncThunk(
  'payment/createIntent',
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await paymentService.createPaymentIntent(orderId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.clientSecret = null;
      state.paymentIntentId = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clientSecret = action.payload.clientSecret;
        state.paymentIntentId = action.payload.paymentIntentId;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;