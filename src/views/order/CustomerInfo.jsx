import React, { useRef } from "react";
import "./customerInfo.css";
import { XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";
import { db } from "../../firebase/config";
import { collection, addDoc, collectionGroup } from "firebase/firestore";
import { calculateFinishTime, getDate, getTime, getSeconds } from "../../utils/dateFormat";
// Views or Components
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import WaitTime from "./WaitTime";
import PaymentMethod from "./PaymentMethod";
import PhoneNumber from "./PhoneNumber";
import OrderType from "./OrderType";
import Notes from "./Notes";
import { numbersOnlyPhoneNum } from "../../utils/formValidation";
import { setOrderOptions } from "../../redux/orderInfo";
// import {firestore} from "./firebaseInit";
// import {addDoc, setDoc, doc, collectio} from "firebase/firestore";
function CustomerInfo() {
  const dispatch = useDispatch();
  const { order, orderOptions } = useSelector(({ orderInfo }) => orderInfo);
  const { printers, printerOptions, numOfPrinters } = useSelector(({ orderInfo }) => orderInfo.orderOptions);
  const { phoneNumber } = useSelector(({ orderInfo }) => orderInfo.order);
  /* ----------------------------- Methods ----------------------------- */
  const printOrder = async () => {
    const ordersRef = collection(db, "orders");
    const printQueRef = collection(db, "printQue");
    let idFormat = true;
    let finalizedOrderOptions = Object.assign({}, orderOptions);
    let finalizedOrder = Object.assign({}, order);
    finalizedOrder.waitTime = calculateFinishTime(order.waitTime.magnitude);
    finalizedOrder.date = getDate();
    finalizedOrder.time = getTime();
    finalizedOrder.id = `${getDate(idFormat)}${getTime(idFormat)}${getSeconds(
      order.phoneNumber
    )}${numbersOnlyPhoneNum(phoneNumber)}`;

    let printInfo = {
      time: finalizedOrder.time,
      date: finalizedOrder.date,
      printers: finalizedOrderOptions.printers,
      id: finalizedOrder.id,
    };
    // await addDoc(ordersRef, finalizedOrder);
    // await addDoc(printQueRef, printInfo);
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
        <div className="print-options col-sa-c">
          <div className="printer-option col-c-c">
            <h4>Printer Option</h4>
            <div className="printer col-c-c">
              {Array.from(Array(1)).map((undefined, optionKey) => (
                <label key={optionKey}>
                  <select name="Printer-Options" onChange={() => {}}>
                    {printerOptions.map((printer, key) => (
                      <option
                        key={key}
                        value={printer.ip}
                        selected={printer.name === "Kitchen Printer"}
                        onClick={(e) => {
                          dispatch(
                            setOrderOptions([
                              "setPrinter",
                              { index: optionKey, name: printer.name, ip: printer.ip },
                            ])
                          );
                        }}
                      >
                        {printer.name}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
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
