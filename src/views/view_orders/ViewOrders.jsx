import "./viewOrder.css";
import FinancialInfo from "./FinancialInfo";
import ReceiptData from "./ReceiptData";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";

function ViewOrders() {
  const [showReceiptData, setShowReceiptData] = useState(true);

  // For fetching order data
  const [data, setData] = useState();
  const timezone = "America/Toronto";
  const date = new Date().toLocaleString("sv", { timeZone: timezone }).slice(0, 10);

  const onToggle = (tab) => {
    if (tab === "Receipt Data") setShowReceiptData(true);
    else if (tab === "Financial Info") setShowReceiptData(false);
  };
  const { documents, loading } = useCollection("orders", ["date", "==", date]);

  useEffect(() => {
    setData(documents);
  }, [documents]);

  return (
    <div className="view-orders row-c-c">
      <div className="view-order-container col-fs-c">
        {/* ----------------------------- Header Section ----------------------------- */}
        <div className="view-order-header">
          <h1>View Orders</h1>
          <div className="nav-tabs row-fs-c">
            <h4
              className={showReceiptData ? "active-tab" : ""}
              onClick={(e) => {
                onToggle(e.target.innerText);
              }}
            >
              Receipt Data
            </h4>
            <h4
              className={!showReceiptData ? "active-tab" : ""}
              onClick={(e) => {
                onToggle(e.target.innerText);
              }}
            >
              Financial Info
            </h4>
          </div>
        </div>
        {/* ----------------------------- Receipt Section ----------------------------- */}
        {showReceiptData && data && <ReceiptData documents={documents} loading={loading} />}
        {/* ----------------------------- Financial Section ----------------------------- */}
        {!showReceiptData && <FinancialInfo documents={documents} loading={loading} />}
      </div>
    </div>
  );
}

export default ViewOrders;
