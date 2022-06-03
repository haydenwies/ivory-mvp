import { createSlice } from "@reduxjs/toolkit";

export const functionalitySlice = createSlice({
  name: "functionality",
  initialState: {
    // --------------------------------------------- Navigation --------------------------------------------- //
    indexInstance: 0,
    instances: [
      {
        navOn: false,
        customerInfoOn: false,
        categoryType: "",
        waitTimeOn: false,
        customItemOn: false,
        searchItemOn: false,
        editItemOn: false,
      },
    ],
  },
  reducers: {
    setInstances: ({ instances, indexInstance }, { payload }) => {
      const [actionType, value] = payload;
      let instance = instances[indexInstance];

      switch (actionType) {
        case "setNavOn":
          console.log(value);
          instance.navOn = value;
          break;
        case "setCustomerInfoOn":
          instance.customerInfoOn = value;
          break;
        case "setCategoryType":
          instance.categoryType = value;
          break;
        case "setWaitTimeOn":
          instance.waitTimeOn = value;
          break;
        case "setCustomItemOn":
          instance.customItemOn = value;
          break;
        case "setSearchItemOn":
          instance.searchItemOn = value;
          break;
        case "setEditItemOn":
          console.log("EDIT")
          instance.editItemOn = value;
          break;
      }
    },
  },
});

export const { setInstances } = functionalitySlice.actions;
export default functionalitySlice.reducer;
