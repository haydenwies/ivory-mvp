import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutPhoneEntry, setCheckoutReceipt } from "../../redux/checkout";
import { setFilteredReceipts } from "../../redux/receiptInfo";
import { formatOrder, numbersOnly } from "../../utils/customerInfoUtils";
import { filterPhoneNum } from "../../utils/filterUtils";
import "./checkout.css";
import { usePrintOrder } from "../../hooks/usePrintOrder";
function Checkout() {
  const dispatch = useDispatch();
  const { receipts, filteredReceipts } = useSelector(({ receiptInfo }) => receiptInfo);
  const { checkoutReceipt, checkoutPhoneEntry } = useSelector(({ checkout }) => checkout);
  const { printerOptions } = useSelector(({ orderInfo }) => orderInfo.printers);

  const checkoutPhoneRef = useRef();
  const findByPhone = (entry, data) => {
    if (entry === "") dispatch(setFilteredReceipts(data));

    if (numbersOnly(entry)) {
      dispatch(setFilteredReceipts(filterPhoneNum(entry, data)));
      console.log(filterPhoneNum(entry, data));
      dispatch(setCheckoutPhoneEntry(entry));
    } else {
      dispatch(setCheckoutPhoneEntry(entry.slice(0, -1)));
    }
  };

  useEffect(() => {
    console.log(checkoutReceipt.id !== undefined && checkoutReceipt.id === filteredReceipts.id);
    checkoutPhoneRef.current.focus();
  }, []);
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-totals-container">
          <div className="checkout-total col-c-c checkout-subtotal">
            <h3>Sub-Total</h3>
            <h3>{checkoutReceipt.subTotal !== undefined ? `$${checkoutReceipt.subTotal}` : "$0.00"}</h3>
          </div>
          <div className="checkout-total col-c-c checkout-tax">
            <h3>Tax</h3>
            <h3>{checkoutReceipt.tax !== undefined ? `$${checkoutReceipt.tax}` : "$0.00"}</h3>
          </div>
          <div className="checkout-total col-c-c checkout-discount">
            <h3>Discount</h3>
            <h3>{checkoutReceipt.discount !== undefined ? `-$${checkoutReceipt.discount}` : "$0.00"}</h3>
          </div>
          <div className="checkout-total col-c-c checkout-grandtotal">
            <h3>Total</h3>
            <h3>{checkoutReceipt.total !== undefined ? `$${checkoutReceipt.total}` : "$0.00"}</h3>
          </div>
        </div>
        <div className="checkout-print-container row-c-c">
          <button className="checkout-print">Print</button>
        </div>
      </div>

      {/* ----------------------------- Checkout Receipts Container----------------------------- */}

      <div className="checkout-receipt-content">
        <div className="checkout-search-container row-c-fs">
          <input
            type="text"
            ref={checkoutPhoneRef}
            value={checkoutPhoneEntry}
            onChange={(e) => {
              findByPhone(e.target.value, receipts);
            }}
            placeholder="Search Phone Number"
            className="checkout-search"
          />
        </div>
        <div className="checkout-receipts-container col-fs-c">
          {[...filteredReceipts].reverse().map((doc, key) => (
            <div
              key={key}
              onClick={() => {
                dispatch(setCheckoutReceipt(doc));
              }}
              style={{
                border:
                  checkoutReceipt.id !== undefined && checkoutReceipt.id === doc.id
                    ? "2px solid rgb(32, 185, 138)"
                    : "",
              }}
              className="checkout-receipt-main-content col-c-c"
            >
              <div className="receipt-title row-c-c">
                <h2>{doc.phoneNumber === "" ? "No Number" : doc.phoneNumber}</h2>
              </div>
              <div className="receipt-property row-sb-c">
                <p>Paid:</p>
                <p>{doc.paid ? <b>YES</b> : <b>NO</b>}</p>
              </div>
              <div className="receipt-property row-sb-c">
                <p>Order Type:</p>
                <p>{doc.orderType}</p>
              </div>
              <div className="receipt-property row-sb-c">
                <p>Order Time:</p>
                <p>{doc.time[0]}</p>
              </div>
              <div className="receipt-property row-sb-c">
                <p>Wait Time:</p>
                <p>{doc.waitTime.displayName}</p>
              </div>
              <div className="receipt-property row-sb-c">
                <p>Finish Time:</p>
                <p>{doc.finishTime}</p>
              </div>
              <div className="receipt-property row-sb-c">
                <p>Date:</p>
                <p>{doc.date}</p>
              </div>
              {doc.orderType === "DELIVERY" && (
                <div className="receipt-property row-sb-c">
                  <p>Delivery:</p>
                  <p>{doc.address}</p>
                </div>
              )}
              <div className="receipt-property row-sb-c">
                <p>Note:</p>
                <p>{doc.note}</p>
              </div>

              {/* Full Receipt + Items */}
              <div className="items-property receipt-property col-c-fs">
                <p>Items:</p>
                <div className="items-container col-c-fe">
                  {doc.items.map((item, j) => (
                    <div key={j} className="item-container row-sb-c">
                      <p>
                        <b>{item.name}</b>
                      </p>
                      <p>
                        <b>${item.price.toFixed(2)}</b>
                      </p>
                      {/* Selection Choices */}
                      {item.selectionList.itemLimit !== 0 && (
                        <div className="selection-list-container row-fs-c">
                          {item.selectionList.items.map((selectionItem, key3) => (
                            <p key={key3} className="selection-list">
                              {selectionItem}
                            </p>
                          ))}
                        </div>
                      )}
                      {/* Modifiers */}
                      {item.modifiers.length !== 0 && (
                        <div className="modifier-list-container col-c-fs">
                          {item.modifiers.map((modifierItem, key4) => (
                            <div key={key4} className="modifier-item-container row-sb-c">
                              <p className="modifier-list">
                                {"|-->"}
                                {modifierItem.name}
                              </p>
                              $
                              {item.flatFeeModifierOn &&
                              (modifierItem.type === "No Add" || modifierItem.type === "Add")
                                ? "0.00"
                                : `${modifierItem.price.toFixed(2)}`}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="receipt-property sub-total row-sb-c">
                <p>Sub-Total:</p>
                <p>
                  <b>${doc.subTotal.toFixed(2)}</b>
                </p>
              </div>
              {doc.discounted && doc.beforeTaxDiscount !== 0 && (
                <div className="receipt-property row-sb-c">
                  <p>Discount:</p>
                  <p>
                    <b>-${doc.beforeTaxDiscount.toFixed(2)}</b>
                  </p>
                </div>
              )}
              <div className="receipt-property row-sb-c">
                <p>Taxes:</p>
                <p>
                  <b>${doc.tax.toFixed(2)}</b>
                </p>
              </div>
              {doc.discounted && doc.afterTaxDiscount !== 0 && (
                <div className="receipt-property row-sb-c">
                  <p>Discount:</p>
                  <p>
                    <b>-${doc.afterTaxDiscount.toFixed(2)}</b>
                  </p>
                </div>
              )}
              {doc.orderType === "DELIVERY" && (
                <div className="receipt-property row-sb-c">
                  <p>Delivery Fee</p>
                  <p>
                    <b>-${doc.deliveryFee.toFixed(2)}</b>
                  </p>
                </div>
              )}
              <div className="receipt-property row-sb-c">
                <p>Total:</p>
                <p>
                  <b>${doc.total.toFixed(2)}</b>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
