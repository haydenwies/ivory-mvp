import React from "react";
import { Info, Search } from "../../Assets/Images";
import "./viewOrder.css";
function Receipts() {
  return (
    <div className="receipt-data">
      {/* ----------------------------- Display Receipt Options ----------------------------- */}
      <div className="view-options row-sb-c">
        <div className="search-receipt row-c-c">
          <img src={Search} alt="" /> <input type="text" placeholder="Search" />
        </div>
        <div className="display-options row-fe-c">
          <div className="row-sb-c full-receipt">
            <h5>Full Receipt</h5>
            <button className={true ? "full-receipt-btn full-receipt-on" : "full-receipt-btn"}></button>
          </div>
          <div className="sort">
            <h5>Sort</h5>
          </div>
          <div className="filter">
            <h5>Filter</h5>
          </div>
        </div>
        {/* Options Modal */}
        <div className="display-options-modal col-c-fs">
          <h2>Sort Options</h2>
          {["Time", "Date", "Name"].map((property) => (
            <>
              <button className="display-option">{property}</button>
            </>
          ))}
        </div>
      </div>
      {/* ----------------------------- Receipts ----------------------------- */}
      <div className="receipts">
        <div className="receipts-container">
          {Array(50)
            .fill("HELLO WORLD")
            .map((doc, key) => (
              /* ----------------------------- Receipt Meta Data ----------------------------- */
              <div key={key} className="receipt-card">
                {false && (
                  <div className="receipt-content">
                    <h2>519-281-2313</h2>
                    <h3>Kevin</h3>
                    <h4>Pick Up</h4>
                  </div>
                )}

                {/* ----------------------------- Receipt Full Data ----------------------------- */}
                {true && (
                  <div className="receipt-content receipt-full-content col-c-fs">
                    <div className="receipt-title row-c-c">
                      <h2>519-123-4567</h2>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Paid:</p>
                      <p>
                        <b>Paid</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Name:</p>
                      <p>
                        <b>Kevin</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Pick-Up:</p>
                      <p>
                        <b>Kevin</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Order Time:</p>
                      <p>
                        <b>Kevin</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Wait Time:</p>
                      <p>
                        <b>Kevin</b>
                      </p>
                    </div>
                    <div className="items-property receipt-property col-c-fs">
                      <p>Items:</p>
                      <div className="items-container col-c-fe">
                        {Array(6)
                          .fill("Egg Rolls")
                          .map((item, key) => (
                            <div key={key} className="item-container row-sb-c">
                              <p>
                                <b>{item}</b>
                              </p>
                              <p>
                                <b>${key}.00</b>
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Sub-Total:</p>
                      <p>
                        <b>Kevin</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Taxes:</p>
                      <p>
                        <b>Kevin</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Grand-Total:</p>
                      <p>
                        <b>Kevin</b>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Receipts;
