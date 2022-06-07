function FinancialInfo({ data }) {

  const sumData = (key) => {
    var total = 0.0
    data.forEach((x) => {
      total += parseFloat(x[key])
    })
    return total
  }

  const totalRev = sumData("total").toFixed(2)
  const taxes = sumData("tax").toFixed(2)
  const afterTaxes = sumData("subTotal").toFixed(2)

  return (
    <div className="financial-info">
      {/* ----------------------------- Numeric Section ----------------------------- */}
      <div className="numeric-section">
        <div className="revenue data-card col-c-c">
          {/* <h2>{"$2700.00"}</h2> */}
          <h2>${totalRev}</h2>
          <h4>Total Revenue</h4>
        </div>
        <div className="orders-count data-card col-c-c">
          <h2>{data.length}</h2>
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
        <div className="graph-data data-card">
          Implement Pie Chart Here
        </div>
      </div>
    </div>
  );
}

export default FinancialInfo;
