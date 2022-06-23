import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/config";
import { setActiveDates } from "../redux/receiptInfo";

export const useDeleteDocs = () => {
  const receipts = useSelector(({ receiptInfo }) => receiptInfo.receipts);
  const dispatch = useDispatch();
  const activeDates = [];
  const ACTIVE_DAYS = 3;
  const deleteOutDatedReceipts = () => {
    let date = new Date();
    let day = date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;
    let month = date.getMonth() + 1 >= 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();
    let formattedDate = `${year}-${month}-${day}`;

    //Gets the active dates for the receipts to be stored under
    activeDates.push(formattedDate);
    for (let i = 0; i < ACTIVE_DAYS - 1; i++) {
      date.setDate(date.getDate() - 1);
      day = date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;
      month = date.getMonth() + 1 >= 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
      year = date.getFullYear();
      formattedDate = `${year}-${month}-${day}`;
      activeDates.push(formattedDate);
    }

    dispatch(setActiveDates(activeDates));

    let outDatedReceipts = receipts.filter((receipt) => {
      let outdated = true;
      for (let i = 0; i < ACTIVE_DAYS; i++) {
        if (receipt.date === activeDates[i]) {
          outdated = false;
        }
      }
      return outdated;
    });
    console.log("Here are the active dates", activeDates);
    console.log(outDatedReceipts);

    outDatedReceipts.forEach(async (receipt) => {
      let receiptRef = doc(db, "orders", receipt.id);
      // await deleteDoc(receiptRef);
    });
    console.log("Outdated orders deleted");
  };

  return { deleteOutDatedReceipts };
};
