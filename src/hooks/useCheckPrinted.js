import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { setInstances } from "../redux/functionality";
import { setOrderManagement } from "../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";

export const useCheckPrinted = () => {
  const dispatch = useDispatch();
  /**
   *
   * @param {string} c Collection name
   * @param {[query]} _q Query
   */
  function resolvedPrinting(c, q) {
    let ref = collection(db, c); //Gets a reference to a collection based on the param "c"

    //If a query is passed in we get a new ref with the query params else it will just get the entire collection
    if (q) {
      ref = query(ref, where(...q));
    }

    onSnapshot(ref, (snapshot) => {
      //snapshot function is run eachtime the collection is updated
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          console.table(change.doc.data());
          if (change.doc.data().printed === true) {
            dispatch(setInstances(["RESET_DEFAULT_FUNCTIONALITY"]));
            dispatch(setOrderManagement(["RESET_ORDER"]));
          }
        }
      });
    });
  }
  return [resolvedPrinting];
};
