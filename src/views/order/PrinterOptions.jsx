import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderOptions } from "../../redux/orderInfo";
import { setInstances } from "../../redux/functionality";
import { calculateFinishTime, getDate, getTime, getSeconds } from "../../utils/dateFormat";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { formatOrder, numbersOnlyPhoneNum } from "../../utils/customerInfoUtils";
import { setOrderManagement } from "../../redux/orderInfo";
import { useCheckPrinted } from "../../hooks/useCheckPrinted";
import { useFailedPrinting } from "../../hooks/useFailedPrinting";
import "./printerOptions.css";
function PrinterOptions() {
  const dispatch = useDispatch();
  const { printerOptions } = useSelector(({ orderInfo }) => orderInfo.orderOptions);
  const { order, orderOptions } = useSelector(({ orderInfo }) => orderInfo);

  const [resolvedPrinting] = useCheckPrinted();
  const [failedPrinting] = useFailedPrinting();
  const { pausePrinting } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );

  const printOrder = async (printerChoice) => {
    const { finalizedOrder, printInfo } = formatOrder(printerChoice, printerOptions, order, orderOptions, {
      calculateFinishTime,
      getDate,
      getTime,
      getSeconds,
    });
    console.log(finalizedOrder);

    dispatch(setInstances(["setPausePrinting", true])); //Disables the print button

    await setDoc(doc(db, "orders", finalizedOrder.id), finalizedOrder); //Save Only in firestore

    // Check if there are any printers we need to print to.
    if (printInfo.printers.length !== 0) {
      console.log("Sent print info");
      await setDoc(doc(db, "printQue", finalizedOrder.id), printInfo);

      // Checks if the printer script is the issue
      let timeoutId = setTimeout(() => {
        alert("The central printing computer is down.");
        dispatch(setInstances(["setPausePrinting", false]));
      }, 60000);

      //Checks if the printer has finished printing from the thermal printer
      failedPrinting("errLog", ["id", "==", finalizedOrder.id], timeoutId);
      resolvedPrinting("orders", ["id", "==", finalizedOrder.id], timeoutId);
    } else {
      //Save Onlys disable the paused printing
      dispatch(setInstances(["setPausePrinting", false]));
      dispatch(setInstances(["RESET_DEFAULT_FUNCTIONALITY"]));
      dispatch(setOrderManagement(["RESET_ORDER"]));
    }
  };

  return (
    <>
      <div className="printer-options col-c-c">
        <div className="printer-options-content col-fe-c">
          <h4>Printer Options</h4>
          <div className="printer-option col-c-c">
            <div className="printer-choices">
              {printerOptions.map((printer, key) => (
                <button
                  key={key}
                  className="print"
                  onClick={() => {
                    printOrder(printer.name);
                  }}
                  disabled={pausePrinting}
                  style={{
                    backgroundColor: pausePrinting ? "#1d675083" : "#20b68a",
                    color: pausePrinting ? "darkgrey" : "white",
                  }}
                >
                  {printer.name}
                </button>
              ))}
              <button
                className="print"
                onClick={() => {
                  printOrder("Save Only");
                }}
                disabled={pausePrinting}
                style={{
                  backgroundColor: pausePrinting ? "#1d675083" : "#20b68a",
                  color: pausePrinting ? "darkgrey" : "white",
                }}
              >
                Save Only
              </button>
              <button
                className="print"
                onClick={() => {
                  printOrder("Both");
                }}
                disabled={pausePrinting}
                style={{
                  backgroundColor: pausePrinting ? "#1d675083" : "#20b68a",
                  color: pausePrinting ? "darkgrey" : "white",
                }}
              >
                Both
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrinterOptions;
