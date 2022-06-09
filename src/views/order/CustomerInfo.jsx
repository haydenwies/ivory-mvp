import React, { useRef } from "react";
import "./customerInfo.css";
import { XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setInstances, setInstancesDefaultSettings } from "../../redux/functionality";
import { db } from "../../firebase/config";
import { doc, setDoc, collectionGroup } from "firebase/firestore";
import { calculateFinishTime, getDate, getTime, getSeconds } from "../../utils/dateFormat";
// Views or Components
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import WaitTime from "./WaitTime";
import PaymentMethod from "./PaymentMethod";
import PhoneNumber from "./PhoneNumber";
import OrderType from "./OrderType";
import Notes from "./Notes";
import { numbersOnlyPhoneNum } from "../../utils/customerInfoUtils";
import { setOrderOptions, setOrderManagement } from "../../redux/orderInfo";
import PrinterOptions from "./PrinterOptions";
// import {firestore} from "./firebaseInit";
// import {addDoc, setDoc, doc, collectio} from "firebase/firestore";
function CustomerInfo() {
  const dispatch = useDispatch();
  const { order, orderOptions } = useSelector(({ orderInfo }) => orderInfo);
  const { phoneNumber, isScheduledOrder } = useSelector(({ orderInfo }) => orderInfo.order);
  /* ----------------------------- Methods ----------------------------- */
  const printOrder = async () => {
    let idFormat = true;
    let isTwelveHour = true;
    let finalizedOrderOptions = JSON.parse(JSON.stringify(orderOptions));
    let finalizedOrder = JSON.parse(JSON.stringify(order));
    console.table(finalizedOrder);
    finalizedOrder.finishTime = isScheduledOrder ? "" : calculateFinishTime(order.waitTime.magnitude);
    finalizedOrder.date = getDate();
    finalizedOrder.time = [getTime(!idFormat, isTwelveHour), getTime(!idFormat, !isTwelveHour)];
    finalizedOrder.id = `${getDate(idFormat)}${getTime(idFormat)}${getSeconds(
      order.phoneNumber
    )}${numbersOnlyPhoneNum(phoneNumber)}`;

    let printInfo = {
      time: finalizedOrder.time,
      date: finalizedOrder.date,
      printers: finalizedOrderOptions.printers.filter((printer) => printer.name !== "No Printer"),
      id: finalizedOrder.id,
    };

    await setDoc(doc(db, "orders", finalizedOrder.id), finalizedOrder);
    if (printInfo.printers.length !== 0) {
      await setDoc(doc(db, "printQue", finalizedOrder.id), printInfo);
    }

    dispatch(setInstances(["RESET_DEFAULT_FUNCTIONALITY"]));
    dispatch(setOrderManagement(["RESET_ORDER"]));
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
          <button className="print" onClick={printOrder}>
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
