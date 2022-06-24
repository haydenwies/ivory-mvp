import "./viewOrder.css";
import FinancialInfo from "./FinancialInfo";
import ReceiptData from "./ReceiptData";
import { useState } from "react";

function ViewOrders() {
  const [showReceiptData, setShowReceiptData] = useState(true);

  return (
    <div className="view-orders row-c-c">
      <div className="view-order-container col-fs-c">
        {/* ----------------------------- Header Section ----------------------------- */}
        <div className="view-order-header">
          <div className="nav-tabs row-fe-c">
            <h4
              className={showReceiptData ? "active-tab" : ""}
              onClick={() => {
                setShowReceiptData(true);
              }}
            >
              Receipt Data
            </h4>
            <h4
              className={!showReceiptData ? "active-tab" : ""}
              onClick={() => {
                setShowReceiptData(false);
              }}
            >
              Financial Info
            </h4>
          </div>
        </div>
        {/* ----------------------------- Receipt Section ----------------------------- */}
        {showReceiptData && <ReceiptData />}
        {/* ----------------------------- Financial Section ----------------------------- */}
        {!showReceiptData && <FinancialInfo />}
      </div>
    </div>
  );
}

export default ViewOrders;
