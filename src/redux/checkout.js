import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkoutPhoneEntry: "",
    checkoutReceipt: {},
  },
  reducers: {
    setCheckoutReceipt: (state, { payload }) => {
      state.checkoutReceipt = payload;
    },
    setCheckoutPhoneEntry: (state, { payload }) => {
      state.checkoutPhoneEntry = payload;
    },
  },
});

export const { setCheckoutReceipt, setCheckoutPhoneEntry } = checkoutSlice.actions;
export default checkoutSlice.reducer;
