import React from "react";
import "./printerSetup.css";
import { Custom } from "../../Assets/Images";
function PrinterSetup() {
  return (
    <div className="printer-setup col-fs-c">
      <h1>Printer Setup</h1>
      {Array(3)
        .fill("Boop")
        .map(() => (
          <div className="printer-info col-c-c">
            <div className="edit-printer-info">
              <img src={Custom} alt="" />
            </div>
            <h2>{"Cash Register Printer"}</h2>
            <div className="printer-ip row-c-c">{"192.168.0.101"}</div>
          </div>
        ))}
    </div>
  );
}

export default PrinterSetup;
