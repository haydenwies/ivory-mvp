import { createSlice } from "@reduxjs/toolkit";

export const receiptInfoSlice = createSlice({
  name: "receiptInfo",
  initialState: {
    receipts: [],
    activeDates: [],
    selectedDate: "",
    filteredReceipts: [],
  },
  reducers: {
    setReceipts: (state, { payload }) => {
      state.receipts = payload;
    },
    setActiveDates: (state, { payload }) => {
      state.activeDates = payload;
    },
    setSelectedDate: (state, { payload }) => {
      state.selectedDate = payload;
    },
    setFilteredReceipts: (state, { payload }) => {
      state.filteredReceipts = payload;
    },
  },
});

export const { setReceipts, setActiveDates, setSelectedDate, setFilteredReceipts } = receiptInfoSlice.actions;
export default receiptInfoSlice.reducer;
