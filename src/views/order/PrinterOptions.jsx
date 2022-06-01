import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderOptions } from "../../redux/orderInfo";
import "./printerOptions.css";
function PrinterOptions() {
  const dispatch = useDispatch();
  const { printers, printerOptions, printerToggles } = useSelector(({ orderInfo }) => orderInfo.orderOptions);

  return (
    <>
      <div className="printer-options col-c-c">
        <div className="printer-options-content col-fs-c">
          <h4>Printer Options</h4>
          {Array.from(Array(printerToggles.length)).map((undefined, optionIndex) => (
            <div className="printer-option col-c-c" key={optionIndex}>
              <h5>Option {optionIndex + 1}</h5>
              {/* ----------------------------- Printer Choice ----------------------------- */}
              <button
                className="printer-choice"
                onClick={() => {
                  dispatch(
                    setOrderOptions([
                      "setPrinterToggles",
                      { index: optionIndex, isOn: !printerToggles[optionIndex] },
                    ])
                  );
                }}
              >
                {printers[optionIndex].name}
              </button>
              {/* ----------------------------- Printer Selection ----------------------------- */}
              {printerToggles[optionIndex] && (
                <div className="printer-selection col-c-c">
                  {printerOptions.map((printer, key) => (
                    <div
                      key={key}
                      className="printer"
                      onClick={() => {
                        dispatch(
                          setOrderOptions([
                            "setPrinter",
                            { index: optionIndex, name: printer.name, ip: printer.ip },
                          ])
                        );
                        dispatch(setOrderOptions(["setPrinterToggles", { index: optionIndex, isOn: false }]));
                      }}
                    >
                      <button className="printer-name">{printer.name}</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
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
