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
      items: [], //item->{name(string), price(float), components(string), modifiers(string), quantity(int)}
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
        { name: "Cashier Printer", ip: "192.168.0.28" },
      ],
      customItem: { name: "", price: "" }, //The price will be parsed as a float before being placed as item
      filteredAddresses: [],
      addressList: ADDRESS_LIST,
      filteredItems: [],
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
                quantity: 1,
                modifiers: [],
                components: [],
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
          console.log(orderOptions.filteredItems);
          break;
      }
    },
    setOrderManagement: (state, { payload }) => {
      const { orderManagement, order, orderOptions } = state;
      const [actionType, value] = payload;

      switch (actionType) {
        case "SAVE_DEFAULT_ORDER":
          orderManagement.defaultOrder = Object.assign(order);
          orderManagement.defaultOrderOptions = Object.assign(orderOptions);
          break;
        case "RESTORE_BACKUP_ORDER":
          if (Object.entries(orderManagement.backupOrder) === 0) {
            break;
          }
          if (order.items.length > 0) {
            break;
          }
          state.order = orderManagement.backupOrder;
          state.orderOptions = orderManagement.backupOrderOptions;
          break;
      }
    },
    // ------------------------------------- Order Details ------------------------------------- //
    setOrder: (state, { payload }) => {
      const { order, orderOptions, orderManagement } = state;
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
            if (JSON.stringify(items[i]) === JSON.stringify(value)) {
              order.items[i].quantity--;
            }
          }
          order.items = order.items.filter((item) => item.quantity !== 0);
          break;
        // ---------------- Reset Order ---------------- //
        case "RESET_ORDER":
          orderManagement.backupOrder = Object.assign(state.order);
          orderManagement.backupOrderOptions = Object.assign(state.orderOptions);
          state.order = Object.assign(orderManagement.defaultOrder);
          state.orderOptions = Object.assign(orderManagement.defaultOrderOptions);
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
