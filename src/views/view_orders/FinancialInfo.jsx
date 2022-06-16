import { useState } from "react";
import { useEffect } from "react";

function FinancialInfo({ documents }) {
  const sumData = (key) => {
    var total = 0.0;
    documents.forEach((x) => {
      total += parseFloat(x[key]);
    });
    return total;
  };

  const [totalRev, setTotalRev] = useState(sumData("total").toFixed(2));
  const [taxes, setTaxes] = useState(sumData("tax").toFixed(2));
  const [afterTaxes, setAfterTaxes] = useState(sumData("subTotal").toFixed(2));
  useEffect(() => {
    
  },[]);

  return (
    <div className="financial-info">
      {/* ----------------------------- Numeric Section ----------------------------- */}
      <div className="numeric-section">
        <div className="revenue data-card col-c-c">
          <h2>${totalRev}</h2>
          <h4>Total Revenue</h4>
        </div>
        <div className="orders-count data-card col-c-c">
          <h2>{documents.length}</h2>
          <h4>Order Count</h4>
        </div>
        <div className="taxes data-card col-c-c">
          <h2>${taxes}</h2>
          <h4>Taxes</h4>
        </div>
        <div className="after-taxes data-card col-c-c">
          <h2>${afterTaxes}</h2>
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
