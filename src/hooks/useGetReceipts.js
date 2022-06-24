import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setReceipts } from "../redux/receiptInfo";

export const useGetReceipts = () => {
  const [receiptsLoaded, setReceiptsLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setReceiptsLoaded(false);
    const ordersRef = collection(db, "orders");

    // Snapshot listener for getting orders
    const getReceipts = onSnapshot(ordersRef, (snapshot) => {
      //snapshot function is run eachtime the collection is updated
      let receipts = [];
      snapshot.forEach((doc) => {
        //Snapshot is the array of orders in firestore
        receipts.push({ ...doc.data(), id: doc.id }); //Pushing a new firestore document into the array
      });

      dispatch(setReceipts(receipts));
      setReceiptsLoaded(true);
    });

    return () => getReceipts();
    //Clean up function when the component unmounts
  }, []);

  return { receiptsLoaded };
};
