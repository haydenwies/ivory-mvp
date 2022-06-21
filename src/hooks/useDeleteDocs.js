import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, deleteDoc, getDocs, doc } from "firebase/firestore";

export const useDeleteDocs = () => {
  const deleteOutDatedDocs = async (c, q) => {
    let ref = collection(db, c); //Gets a reference to a collection based on the param "c"

    //If a query is passed in we get a new ref with the query params else it will just get the entire collection
    if (q) {
      ref = query(ref, where(...q));
    }
    let tempDocs = [];
    const snapshot = await getDocs(ref);
    snapshot.forEach((order) => {
      tempDocs.push(order);
    });
    for (let order of tempDocs) {
      const docRef = doc(db, "orders", order.id);
      deleteDoc(docRef);
    }
    if (tempDocs.length !== 0) {
      console.log("Outdated docs deleted.");
    } else {
      console.log("No more outdated docs.");
    }
  };

  return { deleteOutDatedDocs };
};
