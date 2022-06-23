import { setOrderOptions } from "../redux/orderInfo";
import { setInstances } from "../redux/functionality";
import { calculateFinishTime, getDate, getTime, getSeconds } from "../utils/dateFormat";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { formatOrder, numbersOnlyPhoneNum } from "../utils/customerInfoUtils";
import { setOrderManagement } from "../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";
import { useCheckPrinted } from "../hooks/useCheckPrinted";
import { useFailedPrinting } from "../hooks/useFailedPrinting";

export const usePrintOrder = () => {
  const dispatch = useDispatch();
  const [resolvedPrinting] = useCheckPrinted();
  const [failedPrinting] = useFailedPrinting();
  const { printerOptions } = useSelector(({ orderInfo }) => orderInfo.printers);
  /**
   * Prints the order with the specified information
   * @param {*} printerChoice
   * @param {*} actionType
   * @returns
   */
  const printOrder = async (printerChoice, order, actionType) => {
    //Formatting order
    const { finalizedOrder, printInfo } = formatOrder(printerChoice, printerOptions, order, {
      calculateFinishTime,
      getDate,
      getTime,
      getSeconds,
    });

    dispatch(setInstances(["setPausePrinting", true])); //Disables the print button
    await setDoc(doc(db, "orders", finalizedOrder.id), finalizedOrder); //Save Only in firestore

    // Check if there are any printers we need to print to.
    if (printInfo.printers.length !== 0) {
      console.log("Sent print info");
      //   await setDoc(doc(db, "printQue", finalizedOrder.id), printInfo);

      // Checks if the printer script is the issue
      let timeoutId = setTimeout(() => {
        alert("The central printing computer is down.");
        dispatch(setInstances(["setPausePrinting", false]));
      }, 60000);

      //Checks if the printer has finished printing from the thermal printer
      failedPrinting("errLog", ["id", "==", finalizedOrder.id], timeoutId);
      resolvedPrinting("orders", ["id", "==", finalizedOrder.id], timeoutId);
      return;
    }

    // Checks what to reset after the printing is completed
    switch (actionType) {
      case "ORDER":
        dispatch(setInstances(["RESET_DEFAULT_FUNCTIONALITY"]));
        dispatch(setOrderManagement(["RESET_ORDER"]));
        break;
      case "RECEIPT":
        break;
    }
    //Save Onlys disable the paused printing
    dispatch(setInstances(["setPausePrinting", false]));
  };
  return { printOrder };
};
