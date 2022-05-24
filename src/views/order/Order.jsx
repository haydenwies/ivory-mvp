import React from "react";
import Receipt from "../receipt/Receipt";
import Items from "../items/Items";
import CustomerInfo from "./CustomerInfo";
import "./order.css";

function order() {
  return (
    <div className="order">
      <div className="receipt-section row-c-c">
        <Receipt />
      </div>
      <div className="items-section row-c-c">
        {/* <Items /> */}
        <CustomerInfo />
      </div>
    </div>
  );
}

export default order;
