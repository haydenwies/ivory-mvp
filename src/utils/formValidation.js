const numbersOnly = (charInput) => {
  let validNum = new RegExp(/[0-9\b]/);

  return validNum.test(charInput);
};

const formatPhoneNumber = (input) => {
  let numbersOnlyInput = input.replace(/-/g, "");

  //Formats the phone number with dashes.
  if (numbersOnlyInput.length >= 7) {
    return `${numbersOnlyInput.slice(0, 3)}-${numbersOnlyInput.slice(3, 6)}-${numbersOnlyInput.slice(6)}`;
  } else if (numbersOnlyInput.length >= 4) {
    return `${numbersOnlyInput.slice(0, 3)}-${numbersOnlyInput.slice(3)}`;
  } else {
    return numbersOnlyInput;
  }
};

export { numbersOnly, formatPhoneNumber };
