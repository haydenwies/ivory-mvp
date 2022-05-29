import { configureStore } from "@reduxjs/toolkit";
import functionalitySlice from "./functionality";
import orderInfoSlice from "./orderInfo";
import menuDataSlice from "./menuData"
export default configureStore({
  reducer: {
    functionality: functionalitySlice,
    orderInfo: orderInfoSlice,
    menuData: menuDataSlice
  },
});
