import React from "react";
import "./customerInfo.css";
function CustomerInfo() {
  return (
    <div className="customer-info col-fs-c">
      <h1>Customer Information</h1>
      <div className="customer-info-input col-se-c">
        <div className="phone-number input-info row-c-c">
          <input type="text" placeholder="Phone Number" />
        </div>
        <div className="order-type row-sb-c">
          <button>Pick-Up</button>
          <button>Delivery</button>
        </div>
        <div className="address input-info row-c-c">
          <input type="text" placeholder="Address" />
        </div>
        <div className="wait-time input-info row-c-c">
          <input type="text" placeholder="Wait Time" />
        </div>
        <div className="notes input-info row-c-c">
          <textarea type="textarea" placeholder="Notes" />
        </div>
        <button className="print">Print Receipt</button>
      </div>
    </div>
  );
}

export default CustomerInfo;
