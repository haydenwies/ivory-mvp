import React from "react";
import "./printerSetup.css";
import { Trash } from "../../Assets/Images";
import { useEffect, useReducer, useState } from "react";
import { db } from '../../firebase/config'
import { doc, getDoc, setDoc } from "firebase/firestore";

const PRINTER_ACTIONS = {
  SET: 'set',
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete'
}

const reducer = (printers, action) => {
  switch (action.type) {
    case PRINTER_ACTIONS.SET:
      return action.payload
    case PRINTER_ACTIONS.ADD:
      return [action.payload, ...printers]
    case PRINTER_ACTIONS.UPDATE:
      return printers.map(printer => printer.id === action.payload.id ? action.payload : printer)
    case PRINTER_ACTIONS.DELETE: 
      return printers.filter(printer => printer.id !== action.payload.id)
  }
}

function PrinterSetup() {
  // Static constant to hold initial fetched printer data
  const printerData = [];
  // Holds data that can be changed by the user and re-uploaded
  const [printers, dispatchPrinters] = useReducer(reducer, []);
  // For saving changes
  const [changesMade, setChangesMade] = useState(false);

  const saveChanges = async () => {
    await setDoc(doc(db, "general", "printerInfo"), {printers: printers})
  }

  useEffect( () => {
    // Fetch printers
    const fetch = async () => {
      const docRef = doc(db, "general", "printerInfo")
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) { 
        if (docSnapshot.data().printers.length !== 0) {
          for (const printer of docSnapshot.data().printers) {
            printerData.push(printer)
          }
          dispatchPrinters({type: PRINTER_ACTIONS.SET, payload: printerData})
        }
      }
    }
    fetch()

  }, []);

  useEffect(() => {
    console.log(printers);
  }, [printers])

  return (
    <div className="printer-setup col-fs-c">
      <h1>Printer Setup</h1>
      <div className="printer-actions">
        <button 
          className="add" 
          onClick={(e) => {
            e.preventDefault()
            dispatchPrinters({ type: PRINTER_ACTIONS.ADD, payload: {name: "", ip: "", id: Date.now()} })
          }}
        >
          Add printer
        </button>
        <button
          className={changesMade ? "save" : "save disabled"}
          disabled={!changesMade}
          onClick={(e) => {
            e.preventDefault()
            setChangesMade(false)
            saveChanges()
          }}
        >
          Save changes
        </button>
      </div>
      <div className="printer-list">
        {printers.map((printer) => (
          <div className="printer-info col-c-c" key={printer.id} >
            <button 
              
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
            </button>
            <input 
              className="printer-name"
              type="text" 
              placeholder="Printer name"
              spellCheck={false}
              value={printer.name}
              onChange={(e) => {
                if (printer.name !== "" && printer.ip !== "") {
                  setChangesMade(true)
                }
                dispatchPrinters({ 
                  type: PRINTER_ACTIONS.UPDATE, 
                  payload: {name: e.target.value, ip: printer.ip, id: printer.id} 
                })
              }}
            />
            <input 
              className="printer-ip"
              type="text" 
              placeholder="Printer IP address"
              spellCheck={false}
              value={printer.ip}
              onChange={(e) => {
                if (printer.name !== "" && printer.ip !== "") {
                  setChangesMade(true)
                }
                dispatchPrinters({
                  type: PRINTER_ACTIONS.UPDATE,
                  payload: {name: printer.name, ip: e.target.value, id: printer.id}
                })
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrinterSetup;
