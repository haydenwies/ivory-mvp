import { createSlice } from "@reduxjs/toolkit";
import { calculateFinishTime } from "../utils/dateFormat";
const ADDRESS_LIST = [
  "1st Alley",
  "1st Street",
  "2nd Street",
  "3rd Street",
  "4th Street",
  "5th Street",
  "Adams Avenue",
  "Alba Avenue",
  "Alexander Avenue",
  "Allen Street",
  "Andover Avenue",
  "Angus Street",
  "Ann Street",
  "Arbor Lane",
  "Argyle Street",
  "Armstrong Drive",
  "Balazs Court",
  "Baldwin Street",
  "Ball Alley",
  "Ball Street",
  "Barker Street",
  "Bear Street",
  "Beckett Boulevard",
  "Beech Boulevard",
  "Belfast Circle",
  "Bell Mill Sideroad",
  "Belmont Avenue",
  "Beth Court",
  "Bidwell Street",
  "Birch Drive",
  "Birdyway Drive",
  "Bloomer Street",
  "Bobolink Drive",
  "Bond Street",
  "Borden Crescent",
  "Brad Avenue",
  "Brasher Drive",
  "Bridge Street East",
  "Bridge Street West",
  "Bridle Path",
  "Broadway",
  "Brock Street East",
  "Brock Street West",
  "Brookside Lane",
  "Burdock Court",
  "Camdon Court",
  "Cardinal Court",
  "Carolina Street",
  "Cat Alley",
  "Catalpa Court",
  "Cedar Street",
  "Centennial Avenue",
  "Charles Street",
  "Charlotte Avenue",
  "Christie Street",
  "Christopher Court",
  "Clarence Street",
  "Clarke Street East",
  "Clarke Street West",
  "Clear Valley Drive",
  "Clearview Drive",
  "Colin Avenue",
  "Concession Street East",
  "Concession Street West",
  "Coon Alley",
  "Coreless Lane",
  "Coyle Lane",
  "Craig Street",
  "Cranberry Road",
  "Crocus Drive",
  "Daffodil Drive",
  "Daisy Court",
  "Delevan Crescent",
  "Demeyere Avenue",
  "Denis Court",
  "Denrich Avenue",
  "Denton Avenue",
  "Dereham Drive",
  "Devon Court",
  "Devonshire Avenue",
  "Dogwood Drive",
  "Duncan Street",
  "Durham Street",
  "Earle Street",
  "Ebert Alley",
  "Eden Place",
  "Edgewood Drive",
  "Edward Street",
  "Edwin Crescent",
  "Eleanor Court",
  "Elgin Street",
  "Elm Street",
  "Erie Court",
  "Esseltine Drive",
  "Fairfield Crescent",
  "Fairs Crescent",
  "Fairview Street",
  "Fairway Hills Boulevard",
  "Falcon Road",
  "Fernwood Drive",
  "Forest Glen Court",
  "Fox Alley",
  "Frances Street",
  "Frank Street",
  "George Street",
  "Gibson Drive",
  "Glendale Drive",
  "Glenridge Road",
  "Goldenrod Drive",
  "Goshen Street",
  "Gowrie Street East",
  "Gowrie Street West",
  "Greeneagle Drive",
  "Hale Street",
  "Hampton Court",
  "Hardy Avenue",
  "Harris Street",
  "Harvey Street",
  "Hawkins Crescent",
  "Hawthorne Street",
  "Hemlock Drive",
  "Herford Street",
  "Hickory Lane",
  "Highland Drive",
  "Highway 3",
  "Hilldrop Crescent",
  "Hilliker Alley",
  "Hillside Drive",
  "Hillyndale Road",
  "Hogarth Drive",
  "Holland Gate",
  "Hollier Drive",
  "Howe Avenue",
  "Hunter Crescent",
  "Hurley Avenue",
  "Hyman Street",
  "Jackson Court",
  "James Avenue",
  "Jane Street",
  "Jean Ferrie Court",
  "John Pound Road",
  "John Street",
  "Jones Crescent",
  "Joseph Street",
  "Judy Avenue",
  "Kamps Crescent",
  "Kara Lane",
  "King Street",
  "Lady Avenue",
  "Lamers Court",
  "Langrell Avenue",
  "Library Lane",
  "Lincoln Street",
  "Lindsay Street",
  "Lisgar Avenue",
  "Lisgar Court",
  "London Street East",
  "London Street West",
  "Lorraine Avenue",
  "Lowrie Crescent",
  "Lyndale Road",
  "Magnolia Court",
  "Magnolia Drive",
  "Maple Court",
  "Maple Lane",
  "Maple Villa Court",
  "Mary Street",
  "Mcdonald Court",
  "Mckenzie Street",
  "Miller Alley",
  "Moose Street",
  "Morning Glory Drive",
  "Myrtle Street",
  "Neff Alley",
  "Nelson Street",
  "Newell Road",
  "Niagara Street",
  "None",
  "North Street East",
  "North Street West",
  "Northern Lane",
  "Northview Drive",
  "Oak Street",
  "Old Vienna Road",
  "Ontario Street",
  "Otter Court",
  "Owl Drive",
  "Oxford Street",
  "Park Avenue",
  "Park Drive",
  "Park Place",
  "Parkdale Avenue",
  "Parkside Drive",
  "Parkwood Court",
  "Parkwood Drive",
  "Peach Street",
  "Pearl Street",
  "Pheasant Court",
  "Pine Avenue",
  "Pine Street",
  "Poplar Street",
  "Potters Road",
  "Potters Road North",
  "Primrose Drive",
  "Prospect Street",
  "Puc Alley",
  "Quarter Town Line",
  "Queen Street",
  "Railway Street",
  "Richards Court",
  "Ridge Boulevard",
  "Ridout Street East",
  "Ridout Street West",
  "Robin Road",
  "Rodgers Street",
  "Rokeby Orchard Road",
  "Rolph Street",
  "Rosalynn Circle",
  "Ross Street",
  "Rouse Street",
  "Sanders Crescent",
  "Sanders Street",
  "Sandy Court",
  "Segal Drive",
  "Seres Drive",
  "Simcoe Street",
  "Sinclair Drive",
  "South Ridge Road",
  "Spruce Street",
  "Stoney Court",
  "Stubbs Court",
  "Sycamore Drive",
  "Tanager Drive",
  "Taylor Lane",
  "Thistle Court",
  "Thomas Avenue",
  "Thorncliff Circle",
  "Tillson Avenue",
  "Tillson Street",
  "Town Line Road",
  "Trailview Drive",
  "Trillium Drive",
  "Trottier Drive",
  "Tulip Drive",
  "Valley Road",
  "Valley View Lane",
  "Van Norman Drive",
  "Van Street",
  "Vance Drive",
  "Venison Street East",
  "Venison Street West",
  "Verna Drive",
  "Victoria Street",
  "Victoria Way",
  "Vienna Road",
  "Virginia Street",
  "Wabash Road",
  "Walnut Drive",
  "Washington Grand Avenue",
  "Welding Street",
  "Wellington Street",
  "Weston Drive",
  "Westtown Line",
  "Whispering Pine Lane",
  "Wilkins Crescent",
  "William Street",
  "Wilson Avenue",
  "Windemere Avenue",
  "Winona Drive",
  "Wolf Street",
  "Wood Haven Drive",
  "Woodcock Drive",
  "Woodland Crescent",
  "Woodside Drive",
  "Wren Court",
  "Young Street",
];

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
      deliveryFee: (6.0).toFixed(2),
      orderTime: "",
      isScheduledOrder: false,
      scheduledTime: { date: "", time: "", hours: "", minutes: "", meridian: "PM" },
      waitTime: { displayName: "", units: "", magnitude: 0 },
      finishTime: "",
      paid: false,
      note: "",
      items: [], //item->{name(string), price(float), selectionList:{itemLimit:int, items:[arr]},selectionCategory:str, swappable:bool, modifiable(bool), modifiers(string), selectionList:[], quantity(int)}
      subTotal: (0.0).toFixed(2),
      discounted: false,
      beforeTaxDiscount: (0.0).toFixed(2),
      tax: (0.0).toFixed(2),
      afterTaxDiscount: (0.0).toFixed(2),
      total: (0.0).toFixed(2),
      paymentMethod: "",
      printed: false,
    },
    orderOptions: {
      taxPercent: 0.13,
      discountPercent: 0.1,
      isDiscountBeforeTax: true,
      isDeliveryBeforeTax: true,
      printers: Array(3).fill({ name: "No Printer", ip: "192.168.0.1" }),
      printerToggles: Array(3).fill(false),
      printerOptions: [
        { name: "No Printer", ip: "192.168.0.1" },
        { name: "Kitchen Printer", ip: "192.168.0.14" },
        { name: "Cashier Printer", ip: "192.168.0.45" },
      ],
      customItem: { name: "", price: "" }, //The price will be parsed as a float before being placed as item
      filteredAddresses: [],
      addressList: ADDRESS_LIST,
      filteredItems: [],
      searchedItem: "",
      editingItemIndex: 0,
      editingTab: "Selection List",
      editingCategory: "Selection List",
      editingSelection: [],
      currentSwapItem: { name: "", price: 0.0 },
      desiredSwapItem: { name: "", price: 0.0 },
      swapPrice: "",
    },
    orderManagement: {
      backupOrder: {},
      backupOrderOptions: {},
      defaultOrder: {},
      defaultOrderOptions: {},
    },
  },
  reducers: {
    setOrderOptions: ({ orderOptions, order }, { payload }) => {
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
        case "setPrinterToggles":
          orderOptions.printerToggles = Array(orderOptions.printerToggles.length).fill(false);
          orderOptions.printerToggles[value.index] = value.isOn;
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
          orderOptions.editingItemIndex = items.findIndex((receiptItem) => {
            //We have to create a copy of the item with the same quantity to check if the objects are the same.
            let tempItem = JSON.parse(JSON.stringify(receiptItem));
            let tempValue = JSON.parse(JSON.stringify(value));
            tempItem.quantity = 1;
            tempValue.quantity = 1;
            return JSON.stringify(tempItem) === JSON.stringify(tempValue);
          });
          break;
        case "setEditingSelectionList":
          orderOptions.editingSelection = value; //Sets the list of items the special order can choose from (aka combos)
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
            orderOptions.swapPrice = `${parseFloat(
              orderOptions.desiredSwapItem.price - orderOptions.currentSwapItem.price
            ).toFixed(2)}`;
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
          if (Object.entries(orderManagement.backupOrder) === 0) {
            break;
          }
          if (order.items.length > 0) {
            break;
          }
          state.order = JSON.parse(JSON.stringify(state.orderManagement.backupOrder));
          state.orderOptions = JSON.parse(JSON.stringify(state.orderManagement.backupOrderOptions));
          break;

        case "RESET_ORDER":
          state.orderManagement.backupOrder = JSON.parse(JSON.stringify(state.order));
          state.orderManagement.backupOrderOptions = JSON.parse(JSON.stringify(state.orderOptions));

          state.order = JSON.parse(JSON.stringify(state.orderManagement.defaultOrder));
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
          if (index === -1 || value.modifiable) {
            order.items = [...items, value];
          } else {
            order.items[index].quantity++;
          }
          break;
        // ---------------- Setting the selection Items  --------------- //
        case "setSelectionItems":
          items[editingItemIndex].selectionList.items = value;
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
            console.log(
              items[editingItemIndex].modifiers.filter(
                (modifierItem) => JSON.stringify(modifierItem) !== JSON.stringify(value)
              )[0]
            );
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
        // ---------------- Set Scheduled Time---------------- //
        case "setScheduledTime":
          order.scheduledTime.time = value;
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
          if (order.paymentMethod === value) {
            order.paymentMethod = "";
          } else {
            order.paymentMethod = value;
          }
          break;
        // ---------------- Set Notes---------------- //
        case "setNote":
          order.note = value;
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
        // ---------------- Set Total---------------- //
        case "setTotal":
          order.total = value;
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
