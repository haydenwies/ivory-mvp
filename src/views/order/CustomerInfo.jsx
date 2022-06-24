import React from "react";
import "./customerInfo.css";
import { XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";

// Views or Components
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import WaitTime from "./WaitTime";
import PaymentMethod from "./PaymentMethod";
import PhoneNumber from "./PhoneNumber";
import OrderType from "./OrderType";
import Notes from "./Notes";

import PrinterOptions from "./PrinterOptions";
function CustomerInfo() {
  const dispatch = useDispatch();
  // const {} = useSelector(({ orderInfo }) => orderInfo.order);

  /* ----------------------------- Methods ----------------------------- */

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
          {/* Phone Number */}
          <PhoneNumber />
          {/* Order Type */}
          <OrderType />
          {/* Wait Time*/}
          <WaitTime />
          {/* Payment Method*/}
          <PaymentMethod />
          {/* Notes*/}
          <Notes />
        </div>

        {/* ----------------------------- Print Options ----------------------------- */}
        {/* PRINT RECEIPT*/}
        <PrinterOptions />
      </div>
    </>
  );
}

export default CustomerInfo;
