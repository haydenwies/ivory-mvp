import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate, setFilteredReceipts } from "../../redux/receiptInfo";

function FinancialInfo() {
  const TAX = 0.13;
  const { receipts, activeDates, selectedDate, filteredReceipts } = useSelector(
    ({ receiptInfo }) => receiptInfo
  );
  const dispatch = useDispatch();
  const sumData = () => {
    var tempRev = 0.0;
    var tempTaxes = 0.0;
    var tempAfterTaxes = 0.0;
    filteredReceipts.forEach((x) => {
      tempRev += parseFloat(x.subTotal);
    });
    tempTaxes = tempRev * TAX;
    tempAfterTaxes = tempRev - tempTaxes;
    setTotalRev(parseFloat(tempRev));
    setTaxes(parseFloat(tempRev));
    setAfterTaxes(parseFloat(tempRev));
  };
  const [showModal, setShowModal] = useState(false);
  const [totalRev, setTotalRev] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [afterTaxes, setAfterTaxes] = useState(0);
  const onToggleModal = (e) => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    dispatch(setFilteredReceipts(receipts.filter((receipt) => receipt.date === selectedDate)));
  }, [selectedDate, receipts]);
  
  useEffect(() => {
    sumData();
  }, [filteredReceipts]);

  return (
    <div className="financial-info">
      <div className="financial-options">
        <div className="financial-date-option row-fe-c">
          <h5 onClick={onToggleModal}>Dates</h5>
        </div>
        {/* ---------- Options Modal ---------- */}
        {showModal && (
          <div className="financial-date-modal col-c-fs">
            <h2>Date Options</h2>
            {[...activeDates].map((property, key) => (
              <div key={key}>
                <button
                  className="display-option"
                  style={{ color: selectedDate === property ? "#20b98a" : "white" }}
                  onClick={() => {
                    dispatch(setSelectedDate(property));
                  }}
                >
                  {property}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ----------------------------- Numeric Section ----------------------------- */}
      <div className="numeric-section">
        <div className="revenue data-card col-c-c">
          <h2>${totalRev.toFixed(2)}</h2>
          <h4>Total Revenue</h4>
        </div>
        <div className="orders-count data-card col-c-c">
          <h2>{filteredReceipts.length}</h2>
          <h4>Order Count</h4>
        </div>
        <div className="taxes data-card col-c-c">
          <h2>${taxes.toFixed(2)}</h2>
          <h4>Taxes</h4>
        </div>
        <div className="after-taxes data-card col-c-c">
          <h2>${afterTaxes.toFixed(2)}</h2>
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
