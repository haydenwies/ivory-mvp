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
    instancesDefaultSettings: [{}],
  },
  reducers: {
    setInstances: (state, { payload }) => {
      const { instances, indexInstance } = state;
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
          instance.editItemOn = value;
          break;
        //This resets all modals and closes them
        case "RESET_DEFAULT_FUNCTIONALITY":
          instances[indexInstance] = state.instancesDefaultSettings[indexInstance];
          break;
      }
    },
    setInstancesDefaultSettings: (state, { payload }) => {
      const { instancesDefaultSettings, indexInstance } = state;
      const [actionType, value] = payload;
      switch (actionType) {
        // Stores the default state of all the modals.
        case "SAVE_DEFAULT_FUNCTIONALITY":
          instancesDefaultSettings[indexInstance] = JSON.parse(
            JSON.stringify(state.instances[indexInstance])
          );
          break;
      }
    },
  },
});

export const { setInstances, setInstancesDefaultSettings } = functionalitySlice.actions;
export default functionalitySlice.reducer;
