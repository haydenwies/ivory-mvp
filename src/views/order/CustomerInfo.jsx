import React, { useEffect, useRef, useState } from "react";
import "./customerInfo.css";
import { XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { calculateFinishTime, getDate, getTime, getSeconds } from "../../utils/dateFormat";
// Views or Components
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import WaitTime from "./WaitTime";
import PaymentMethod from "./PaymentMethod";
import PhoneNumber from "./PhoneNumber";
import OrderType from "./OrderType";
import Notes from "./Notes";
import { formatOrder, numbersOnlyPhoneNum } from "../../utils/customerInfoUtils";
import { setOrderOptions, setOrderManagement } from "../../redux/orderInfo";
import { useCheckPrinted } from "../../hooks/useCheckPrinted";
import { useFailedPrinting } from "../../hooks/useFailedPrinting";
import PrinterOptions from "./PrinterOptions";
function CustomerInfo() {
  const dispatch = useDispatch();
  const { order, orderOptions } = useSelector(({ orderInfo }) => orderInfo);
  const {} = useSelector(({ orderInfo }) => orderInfo.order);
  const { pausePrinting } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const [resolvedPrinting] = useCheckPrinted();
  const [failedPrinting] = useFailedPrinting();
  let localPausedPrint = false;
  /* ----------------------------- Methods ----------------------------- */
  const printOrder = async () => {
    const { finalizedOrder, printInfo } = formatOrder(order, orderOptions, {
      calculateFinishTime,
      getDate,
      getTime,
      getSeconds,
    });

    dispatch(setInstances(["setPausePrinting", true])); //Disables the print button

    await setDoc(doc(db, "orders", finalizedOrder.id), finalizedOrder);

    // Check if there are any printers we need to print to.
    if (printInfo.printers.length !== 0) {
      await setDoc(doc(db, "printQue", finalizedOrder.id), printInfo);
      localPausedPrint = true;
      let timeoutId = setTimeout(() => {
        alert("The central printing computer is down.");
        dispatch(setInstances(["setPausePrinting", false]));
      }, 30000);
      failedPrinting("errLog", ["id", "==", finalizedOrder.id], timeoutId);
      resolvedPrinting("orders", ["id", "==", finalizedOrder.id], timeoutId);
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
          {/* PRINT RECEIPT */}
          <button
            className="print"
            onClick={printOrder}
            disabled={pausePrinting}
            style={{ backgroundColor: pausePrinting ? "#20b68983" : "#20b68a" }}
          >
            Print Receipt
          </button>
        </div>

        {/* ----------------------------- Print Options ----------------------------- */}
        <PrinterOptions />
      </div>
    </>
  );
}

export default CustomerInfo;
