const numbersOnly = (charInput) => {
  let validNum = new RegExp(/[0-9\b]/);
  return validNum.test(charInput);
};

const formatPhoneNumber = (input) => {
  let numbersOnlyInput = numbersOnlyPhoneNum(input);

  //Formats the phone number with dashes.
  if (numbersOnlyInput.length >= 7) {
    return `${numbersOnlyInput.slice(0, 3)}-${numbersOnlyInput.slice(3, 6)}-${numbersOnlyInput.slice(6)}`;
  } else if (numbersOnlyInput.length >= 4) {
    return `${numbersOnlyInput.slice(0, 3)}-${numbersOnlyInput.slice(3)}`;
  } else {
    return numbersOnlyInput;
  }
};

const numbersOnlyPhoneNum = (dashedPhoneNum) => {
  return dashedPhoneNum.replace(/-/g, "");
};

const hoursValidation = (hours) => {
  if (hours === "") return true;
  if (!numbersOnly(hours)) return false;
  if (hours.length > 2) return false;
  if (parseFloat(hours) > 12) return false;
  return true;
};
const minutesValidation = (minutes) => {
  if (minutes === "") return true;
  if (minutes.length > 2) return false;
  if (!numbersOnly(minutes)) return false;
  if (parseFloat(minutes) > 60) return false;
  return true;
};

const getSimilarAddresses = (entry, addressList) => {
  const firstChar = new RegExp(/[a-zA-Z]/);
  let filteredAddresses = [];

  if (entry === "") return [];

  //Need to slice out the numbers and only get the name
  for (let j = 0; j < entry.length; j++) {
    if (firstChar.test(entry[j])) {
      entry = entry.slice(j);
      break;
    }
  }

  const commonStreetName = new RegExp(entry, "i"); //Will check if anything is similar to the entry

  //Goes through address list and checks for similar address names.
  for (let i = 0; i < addressList.length; i++) {
    if (commonStreetName.test(addressList[i])) {
      filteredAddresses.push(addressList[i]);
    }
  }

  return filteredAddresses;
};

const formatAddress = (addressEntry, streetName) => {
  const firstChar = new RegExp(/[a-zA-Z]/);
  let streetNum;
  for (let i = 0; i < addressEntry.length; i++) {
    if (firstChar.test(addressEntry[i])) {
      streetNum = addressEntry.slice(0, i);
      break;
    }
  }
  return `${streetNum === undefined ? "" : streetNum}${streetName}`;
};

/**
 * Allkows only number and decimal entries
 * @param {string} priceEntry
 * @returns the string interpretation of the price
 */
const priceInputCheck = (priceEntry) => {
  const validPrice = new RegExp(/\d\.*$/);
  if (validPrice.test(priceEntry)) {
    return priceEntry;
  } else {
    return priceEntry.slice(0, -1);
  }
};

const getSimilarItems = (entry, menuItems) => {
  let filteredItems = [];
  const entrySimilarities = new RegExp(entry, "i"); //Will check if anything is similar to the entry
  if (entry === "") {
    return [];
  }

  //Goes through address list and checks for similar address names.
  for (let i = 0; i < menuItems.length; i++) {
    if (entrySimilarities.test(menuItems[i].name)) {
      filteredItems.push(menuItems[i]);
    }
  }

  return filteredItems;
};

const formatOrder = (
  printerChoice,
  printerOptions,
  order,
  // orderOptions,
  { calculateFinishTime, getDate, getTime, getSeconds }
) => {
  let idFormat = true;
  let isTwelveHour = true;
  let printers = JSON.parse(JSON.stringify(printerOptions));

  let finalizedOrder = JSON.parse(JSON.stringify(order));
  console.log("THIS SHOULD BE A SCHEDULED ORDER", order.isScheduledOrder);
  finalizedOrder.finishTime = order.isScheduledOrder ? "" : calculateFinishTime(order.waitTime.magnitude);
  finalizedOrder.date = getDate();
  finalizedOrder.time = [getTime(!idFormat, isTwelveHour), getTime(!idFormat, !isTwelveHour)];
  finalizedOrder.id = `${getDate(idFormat)}${getTime(idFormat)}${getSeconds(
    order.phoneNumber
  )}${numbersOnlyPhoneNum(order.phoneNumber)}`;

  // Selects which printer to print from
  switch (printerChoice) {
    case "Save Only":
      printers = [];
      break;
    case "Kitchen":
      printers = printerOptions.filter((printer) => printer.name === printerChoice);
      break;
    case "Cashier":
      printers = printerOptions.filter((printer) => printer.name === printerChoice);
      break;
    case "Both":
      //Don't need to do anything since printers already has both printers by default
      break;
    case "Reprint":
      break;
    default:
      console.log("ERROR with print choice. Saved order to cloud as default.");
      printers = [];
      break;
  }

  let printInfo = {
    time: finalizedOrder.time,
    date: finalizedOrder.date,
    printers: printers,
    id: finalizedOrder.id,
  };

  return { finalizedOrder, printInfo };
};

export {
  formatOrder,
  getSimilarItems,
  priceInputCheck,
  formatAddress,
  getSimilarAddresses,
  minutesValidation,
  hoursValidation,
  numbersOnly,
  formatPhoneNumber,
  numbersOnlyPhoneNum,
};
