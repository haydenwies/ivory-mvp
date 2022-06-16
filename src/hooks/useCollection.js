import { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useCollection = (c, _q) => {
  const [documents, setDocuments] = useState(null);
  const q = useRef(_q).current;

  useEffect(() => {
    let ref = collection(db, c); //Gets a reference to a collection based on the param "c"

    //If a query is passed in we get a new ref with the query params else it will just get the entire collection
    if (q) {
      ref = query(ref, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      //snapshot function is run eachtime the collection is updated
      let results = [];
      snapshot.forEach((doc) => {
        //Snapshot is the array of documents in firestore
        results.push({ ...doc.data(), id: doc.id }); //Pushing a new firestore document into the array
      });

      setDocuments(results);
    });

    return () => unsub(); //Clean up function when the component unmounts
  }, [c]);

  return { documents };
};
