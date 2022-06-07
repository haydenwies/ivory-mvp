import React from "react";
import { setOrder } from "../../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";
import { numbersOnly, formatPhoneNumber } from "../../utils/customerInfoUtils";
import "./phoneNumber.css";
function PhoneNumber() {
  const { phoneNumber } = useSelector(({ orderInfo }) => orderInfo.order);
  const dispatch = useDispatch();
  const handlePhoneNumber = (e) => {
    let word = e.target.value;
    let charInput = e.nativeEvent.data;
    let deleteKeys = e.nativeEvent.inputType;
    let deleteDash = word.slice(word.length - 1);
    //Removes the dash when deleting the phone number
    if (deleteDash === "-" && deleteKeys === "deleteContent") {
      dispatch(setOrder(["setPhoneNumber", word.slice(0, word.length - 2)]));
      return;
    }

    //Checks if the input is numbers only
    if (word.length > 12) {
      return;
    }
    if (
      numbersOnly(charInput) ||
      deleteKeys === "deleteContentBackward" ||
      deleteKeys === "deleteContentForward"
    ) {
      dispatch(setOrder(["setPhoneNumber", formatPhoneNumber(word)]));
    }
  };
  return (
    <div className="phone-number input-info row-c-c">
      <input
        type="tel"
        placeholder="Phone Number"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        onChange={handlePhoneNumber}
        value={phoneNumber}
      />
    </div>
  );
}

export default PhoneNumber;
