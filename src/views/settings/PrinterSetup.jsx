import React from "react";
import "./printerSetup.css";
import { Trash } from "../../Assets/Images";
import { useEffect, useReducer, useState } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
const PRINTER_ACTIONS = {
  SET: "set",
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
};

const reducer = (printers, action) => {
  switch (action.type) {
    case PRINTER_ACTIONS.SET:
      return action.payload;
    case PRINTER_ACTIONS.ADD:
      return [action.payload, ...printers];
    case PRINTER_ACTIONS.UPDATE:
      return printers.map((printer) => (printer.id === action.payload.id ? action.payload : printer));
    case PRINTER_ACTIONS.DELETE:
      return printers.filter((printer) => printer.id !== action.payload.id);
  }
};

function PrinterSetup() {
  const { printerOptions } = useSelector(({ orderInfo }) => orderInfo.orderOptions);
  // Static constant to hold initial fetched printer data
  const printerData = [];
  // Holds data that can be changed by the user and re-uploaded
  const [printers, dispatchPrinters] = useReducer(reducer, []);
  // For saving changes
  // const [changesMade, setChangesMade] = useState(false);

  const saveChanges = async () => {
    let tempPrinters = JSON.parse(JSON.stringify(printers));
    for (let i = 0; i < tempPrinters.length; i++) {
      tempPrinters[i].beeps = parseFloat(tempPrinters[i].beeps);
      tempPrinters[i].copies = parseFloat(tempPrinters[i].copies);
      tempPrinters[i].activated = true;
    }
    await setDoc(doc(db, "general", "printerInfo"), { printers: tempPrinters });
    alert("Printer settings have been saved.");
  };

  useEffect(() => {
    dispatchPrinters({ type: PRINTER_ACTIONS.SET, payload: printerOptions });
  }, [printerOptions]);

  return (
    <div className="printer-setup col-fs-c">
      <h1>Printer Setup</h1>
      <div className="printer-actions row-fs-c">
        {/* <button
          className="add"
          onClick={(e) => {
            e.preventDefault();
            dispatchPrinters({
              type: PRINTER_ACTIONS.ADD,
              payload: { name: "", ip: "", id: Date.now(), copies: 0, beeps: 0 },
            });
          }}
        >
          Add printer
        </button> */}
        {/* Save Changes */}
        <button
          className={"save"}
          // disabled={!changesMade}
          onClick={(e) => {
            e.preventDefault();
            // setChangesMade(false);
            saveChanges();
          }}
        >
          Save changes
        </button>
      </div>
      <div className="printer-list">
        {printers.map((printer) => (
          <div className="printer-info col-c-c" key={printer.id}>
            {/* <button 
              className={changesMade ? "delete-printer" : "delete-printer disabled"}
              onClick={(e) => {
                e.preventDefault();
                if (printer.name !== "" && printer.ip !== "") {
                  setChangesMade(true)
                }
                dispatchPrinters({ type: PRINTER_ACTIONS.DELETE, payload: printer })
              }}
            >
              <img src={Trash} alt="" />
            </button> */}
            {/* Printer Name */}
            <input
              className="printer-name"
              type="text"
              placeholder="Printer name"
              spellCheck={false}
              value={printer.name}
              onChange={(e) => {
                if (printer.name !== "" && printer.ip !== "") {
                  // setChangesMade(true);
                }
                dispatchPrinters({
                  type: PRINTER_ACTIONS.UPDATE,
                  payload: {
                    name: e.target.value,
                    ip: printer.ip,
                    id: printer.id,
                    copies: printer.copies,
                    beeps: printer.beeps,
                  },
                });
              }}
            />

            {/* Printer Ip Address */}
            <input
              className="printer-ip"
              type="text"
              placeholder="Printer IP address"
              spellCheck={false}
              value={printer.ip}
              onChange={(e) => {
                if (printer.name !== "" && printer.ip !== "") {
                  // setChangesMade(true);
                }
                dispatchPrinters({
                  type: PRINTER_ACTIONS.UPDATE,
                  payload: {
                    name: printer.name,
                    ip: e.target.value,
                    id: printer.id,
                    copies: printer.copies,
                    beeps: printer.beeps,
                  },
                });
              }}
            />
            {/* Printer Copies */}
            <input
              className="printer-ip printer-copies"
              type="text"
              placeholder="Copies"
              spellCheck={false}
              value={printer.copies}
              onChange={(e) => {
                if (printer.name !== "" && printer.ip !== "") {
                  // setChangesMade(true);
                }
                dispatchPrinters({
                  type: PRINTER_ACTIONS.UPDATE,
                  payload: {
                    name: printer.name,
                    ip: printer.ip,
                    id: printer.id,
                    copies: e.target.value,
                    beeps: printer.beeps,
                  },
                });
              }}
            />
            {/* Printer Beeps */}
            <input
              className="printer-ip printer-beeps"
              type="text"
              placeholder="Printer Beeps"
              spellCheck={false}
              value={printer.beeps}
              onChange={(e) => {
                if (printer.name !== "" && printer.ip !== "") {
                  // setChangesMade(true);
                }
                dispatchPrinters({
                  type: PRINTER_ACTIONS.UPDATE,
                  payload: {
                    name: printer.name,
                    ip: printer.ip,
                    id: printer.id,
                    copies: printer.copies,
                    beeps: e.target.value,
                  },
                });
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrinterSetup;
