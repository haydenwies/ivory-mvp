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

const formatOrder = (order, orderOptions, { calculateFinishTime, getDate, getTime, getSeconds }) => {
  let idFormat = true;
  let isTwelveHour = true;
  let finalizedOrderOptions = JSON.parse(JSON.stringify(orderOptions));
  let finalizedOrder = JSON.parse(JSON.stringify(order));
  finalizedOrder.finishTime = orderOptions.isScheduledOrder
    ? ""
    : calculateFinishTime(order.waitTime.magnitude);
  finalizedOrder.date = getDate();
  finalizedOrder.time = [getTime(!idFormat, isTwelveHour), getTime(!idFormat, !isTwelveHour)];
  finalizedOrder.id = `${getDate(idFormat)}${getTime(idFormat)}${getSeconds(
    order.phoneNumber
  )}${numbersOnlyPhoneNum(order.phoneNumber)}`;

  // console.table(finalizedOrder.items[0].modifiers)
  const activePrinters = finalizedOrderOptions.printers.filter((printer) => printer.activated);

  let printInfo = {
    time: finalizedOrder.time,
    date: finalizedOrder.date,
    printers: activePrinters,
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
