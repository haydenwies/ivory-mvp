import React, { useEffect } from "react";
import "./receipt.css";
import { NavigationTab, XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setNavOn } from "../../redux/functionality";
import { Totals } from "../../utils/totalCalculations";
import { setOrder, setOrderOptions } from "../../redux/orderInfo";
import { setInstances } from "../../redux/functionality";

function Receipt() {
  const dispatch = useDispatch();
  const {
    items,
    discounted,
    subTotal,
    tax,
    beforeTaxDiscount,
    afterTaxDiscount,
    total,
    paymentMethod,
    orderType,
    deliveryFee,
  } = useSelector(({ orderInfo }) => orderInfo.order);
  const { order } = useSelector(({ orderInfo }) => orderInfo);
  const { isDiscountBeforeTax, isDeliveryBeforeTax, discountPercent, taxPercent } = useSelector(
    ({ orderInfo }) => orderInfo.orderOptions
  );

  const getTotal = () => {
    new Totals(
      items,
      discounted,
      orderType === "DELIVERY",
      isDiscountBeforeTax ? "BEFORE_TAX" : "AFTER_TAX",
      isDeliveryBeforeTax ? "BEFORE_TAX" : "AFTER_TAX",
      discountPercent,
      deliveryFee,
      taxPercent
    );
    const { subTotal, tax, total, discount } = Totals.getTotals();
    dispatch(setOrder(["setSubTotal", subTotal]));
    dispatch(setOrder(["setTax", tax]));
    dispatch(setOrder(["setTotal", total]));
    dispatch(setOrder([isDiscountBeforeTax ? "setBeforeTaxDiscount" : "setAfterTaxDiscount", discount]));
  };

  const handleEditingItem = (item) => {
    dispatch(setOrderOptions(["setEditingItemIndex", item]));
    dispatch(setInstances(["setEditItemOn", true]));
  };
  // Moves receipt scroll position to the bottom of the page.
  useEffect(() => {
    let r = document.querySelector(".receipt");
    getTotal();

    r.scrollTop = r.scrollHeight;
  }, [items, discounted]);
  useEffect(() => {
    console.log("ITEMS CHANGED IN RECEIPT");
  }, [order]);
  return (
    <div className="receipt col-fe-c">
      <div className="receipt-container col-sb-c">
        {/* ----------------------------- Receipt Items ----------------------------- */}
        <div className="receipt-items col-c-c">
          <h3>Name</h3>
          {items.map((item, key) => (
            <div
              key={key}
              className="receipt-item row-sb-c"
              onClick={() => {
                handleEditingItem(item);
              }}
            >
              <div className="receipt-item-content row-sb-c">
                <div className="item-name">
                  <h2>
                    <span>{item.quantity > 1 && `${item.quantity} x `} </span>
                    <span>{item.name}</span>
                  </h2>
                </div>

                <div className="right-item-section row-c-c">
                  {/* Item Price */}
                  <div className="item-price">${parseFloat(item.price * item.quantity).toFixed(2)}</div>
                  {/* Delete Icon */}
                  <div
                    className="delete-icon row-c-c"
                    onClick={() => {
                      dispatch(setOrder(["DELETE_ITEM", item]));
                    }}
                  >
                    <img src={XIcon} alt="Delete Icon" />
                  </div>
                </div>

                {/* Components */}
                {item.components ? (
                  item.components.length > 0 && (
                    <div className="receipt-components">
                      <ul>
                        {item.components.map((subItem, key) => (
                          <li key={key}>{subItem}</li>
                        ))}
                      </ul>
                    </div>
                  )
                ) : (
                  <></>
                )}

                {/* Modifiers */}
                {item.modifiers ? (
                  item.modifiers.length > 0 && (
                    <div className="receipt-modifiers">
                      <h6>{item.note} Note</h6>
                      <ul>
                        {item.modifiers && item.modifiers.map((subItem, key) => <li key={key}>{subItem}</li>)}
                      </ul>
                    </div>
                  )
                ) : (
                  <></>
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
              <h6 className="price-amount">${subTotal}</h6>
            </div>
            {discounted && isDiscountBeforeTax && (
              <div className="discount row-sb-c total-container">
                <h6 className="price-label">Discount:</h6>
                <h6 className="price-amount">-${beforeTaxDiscount}</h6>
              </div>
            )}
            {orderType === "DELIVERY" && isDeliveryBeforeTax && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Delivery:</h6>
                <h6 className="price-amount">${deliveryFee}</h6>
              </div>
            )}
            <div className="tax row-sb-c total-container">
              <h6 className="price-label">Tax:</h6>
              <h6 className="price-amount">${tax}</h6>
            </div>
            {discounted && !isDiscountBeforeTax && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Discount:</h6>
                <h6 className="price-amount">-${afterTaxDiscount}</h6>
              </div>
            )}
            {orderType === "DELIVERY" && !isDeliveryBeforeTax && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Delivery:</h6>
                <h6 className="price-amount">${deliveryFee}</h6>
              </div>
            )}
            <div className="grand-total row-sb-c total-container">
              <h6 className="price-label">Grand-Total:</h6>
              <h6 className="price-amount">${total}</h6>
            </div>
          </div>
          {/* ----------------------------- Options ----------------------------- */}
          <div className="receipt-options row-sa-c">
            <label
              className="col-c-c"
              onClick={() => {
                dispatch(setOrder(["setDiscounted", !discounted]));
              }}
            >
              <span>Discount</span>
              <input type="checkbox" checked={discounted} onChange={() => {}} />
            </label>
            {/* <label className="col-c-c">
              <span>Delivery</span>
              <input type="checkbox" />
            </label> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
