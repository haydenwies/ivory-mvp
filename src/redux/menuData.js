import { createSlice } from "@reduxjs/toolkit";

const menuDataSlice = createSlice({
  name: "menuData",
  initialState: {
    menuItems: [
      {
        name: "Dinner for 5",
        price: 65.95,
        category: ["Family Dinners"],
        components: ["Terriyaki Beef"],
        quantity: 1,
        modifiers: [],
      },
      {
        name: "Noodles with the Sauce",
        price: 65.95,
        category: ["Family Dinners"],
        quantity: 1,
        modifiers: [],
      },
      {
        name: "None Yea",
        price: 65.95,
        category: ["Family Dinners"],
        quantity: 1,
        modifiers: [],
      },
    ],
    menuCategories: ["Fried Rice", "Family Dinners", "Noodles", "Soup"],
  },
  reducers: {
    setMenuData: (state, { payload }) => {
      state.menuItems = payload;
    },
    setMenuCategories: (state, { payload }) => {
      state.menuCategories = payload;
    },
  },
});

export const { setMenuData, setMenuCategories } = menuDataSlice.actions;
export default menuDataSlice.reducer;
