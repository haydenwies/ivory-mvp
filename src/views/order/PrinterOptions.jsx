import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderOptions } from "../../redux/orderInfo";
import "./printerOptions.css";
function PrinterOptions() {
  const dispatch = useDispatch();
  const { printerOptions, printerChoice, printerOptionsOn } = useSelector(
    ({ orderInfo }) => orderInfo.orderOptions
  );
  useEffect(() => {
    dispatch(setOrderOptions(["setPrinterChoice", printerChoice]));
  }, []);
  return (
    <>
      <div className="printer-options col-c-c">
        <div className="printer-options-content col-fs-c">
          <h4>Printer Options</h4>
          <div className="printer-option col-c-c">
            {/* ----------------------------- Printer Choice ----------------------------- */}
            <button
              className="printer-choice"
              onClick={() => {
                dispatch(setOrderOptions(["setPrinterOptionsOn", !printerOptionsOn]));
              }}
            >
              {printerChoice}
            </button>
            {/* ----------------------------- Printer Selection ----------------------------- */}
            {printerOptionsOn && (
              <div className="printer-selection col-c-c">
                {printerOptions.map((printerName, key) => (
                  <div
                    key={key}
                    className="printer"
                    onClick={() => {
                      dispatch(setOrderOptions(["setPrinterChoice", printerName]));
                      dispatch(setOrderOptions(["setPrinterOptionsOn", false]));
                    }}
                  >
                    <button className="printer-name">{printerName}</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* <div className="reprint-order">
    <h4>Reprint Order</h4>
    <img src="" alt="" />
    </div>
    <div className="save-order">
    <h4>Save Order</h4>
    <img src="" alt="" />
</div> */}
      </div>
    </>
  );
}

export default PrinterOptions;
