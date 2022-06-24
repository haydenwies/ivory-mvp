import React from "react";
import { useSelector } from "react-redux";

import { usePrintOrder } from "../../hooks/usePrintOrder";
import "./printerOptions.css";
function PrinterOptions() {
  // const dispatch = useDispatch();
  const { order } = useSelector(({ orderInfo }) => orderInfo);
  const { printerOptions } = useSelector(({ orderInfo }) => orderInfo.printers);
  const { pausePrinting } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const { printOrder } = usePrintOrder();

  return (
    <>
      <div className="printer-options col-c-c">
        <div className="printer-options-content col-fe-c">
          <h4>Printer Options</h4>
          <div className="printer-option col-c-c">
            <div className="printer-choices">
              {[...printerOptions].reverse().map((printer, key) => (
                <button
                  key={key}
                  className={`print ${printer.name}-print`}
                  onClick={() => {
                    printOrder(printer.name, order, "ORDER");
                  }}
                  disabled={pausePrinting}
                  style={{
                    backgroundColor: pausePrinting ? "#1d675083" : "rgb(25, 126, 95)",
                    color: pausePrinting ? "darkgrey" : "white",
                  }}
                >
                  {printer.name}
                </button>
              ))}
              <button
                className="print save-only-print"
                onClick={() => {
                  printOrder("Save Only", order, "ORDER");
                }}
                disabled={pausePrinting}
                style={{
                  backgroundColor: pausePrinting ? "#1d675083" : "rgb(25, 126, 95)",
                  color: pausePrinting ? "darkgrey" : "white",
                }}
              >
                Save Only
              </button>
              <button
                className="print both-print"
                onClick={() => {
                  printOrder("Both", order, "ORDER");
                }}
                disabled={pausePrinting}
                style={{
                  backgroundColor: pausePrinting ? "#1d675083" : "rgb(25, 126, 95)",
                  color: pausePrinting ? "darkgrey" : "white",
                }}
              >
                Both
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrinterOptions;
