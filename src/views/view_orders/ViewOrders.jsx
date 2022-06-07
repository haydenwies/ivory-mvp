import "./viewOrder.css";
import FinancialInfo from "./FinancialInfo";
import ReceiptData from "./ReceiptData";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

function ViewOrders() {
  const [showReceiptData, setShowReceiptData] = useState(true);

  // For fetching order data
  const [data, setData] = useState();
  const timezone = "America/Toronto";
  const date = new Date().toLocaleString('sv', {timeZone: timezone}).slice(0, 10);

  const onToggle = () => {
    setShowReceiptData(!showReceiptData)
  }

  useEffect(() => {
    const getData = async () => {
      // Get documents with correct date
      const q = query(collection(db, "orders"), where("date", "==", date));
      const snapshot = await getDocs(q);
      // Loop through data and add to array
      const docs = []
      snapshot.forEach((doc) => {
        docs.push(doc.data())
      });
      // Set data as array once loop finishes
      setData(docs);
    };

    getData();
  }, [date])

  return (
    <div className="view-orders row-c-c">
      <div className="view-order-container col-fs-c">
        {/* ----------------------------- Header Section ----------------------------- */}
        <div className="view-order-header">
          <h1>View Orders</h1>
          <div className="nav-tabs row-fs-c">
            <h4 
              className={showReceiptData ? "active-tab" : ""} 
              onClick={onToggle}
            >
              Receipt Data
            </h4>
            <h4 
              className={!showReceiptData ? "active-tab" : ""}
              onClick={onToggle}
            >
              Financial Info
            </h4>
          </div>
        </div>
        {/* ----------------------------- Receipt Section ----------------------------- */}
        {showReceiptData && data && <ReceiptData data={data} />}
        {/* ----------------------------- Financial Section ----------------------------- */}
        {!showReceiptData && <FinancialInfo data={data} />}
      </div>
    </div>
  );
}

export default ViewOrders;
