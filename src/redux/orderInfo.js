import { createSlice } from "@reduxjs/toolkit";

export const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState: {
    order: {
      id: "", //YYYY-MM-DD-HH-MM-SS-PhoneNumber
      phoneNumber: "",
      time: "",
      date: "", //YYYY-MM-DD
      orderType: "PICK_UP",
      deliveryAddress: "",
      deliveryFee: (0.0).toFixed(2),
      orderTime: "",
      isScheduledOrder: false,
      scheduledTime: { date: "", time: "" },
      waitTime: { displayName: "", units: "", magnitude: 0 },
      finishTime: "",
      paid: false,
      note: "",
      items: [], //item->{name(string), price(float), components(string), modifiers(string), quantity(int)}
      subTotal: (0.0).toFixed(2),
      discounted: true,
      beforeTaxDiscount: (0.0).toFixed(2),
      tax: (0.0).toFixed(2),
      afterTaxDiscount: (0.0).toFixed(2),
      grandTotal: (0.0).toFixed(2),
      paymentMethod: "",
      printed: false,
    },
    orderOptions: {
      isDiscountBeforeTax: true,
      isDiscountAfterTax: false,
      isDeliveryBeforeTax: false,
      isDeliveryAfterTax: true,
    },
  },
  reducers: {
    setOrderOptions: ({ orderOptions }, { payload }) => {
      const [actionType, value] = payload;

      switch (actionType) {
        case "setIsDiscountBeforeTax":
          orderOptions.isDiscountBeforeTax = value;
          break;
        case "setIsDiscountAfterTax":
          orderOptions.isDiscountAfterTax = value;
          break;
        case "setIsDeliveryBeforeTax":
          orderOptions.isDeliveryBeforeTax = value;
          break;
        case "setIsDeliveryAfterTax":
          orderOptions.isDeliveryAfterTax = value;
          break;
      }
    },

    // ------------------------------------- Order Details ------------------------------------- //
    setOrder: ({ order }, { payload }) => {
      const [actionType, value] = payload; //We pass in [] with [<action we want to do>, <The value we want to send as our payload>]
      let { items } = order;

      switch (actionType) {
        // ---------------- Adding an item to items --------------- //
        case "ADD_ITEM":
          let index = items.findIndex((item) => {
            return item.name === value.name;
          });
          if (index === -1) {
            order.items = [...items, value];
          } else {
            order.items[index].quantity++;
          }
          break;
        // ---------------- Deleting item from items ---------------- //
        case "DELETE_ITEM":
          for (let i = 0; i < items.length; i++) {
            if (items[i].name === value.name) {
              order.items[i].quantity--;
            }
          }
          order.items = order.items.filter((item) => item.quantity !== 0);
          break;
        // ---------------- Clear all items ---------------- //
        case "CLEAR_ITEMS":
          order.items = [];
          break;

        // ---------------- Set Phone Number---------------- //
        case "setPhoneNumber":
          order.phoneNumber = value;
          break;
        // ---------------- Set Order Type---------------- //
        case "setOrderType":
          order.orderType = value;
          break;
        // ---------------- Set isScheduled Order---------------- //
        case "setIsScheduledOrder":
          order.isScheduledOrder = value;
          break;
        // ---------------- Set Wait Time---------------- //
        case "setWaitTime":
          order.waitTime = value;
          console.log(value);
          break;
        // ---------------- Set Finish Time---------------- //
        case "setFinishTime":
          if (order.isScheduledOrder) {
            order.finishTime = value;
          } else {
            //Peform data/time calculations to determine finish time.
          }
          break;
        // ---------------- Set Subtotal ---------------- //
        case "setSubTotal":
          order.subTotal = value;
          break;
        // ---------------- Set Before Tax Discount ---------------- //

        case "setBeforeTaxDiscount":
          order.beforeTaxDiscount = value;
          break;

        // ---------------- Set Tax ---------------- //
        case "setTax":
          order.tax = value;
          break;

        // ---------------- Set After Tax Discount ---------------- //
        case "setAfterTaxDiscount":
          order.afterTaxDiscount = value;
          break;

        // ---------------- Set Grand Total---------------- //
        case "setGrandTotal":
          order.grandTotal = value;
          break;
      }
    },
  },
});

export const { setOrder } = orderInfoSlice.actions;
export default orderInfoSlice.reducer;
