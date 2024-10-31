import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: { history: [] },
  reducers: {
    setTransactionHistory: (state, action) => {
      state.history = action.payload;
    },
    clearTransactionHistory: (state) => {
      state.history = [];
    },
  },
});

export const { setTransactionHistory, clearTransactionHistory } = transactionSlice.actions;
export default transactionSlice.reducer;
