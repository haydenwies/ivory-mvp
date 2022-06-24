import { configureStore } from "@reduxjs/toolkit";
import functionalitySlice from "./functionality";
import orderInfoSlice from "./orderInfo";
import menuDataSlice from "./menuData";
import receiptInfoSlice from "./receiptInfo";
import checkoutSlice from "./checkout";
export default configureStore({
  reducer: {
    functionality: functionalitySlice,
    orderInfo: orderInfoSlice,
    menuData: menuDataSlice,
    receiptInfo: receiptInfoSlice,
    checkout: checkoutSlice,
  },
});
