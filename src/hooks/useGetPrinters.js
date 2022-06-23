import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setPrinters } from "../redux/orderInfo";
export const useGetPrinters = () => {
  const [printersLoaded, setPrintersLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setPrintersLoaded(true);

    const printInfoRef = doc(db, "general", "printerInfo");

    //Snapshot listener for getting printer info
    const getPrinters = onSnapshot(printInfoRef, (printerDoc) => {
      let printersInfo = [];
      if (printerDoc.exists()) {
        let printerData = printerDoc.data().printers;
        for (let i = 0; i < printerData.length; i++) {
          printersInfo.push(printerData[i]);
        }
      }
      dispatch(setPrinters(["setPrinterOptions", printersInfo]));
      setPrintersLoaded(true);
    });

    return () => getPrinters(); //Clean up function when the component unmounts
  }, []);

  return { printersLoaded };
};
