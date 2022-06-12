import { createSlice } from "@reduxjs/toolkit";
import { calculateFinishTime } from "../utils/dateFormat";
import { ADDRESS_LIST } from "../utils/dataUtils";

export const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState: {
    order: {
      id: "", //YYYY-MM-DD-HH-MM-SS-PhoneNumber
      phoneNumber: "",
      time: "",
      date: "", //YYYY-MM-DD
      orderType: "PICKUP",
      deliveryAddress: "",
      deliveryFee: 6.0,
      isScheduledOrder: false,
      scheduledTime: { date: "", time: "", hours: "", minutes: "", meridian: "PM" },
      waitTime: { displayName: "", units: "", magnitude: 0 },
      finishTime: "",
      paid: false,
      note: "",
      items: [], //item->{name(string), price(float), selectionList:{itemLimit:int, items:[arr]},selectionCategory:str, swappable:bool, modifiable(bool), modifiers(string), flatFeeModifier:(int), selectionList:[], quantity(int)}
      subTotal: 0.0,
      discounted: false,
      beforeTaxDiscount: 0.0,
      tax: 0.0,
      afterTaxDiscount: 0.0,
      total: 0.0,
      paymentMethod: "",
      printed: false,
    },
    orderOptions: {
      taxPercent: 0.13,
      discountPercent: 0.1,
      isDiscountBeforeTax: false,
      isDeliveryBeforeTax: true,
      printers: [
        { name: "Kitchen Printer", ip: "192.168.1.108", activated: false, copies: 2 },
        { name: "Cashier Printer", ip: "192.168.0.34", activated: false, copies: 1 },
      ],
      printerChoice: "Both Printers",
      printerOptionsOn: false,
<<<<<<< HEAD
      printerOptions: ["Save Receipt", "Kitchen Printer", "Cashier Printer", "Both Printers"],
=======
      printerOptions: ["Save Order", "Kitchen Printer", "Cashier Printer", "Both Printers"],
>>>>>>> 72396effe3307c02073bb377903335721cb3c239
      customItem: { name: "", price: "" }, //The price will be parsed as a float before being placed as item
      filteredAddresses: [],
      addressList: ADDRESS_LIST,
      filteredItems: [],
      searchedItem: "",
      editingItemIndex: -1,
      editingTab: "Selection List", //Used for editing tabs
      editingCategory: "", //Used for swap items
      editingSelection: [],
      currentSwapItem: { name: "", price: 0.0 },
      desiredSwapItem: { name: "", price: 0.0 },
      swapPrice: "",
      scrollDetect: false,
      outOfTownDeliveryFee: 6.0,
      outOfTownDeliveryOn: false,
      tempFlatFee: "",
    },
    orderManagement: {
      backupOrder: {},
      backupOrderOptions: {},
      defaultOrder: {},
      defaultOrderOptions: {},
    },
  },
  reducers: {
    setOrderOptions: ({ orderOptions, order, orderManagement }, { payload }) => {
      const [actionType, value] = payload;
      let { items } = order;
      let { customItem } = orderOptions;

      switch (actionType) {
        case "setIsDiscountBeforeTax":
          orderOptions.isDiscountBeforeTax = value;
          break;
        case "setIsDeliveryBeforeTax":
          orderOptions.isDeliveryBeforeTax = value;
          break;
        case "setPrinter":
          orderOptions.printers[value.index] = { name: value.name, ip: value.ip };
          break;
        case "setPrinterOptionsOn":
          orderOptions.printerOptionsOn = value;
          break;
        case "setPrinterChoice":
          let kitchenIndex = orderOptions.printers.findIndex((printer) => printer.name === "Kitchen Printer");
          let cashierIndex = orderOptions.printers.findIndex((printer) => printer.name === "Cashier Printer");
          switch (value) {
            case "Save Orders":
              orderOptions.printers[kitchenIndex].activated = false;
              orderOptions.printers[cashierIndex].activated = false;
              break;
            case "Kitchen Printer":
              orderOptions.printers[kitchenIndex].activated = true;
              orderOptions.printers[cashierIndex].activated = false;
              break;
            case "Cashier Printer":
              orderOptions.printers[kitchenIndex].activated = false;
              orderOptions.printers[cashierIndex].activated = true;
              break;
            case "Both Printers":
              orderOptions.printers[kitchenIndex].activated = true;
              orderOptions.printers[cashierIndex].activated = true;
              break;
            default:
              orderOptions.printers[kitchenIndex].activated = false;
              orderOptions.printers[cashierIndex].activated = false;
              break;
          }
          orderOptions.printerChoice = value;
          break;
        case "setFilteredAddresses":
          orderOptions.filteredAddresses = value;
          break;
        case "setCustomItemName":
          orderOptions.customItem.name = value;
          break;
        case "setCustomItemPrice":
          orderOptions.customItem.price = value;
          break;
        case "ADD_CUSTOM_ITEM":
          let index = items.findIndex((item) => {
            return item.name === orderOptions.customItem.name && item.price === orderOptions.customItem.price;
          });
          if (index === -1) {
            order.items = [
              ...items,
              {
                name: orderOptions.customItem.name,
                price: parseFloat(orderOptions.customItem.price),
                category: [],
                modifiable: false,
                selectionList: { itemLimit: 0, items: [] },
                selectionCategory: "",
                swappable: false,
                modifiers: [],
                quantity: 1,
              },
            ];
          } else {
            order.items[index].quantity++;
          }
          break;
        case "setPriceWithNumPad":
          orderOptions.customItem.price = customItem.price + value;
          break;
        case "setDeleteWithNumPad":
          orderOptions.customItem.price = customItem.price.slice(0, -1);
          break;
        case "setClearWithNumPad":
          orderOptions.customItem.price = "";
          break;
        case "setFilteredItems":
          orderOptions.filteredItems = value;
          break;
        case "setSearchedItem":
          orderOptions.searchedItem = value;
          break;
        case "setEditingItemIndex":
          // We find the editing item index by creating a deep copy of each item in receipt and comparing their properties
          orderOptions.editingItemIndex = items.findIndex((receiptItem) => {
            //We have to create a copy of the item with the same quantity to check if the objects are the same.
            let tempItem = JSON.parse(JSON.stringify(receiptItem));
            let tempValue = JSON.parse(JSON.stringify(value));
            tempItem.quantity = 1;
            tempValue.quantity = 1;
            return JSON.stringify(tempItem) === JSON.stringify(tempValue);
          });
          break;
        case "resetEditingItemIndex":
          orderOptions.editingItemIndex = -1;
          break;
        case "setEditingSelectionList":
          orderOptions.editingSelection = value; //Sets the list of items the special order can choose from (aka combos)
          break;
        case "setEditingTab":
          orderOptions.editingTab = value;
          break;
        case "setEditingCategory":
          orderOptions.editingCategory = value;
          break;

        case "setSwapItem":
          if (
            orderOptions.currentSwapItem.name === "" ||
            !orderOptions.currentSwapItem.hasOwnProperty("name")
          ) {
            orderOptions.currentSwapItem = value;
            break;
          } else if (
            orderOptions.desiredSwapItem.name === "" ||
            !orderOptions.desiredSwapItem.hasOwnProperty("name")
          ) {
            orderOptions.desiredSwapItem = value;
            let priceDiff = parseFloat(
              orderOptions.desiredSwapItem.price - orderOptions.currentSwapItem.price
            );
            priceDiff = priceDiff < 0 ? 0 : priceDiff; //Makes sure the price difference is always >= 0
            orderOptions.swapPrice = priceDiff;
          }
          break;
        case "setCurrentSwapItem":
          orderOptions.currentSwapItem = value;
          break;
        case "setDesiredSwapItem":
          orderOptions.desiredSwapItem = value;
          break;
        case "setSwapPrice":
          orderOptions.swapPrice = value;
          break;
        case "setOutOfTownDeliveryOn":
          orderOptions.outOfTownDeliveryOn = value;
          if (orderOptions.outOfTownDeliveryOn) {
            order.deliveryFee += 6.0;
            order.orderType = "DELIVERY";
          } else {
            order.deliveryFee = orderManagement.defaultOrder.deliveryFee;
          }
          break;
        case "setTempFlatFee":
          orderOptions.tempFlatFee = value;
          break;
      }
    },
    setOrderManagement: (state, { payload }) => {
      const { orderManagement, order, orderOptions } = state;
      const [actionType, value] = payload;

      switch (actionType) {
        case "SAVE_DEFAULT_ORDER":
          state.orderManagement.defaultOrder = JSON.parse(JSON.stringify(state.order));
          state.orderManagement.defaultOrderOptions = JSON.parse(JSON.stringify(state.orderOptions));
          break;
        case "RESTORE_BACKUP_ORDER":
          try {
            if (Object.entries(orderManagement.backupOrder).length === 0) {
              alert("No backup order saved.");
              break;
            }
            if (order.items.length > 0) {
              break;
            }
            state.order = JSON.parse(JSON.stringify(state.orderManagement.backupOrder));
            state.orderOptions = JSON.parse(JSON.stringify(state.orderManagement.backupOrderOptions));
          } catch (e) {
            alert("Failed to restore backup order.");
          }
          break;

        case "RESET_ORDER":
          state.orderManagement.backupOrder = JSON.parse(JSON.stringify(state.order));
          state.orderManagement.backupOrderOptions = JSON.parse(JSON.stringify(state.orderOptions));

          state.order = JSON.parse(JSON.stringify(state.orderManagement.defaultOrder));
          state.orderOptions = JSON.parse(JSON.stringify(state.orderManagement.defaultOrderOptions));
          break;
        case "setReprintOrder":
          state.order = JSON.parse(JSON.stringify(value));
          state.orderOptions = JSON.parse(JSON.stringify(state.orderManagement.defaultOrderOptions));
          break;
      }
    },
    // ------------------------------------- Order Details ------------------------------------- //
    setOrder: (state, { payload }) => {
      const { order, orderOptions, orderManagement } = state;
      const [actionType, value] = payload; //We pass in [] with [<action we want to do>, <The value we want to send as our payload>]
      let { items } = order;
      let { editingItemIndex } = orderOptions;
      switch (actionType) {
        // ---------------- Adding an item to items --------------- //
        case "ADD_ITEM":
          let index = items.findIndex((item) => {
            //We have to create a copy of the item with the same quantity to check if the objects are the same.
            let tempItem = JSON.parse(JSON.stringify(item));
            let tempValue = JSON.parse(JSON.stringify(value));
            tempItem.quantity = 1;
            tempValue.quantity = 1;
            return JSON.stringify(tempItem) === JSON.stringify(tempValue);
          });

          //Adds the item to the receipt or increments the quantity of an item if it already exists
          if (index === -1) {
            order.items = [...items, value];
          } else {
            order.items[index].quantity++;
          }

          orderOptions.scrollDetect = !orderOptions.scrollDetect; //Triggers the scroll animation on receipt
          break;
        // ---------------- Setting the selection Items  --------------- //
        case "setSelectionItems":
          items[editingItemIndex].selectionList.items = value;
          break;
        // ---------------- Setting the flat fee modifier  --------------- //
        case "setFlatFeeModifier":
          if (items[editingItemIndex].flatFeeModifierOn) {
            items[editingItemIndex].flatFeeModifier = value;

            let modifyIndex = items[editingItemIndex].modifiers.findIndex(
              () => items[editingItemIndex].modifiers.name !== "Modify Flat Fee"
            );
            items[editingItemIndex].modifiers[modifyIndex].price = value === "" ? 0 : parseFloat(value);
          }
          break;
        // ---------------- Setting the flat fee modifier Checkbox  --------------- //
        case "setFlatFeeModifierOn":
          items[editingItemIndex].flatFeeModifierOn = value;

          if (value) {
            items[editingItemIndex].modifiers = [
              {
                name: "Modify Flat Fee",
                checked: false,
                modifyType: "No Add",
                price:
                  items[editingItemIndex].flatFeeModifier === ""
                    ? 0
                    : parseFloat(items[editingItemIndex].flatFeeModifier),
              },
              ...items[editingItemIndex].modifiers,
            ];
          } else {
            items[editingItemIndex].modifiers = items[editingItemIndex].modifiers.filter((modifier) => {
              return modifier.name !== "Modify Flat Fee";
            });
          }
          break;
        // ---------------- Adding a Selection Item --------------- //
        case "ADD_SELECTION_ITEM":
          let emptySpot = items[editingItemIndex].selectionList.items.indexOf("/");
          if (emptySpot !== -1) {
            items[editingItemIndex].selectionList.items[emptySpot] = value;
          }
          break;
        // ---------------- Deleting an item from selection items --------------- //
        case "DELETE_SELECTION_ITEM":
          if (items[editingItemIndex].selectionList.items[value] !== "/") {
            items[editingItemIndex].selectionList.items[value] = "/";
          }
          break;
        // ---------------- Deleting item from items ---------------- //
        case "DELETE_ITEM":
          for (let i = 0; i < items.length; i++) {
            //Side note we know that stringify will work since the two objects will be identical in properties (as well as in quanity)
            if (JSON.stringify(items[i]) === JSON.stringify(value)) {
              order.items[i].quantity--;
            }
          }
          order.items = order.items.filter((item) => item.quantity !== 0);
          break;
        // ---------------- Reset Order ---------------- //
        case "RESET_ORDER":
          orderManagement.backupOrder = JSON.parse(JSON.stringify(state.order));
          orderManagement.backupOrderOptions = JSON.parse(JSON.stringify(state.orderOptions));
          state.order = JSON.parse(JSON.stringify(orderManagement.defaultOrder));
          state.orderOptions = JSON.parse(JSON.stringify(orderManagement.defaultOrderOptions));
          break;
        // ---------------- Set Item Quantity ---------------- //
        case "setItemQuantity":
          if (value < 1) {
            break;
          }
          order.items[editingItemIndex].quantity = value;
          break;
        // ---------------- Add Swap ---------------- //
        case "ADD_SWAP":
          items[editingItemIndex].modifiers = [...items[editingItemIndex].modifiers, value];
          break;
        // ---------------- Delete Modifier ---------------- //
        case "DELETE_MODIFIER":
          items[editingItemIndex].modifiers = items[editingItemIndex].modifiers.filter(
            (modifier) => JSON.stringify(modifier) !== JSON.stringify(value) //Value is the modifier name
          );

          // Uncheck the no add modified Item
          items[editingItemIndex].modifierList.forEach((modifier, i) => {
            if (modifier.name === value.name) {
              items[editingItemIndex].modifierList[i].checked = false;
            }
          });
          break;
        // ---------------- Toggle Modifier ---------------- //
        case "TOGGLE_MODIFIER":
          //Finds the index of the checked item from the modifier list
          let modifierIndex = items[editingItemIndex].modifierList.findIndex(
            (modifier) => modifier.name === value.name && modifier.checked === value.checked
          );

          //Toggles the checkbox of the modifier item
          items[editingItemIndex].modifierList[modifierIndex].checked = !value.checked;

          if (items[editingItemIndex].modifierList[modifierIndex].checked) {
            //If its checked add it to the modifiers list
            items[editingItemIndex].modifiers = [...items[editingItemIndex].modifiers, value];
          } else {
            //If not checked remove it to the modifiers list
            items[editingItemIndex].modifiers = items[editingItemIndex].modifiers.filter(
              (modifierItem) => modifierItem.name !== value.name
            );
          }
          break;

        // ---------------- Set Phone Number---------------- //
        case "setPhoneNumber":
          order.phoneNumber = value;
          break;
        // ---------------- Set Order Type---------------- //
        case "setOrderType":
          order.orderType = value;
          break;
        // ---------------- Set Delivery Address---------------- //
        case "setDeliveryAddress":
          order.deliveryAddress = value;
          break;
        // ---------------- Set isScheduled Order---------------- //
        case "setIsScheduledOrder":
          order.isScheduledOrder = value;
          break;
        // ---------------- Set Scheduled Date---------------- //
        case "setScheduledDate":
          order.scheduledTime.date = value;
          break;
        // ---------------- Set Scheduled Hours---------------- //
        case "setScheduledHours":
          order.scheduledTime.hours = value;
          break;
        // ---------------- Set Scheduled Minutes---------------- //
        case "setScheduledMinutes":
          order.scheduledTime.minutes = value;
          break;
        // ---------------- Set Scheduled Meridian---------------- //
        case "setScheduledMeridian":
          order.scheduledTime.meridian = value;
          break;
        // ---------------- Set Wait Time---------------- //
        case "setWaitTime":
          order.waitTime = value;
          break;
        // ---------------- Set Finish Time---------------- //
        case "setFinishTime":
          if (order.isScheduledOrder) {
            order.finishTime = order.scheduledTime;
          } else {
            order.finishTime = calculateFinishTime(order.waitTime.magnitude);
          }
          break;
        // ---------------- Set Payment Method---------------- //
        case "setPaymentMethod":
          //Checks if they've unchecked the payment method
          if (order.paymentMethod === value) {
            order.paymentMethod = "";
            order.paid = false;
          }
          //Assigns a payment method and sets paid to true
          else {
            order.paymentMethod = value;
            order.paid = true;
          }
          break;
        // ---------------- Set Notes---------------- //
        case "setNote":
          order.note = value;
          break;
        // ---------------- Set Subtotal ---------------- //
        case "setSubTotal":
          order.subTotal = parseFloat(value);
          break;
        // ---------------- Set Before Tax Discount ---------------- //
        case "setBeforeTaxDiscount":
          order.beforeTaxDiscount = parseFloat(value);
          break;
        // ---------------- Set Tax ---------------- //
        case "setTax":
          order.tax = parseFloat(value);
          break;
        // ---------------- Set After Tax Discount ---------------- //
        case "setAfterTaxDiscount":
          order.afterTaxDiscount = parseFloat(value);
          break;
        // ---------------- Set Total---------------- //
        case "setTotal":
          order.total = parseFloat(value);
          break;
        // ---------------- Set Discounted---------------- //
        case "setDiscounted":
          order.discounted = value;
          break;
      }
    },
  },
});

export const { setOrder, setOrderOptions, setOrderManagement } = orderInfoSlice.actions;
export default orderInfoSlice.reducer;
