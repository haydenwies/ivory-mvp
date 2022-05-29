import React from "react";
import "./viewOrder.css";
import FinancialInfo from "./FinancialInfo";
import ReceiptData from "./ReceiptData";
function ViewOrders() {
  return (
    <div className="view-orders row-c-c">
      <div className="view-order-container col-fs-c">
        {/* ----------------------------- Header Section ----------------------------- */}
        <div className="view-order-header">
          <h1>View Orders</h1>
          <div className="nav-tabs row-fs-c">
            <h4 className={false ? "active-tab" : ""}>Receipt Data</h4>{" "}
            <h4 className={true ? "active-tab" : ""}>Financial Info</h4>
          </div>
        </div>
        {/* ----------------------------- Receipt Section ----------------------------- */}
        {true && <ReceiptData />}
        {/* ----------------------------- Financial Section ----------------------------- */}
        {/* {true&& <FinancialInfo />} */}
      </div>
    </div>
  );
}

export default ViewOrders;
