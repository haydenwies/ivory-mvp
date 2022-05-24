import React from "react";
import "./receipt.css";
import { NavigationTab, XIcon } from "../../Assets/Images";
function Receipt() {
  return (
    <div className="receipt col-fe-c">
      <div className="receipt-container col-sb-c">
        {/* ----------------------------- Navigation Tab ----------------------------- */}
        <div className="nav-tab">
          <img src={NavigationTab} alt="Navigation Tab" />
        </div>

        {/* ----------------------------- Receipt Items ----------------------------- */}
        <div className="receipt-items col-c-c">
          <h3>Name</h3>
          {[1].map(() => (
            <div className="receipt-item row-sb-c">
              <div className="receipt-item-content row-sb-c">
                <h2>Noodles</h2>
                <img src={XIcon} alt="Delete Icon" />
                {true && (
                  <div className="receipt-item-note">
                    <h6>Note</h6>
                    <ul>
                      {[1, 2, 3, 4].map(() => (
                        <li>Notta</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------------- Totals ----------------------------- */}
        <div className="totals-and-options col-c-c">
          <div className="totals col-fe-c">
            <div className="sub-total row-sb-c total-container">
              <h6 className="price-label">Sub-Total:</h6>
              <h6 className="price-amount">$69.99</h6>
            </div>
            <div className="tax row-sb-c total-container">
              <h6 className="price-label">Tax:</h6>
              <h6 className="price-amount">$69.99</h6>
            </div>
            <div className="grand-total row-sb-c total-container">
              <h6 className="price-label">Grand-Total:</h6>
              <h6 className="price-amount">$69.99</h6>
            </div>
            {false && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Delivery:</h6>
                <h6 className="price-amount">$69.99</h6>
              </div>
            )}
            {false && (
              <div className="new-total row-sb-c total-container">
                <h6 className="price-label">New Total:</h6>
                <h6 className="price-amount">$69.99</h6>
              </div>
            )}
          </div>
          {/* ----------------------------- Options ----------------------------- */}
          <div className="receipt-options row-sa-c">
            <label className="col-c-c">
              <span>Discount</span>
              <input type="checkbox" />
            </label>
            <label className="col-c-c">
              <span>Delivery</span>
              <input type="checkbox" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
