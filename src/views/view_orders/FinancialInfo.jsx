import React from "react";

function FinancialInfo() {
  return (
    <div className="financial-info">
      {/* ----------------------------- Numeric Section ----------------------------- */}
      <div className="numeric-section">
        <div className="revenue data-card col-c-c">
          <h2>{"$2700.00"}</h2>
          <h4>Total Revenue</h4>
        </div>
        <div className="orders-count data-card col-c-c">
          <h2>{"24"}</h2>
          <h4>Order Count</h4>
        </div>
        <div className="taxes data-card col-c-c">
          <h2>{"$351.00"}</h2>
          <h4>Taxes</h4>
        </div>
        <div className="after-taxes data-card col-c-c">
          <h2>{"$2349"}</h2>
          <h4>After Taxes</h4>
        </div>
      </div>
      {/* ----------------------------- Graph Section ----------------------------- */}
      <div className="graph-section">
        <div className="graph-data data-card">Implement Pie Chart Here</div>
      </div>
    </div>
  );
}

export default FinancialInfo;
