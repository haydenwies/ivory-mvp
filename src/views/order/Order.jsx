import React from "react";
import Receipt from "../receipt/Receipt";
import Items from "../items/Items";
import CustomerInfo from "./CustomerInfo";
import "./order.css";
import { useSelector } from "react-redux";

function Order() {
  const { customerInfoOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  return (
    <div className="order">
      <div className="receipt-section row-c-c">
        <Receipt />
      </div>
      <div className="items-section row-c-c">{customerInfoOn ? <CustomerInfo /> : <Items />}</div>
    </div>
  );
}

export default Order;

