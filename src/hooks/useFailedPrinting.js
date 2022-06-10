import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { setInstances } from "../redux/functionality";
import { useDispatch, useSelector } from "react-redux";

export const useFailedPrinting = () => {
  const dispatch = useDispatch();
  /**
   *
   * @param {string} c Collection name
   * @param {[query]} q Query
   */
  function failedPrinting(c, q) {
    let ref = collection(db, c); //Gets a reference to a collection based on the param "c"

    //If a query is passed in we get a new ref with the query params else it will just get the entire collection
    if (q) {
      ref = query(ref, where(...q));
    }

    onSnapshot(ref, (snapshot) => {
      //snapshot function is run eachtime the collection is updated
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let failedPrinters = "";
          for (let printer of change.doc.data().failedPrinters) {
            console.log(printer.printerName);
            failedPrinters = failedPrinters.concat("- ",printer.printerName, "\n");
          }
          alert("Printing Failed: \n" + failedPrinters );
          dispatch(setInstances(["setPausePrinting", false]));
          return true;
        }
      });
    });
  }
  return [failedPrinting];
};
