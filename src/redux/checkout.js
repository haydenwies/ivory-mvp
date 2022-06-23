import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkoutReceipt:{},
    checkoutPhoneEntry:""
  },
  reducers: {
    setCheckoutReceipt:(state, {payload})=>{
        state.checkoutReceipt = payload;
        console.log(state.checkoutReceipt)
    },
    setCheckoutPhoneEntry:(state, {payload})=>{
        state.checkoutPhoneEntry = payload;
    }
  },
});

export const { setCheckoutReceipt, setCheckoutPhoneEntry} = checkoutSlice.actions;
export default checkoutSlice.reducer;
