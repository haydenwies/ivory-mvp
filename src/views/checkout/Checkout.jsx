import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutPhoneEntry, setCheckoutReceipt } from "../../redux/checkout";
import { setFilteredReceipts } from "../../redux/receiptInfo";
import { numbersOnly } from "../../utils/customerInfoUtils";
import { filterPhoneNum } from "../../utils/filterUtils";
import "./checkout.css";
import { usePrintOrder } from "../../hooks/usePrintOrder";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Totals } from "../../utils/totalCalculations";
function Checkout() {
  const dispatch = useDispatch();
  const { receipts, filteredReceipts } = useSelector(({ receiptInfo }) => receiptInfo);
  const { printOrder } = usePrintOrder();
  const { order } = useSelector(({ orderInfo }) => orderInfo);
  const { checkoutReceipt, checkoutPhoneEntry } = useSelector(({ checkout }) => checkout);
  const { pausePrinting } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const { taxPercent, isDiscountBeforeTax, isDeliveryBeforeTax, discountPercent } = useSelector(
    ({ orderInfo }) => orderInfo.orderOptions
  );
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

  const toggleDiscount = async (receiptDoc) => {
    const { id, items, discounted, orderType, deliveryFee } = receiptDoc;
    // Gets the new totals with the opposite discounted option
    new Totals(
      items,
      !discounted,
      orderType === "DELIVERY",
      isDiscountBeforeTax ? "BEFORE_TAX" : "AFTER_TAX",
      isDeliveryBeforeTax ? "BEFORE_TAX" : "AFTER_TAX",
      discountPercent,
      deliveryFee,
      taxPercent
    );
    const { subTotal, tax, total, discount } = Totals.getTotals();

    const receiptRef = doc(db, "orders", id); //Gets reference to current receipt being edited

    if (isDiscountBeforeTax) {
      await updateDoc(receiptRef, {
        discounted: !discounted,
        subTotal: parseFloat(subTotal),
        tax: parseFloat(tax),
        beforeTaxDiscount: parseFloat(discount),
        total: parseFloat(total),
      });
    } else {
      await updateDoc(receiptRef, {
        discounted: !discounted,
        subTotal: parseFloat(subTotal),
        tax: parseFloat(tax),
        afterTaxDiscount: parseFloat(discount),
        total: parseFloat(total),
      });
    }
  };

  useEffect(() => {
    checkoutPhoneRef.current.focus();
  }, []);

  useEffect(() => {
    findByPhone(checkoutPhoneEntry, receipts);

    //We update the checkoutReceipt when the discount is added
    if (checkoutReceipt.id !== undefined) {
      let updatedDoc = receipts.find((item) => item.id === checkoutReceipt.id);
      dispatch(setCheckoutReceipt(updatedDoc));
    }
  }, [receipts]);

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        {checkoutReceipt !== undefined && (
          <div className="checkout-totals-container">
            <div className="checkout-total col-c-c checkout-subtotal">
              <h3>Sub-Total</h3>
              <h3>
                {checkoutReceipt.id !== undefined
                  ? checkoutReceipt.subTotal !== ""
                    ? `$${checkoutReceipt.subTotal}`
                    : "$0.00"
                  : "$0.00"}
              </h3>
            </div>
            <div className="checkout-total col-c-c checkout-tax">
              <h3>Tax</h3>
              <h3>
                {checkoutReceipt.id !== undefined
                  ? checkoutReceipt.tax !== ""
                    ? `$${checkoutReceipt.tax}`
                    : "$0.00"
                  : "$0.00"}
              </h3>
            </div>
            <div className="checkout-total col-c-c checkout-discount">
              <h3>Discount</h3>
              <h3>
                {checkoutReceipt.id !== undefined
                  ? checkoutReceipt.discounted
                    ? `-$${
                        isDiscountBeforeTax
                          ? checkoutReceipt.beforeTaxDiscount.toFixed(2)
                          : checkoutReceipt.afterTaxDiscount.toFixed(2)
                      }`
                    : "$0.00"
                  : "$0.00"}
              </h3>
            </div>
            <div className="checkout-total col-c-c checkout-grandtotal">
              <h3>Total</h3>
              <h3>
                {checkoutReceipt.id !== undefined
                  ? checkoutReceipt.total !== ""
                    ? `$${checkoutReceipt.total}`
                    : "$0.00"
                  : "$0.00"}
              </h3>
            </div>
          </div>
        )}
        <div className="checkout-print-container row-c-c">
          <button
            className="checkout-print"
            disabled={pausePrinting}
            style={{
              backgroundColor: pausePrinting ? "#1d675083" : "rgb(25, 126, 95)",
              color: pausePrinting ? "darkgrey" : "white",
            }}
            onClick={() => {
              printOrder("Cashier", order, "RECEIPT");
            }}
          >
            Print
          </button>
        </div>
      </div>

      {/* ----------------------------- Checkout Receipts Container----------------------------- */}

      <div className="checkout-receipt-content">
        <div className="checkout-receipts-container col-fs-c">
          {[...filteredReceipts].reverse().map((doc, key) => (
            <div
              key={key}
              onClick={() => {
                dispatch(setCheckoutReceipt(doc));
              }}
              style={{
                border:
                  checkoutReceipt !== undefined
                    ? checkoutReceipt.id !== undefined && checkoutReceipt.id === doc.id
                      ? "2px solid rgb(32, 185, 138)"
                      : ""
                    : "",
                cursor: "default",
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
              {doc.discounted && isDiscountBeforeTax && (
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
              {doc.discounted && !isDiscountBeforeTax && (
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
              <div className="discount-button col-c-c">
                <h3>Add Discount</h3>
                <button
                  className={doc.discounted ? "full-receipt-btn full-receipt-on" : "full-receipt-btn"}
                  onClick={() => {
                    toggleDiscount(doc);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ----------------------------- Search Phone Number ----------------------------- */}
        <div className="checkout-search-container row-c-fs">
          <input
            type="text"
            ref={checkoutPhoneRef}
            // value={checkoutPhoneEntry}
            onChange={(e) => {
              findByPhone(e.target.value, receipts);
            }}
            placeholder="Search Phone Number"
            className="checkout-search"
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
