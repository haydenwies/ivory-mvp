const filterPhoneNum = (entry, orders) => {
  const commonPhoneNum = new RegExp(entry, "i"); //Will check if anything is similar to the entry
  
  let filteredList = [];
  for (let i = 0; i < orders.length; i++) { //Loops through all of the orders
    let formattedNum = orders[i].phoneNumber.replace(/-/g, "");
    if (commonPhoneNum.test(formattedNum)) {
      filteredList.push(orders[i]);
    }
  }
  return filteredList
};

export { filterPhoneNum };
