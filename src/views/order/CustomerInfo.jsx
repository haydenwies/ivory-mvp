import React from "react";
import "./customerInfo.css";
import { XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import { setOrder } from "../../redux/orderInfo";
import { numbersOnly, formatPhoneNumber } from "../../utils/formValidation";
function CustomerInfo() {
  const dispatch = useDispatch();
  const { phoneNumber } = useSelector(({ orderInfo }) => orderInfo.order);
  /* ----------------------------- Methods ----------------------------- */
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
    <>
      <BackgroundExit exitPage={() => dispatch(setInstances(["setCustomerInfoOn", false]))} />
      <div className="customer-info">
        {/* ----------------------------- Exit Icon ----------------------------- */}
        <button
          className="exit-customer-info row-c-c"
          onClick={() => {
            dispatch(setInstances(["setCustomerInfoOn", false]));
          }}
        >
          <img src={XIcon} alt="exit customer info" />
        </button>

        {/* ----------------------------- Customer Information ----------------------------- */}
        <div className="customer-info-input col-se-c">
          <h1>Customer Information</h1>
          <div className="phone-number input-info row-c-c">
            <input
              type="tel"
              placeholder="Phone Number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={handlePhoneNumber}
              value={phoneNumber}
            />
          </div>
          <div className="order-type row-sb-c">
            <button>Pick-Up</button>
            <button>Delivery</button>
          </div>
          <div className="address input-info row-c-c">
            <input type="text" placeholder="Address" />
          </div>
          <div className="wait-time input-info row-c-c">
            <input type="text" placeholder="Wait Time" />
          </div>
          <div className="notes input-info row-c-c">
            <textarea type="textarea" placeholder="Notes" />
          </div>
          <button className="print">Print Receipt</button>
        </div>

        {/* ----------------------------- Print Options ----------------------------- */}
        <div className="print-options col-sa-c">
          <div className="printer-option">
            <h4>Printer Option</h4>
            <img src="" alt="" />
          </div>
          <div className="reprint-order">
            <h4>Reprint Order</h4>
            <img src="" alt="" />
          </div>
          <div className="save-order">
            <h4>Save Order</h4>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
