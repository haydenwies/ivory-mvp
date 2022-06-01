import React, { useEffect } from "react";
import "./receipt.css";
import { NavigationTab, XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setNavOn } from "../../redux/functionality";
import { Totals } from "../../utils/totalCalculations";
import orderInfo, { setOrder } from "../../redux/orderInfo";

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
  const { isDiscountBeforeTax, isDiscountAfterTax, isDeliveryBeforeTax, isDeliveryAfterTax } = useSelector(
    ({ orderInfo }) => orderInfo.orderOptions
  );

  const getTotal = () => {
    new Totals(items, false, false, "after tax", "after tax", 0.1, 6.0, 0.13);
    const { subTotal, tax, total, discount } = Totals.getTotals();
    dispatch(setOrder(["setSubTotal", subTotal]));
    dispatch(setOrder(["setTax", tax]));
    dispatch(setOrder(["setTotal", total]));
  };

  // Moves receipt scroll position to the bottom of the page.
  useEffect(() => {
    let r = document.querySelector(".receipt");
    getTotal();

    r.scrollTop = r.scrollHeight;
  }, [items]);
  return (
    <div className="receipt col-fe-c">
      <div className="receipt-container col-sb-c">
        {/* ----------------------------- Receipt Items ----------------------------- */}
        <div className="receipt-items col-c-c">
          <h3>Name</h3>
          {items.map((item, key) => (
            <div key={key} className="receipt-item row-sb-c" onClick={() => {}}>
              <div className="receipt-item-content row-sb-c">
                <div className="item-name">
                  <h2>
                    <span>{item.quantity > 1 && `${item.quantity} x `} </span>
                    {item.name}
                  </h2>
                </div>

                {/* Delete Icon */}
                <div
                  className="delete-icon row-c-c"
                  onClick={() => {
                    dispatch(setOrder(["DELETE_ITEM", item]));
                  }}
                >
                  <img src={XIcon} alt="Delete Icon" />
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
                <h6 className="price-amount">${beforeTaxDiscount}</h6>
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
            {discounted && isDiscountAfterTax && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Discount:</h6>
                <h6 className="price-amount">${afterTaxDiscount}</h6>
              </div>
            )}
            {orderType === "DELIVERY" && isDeliveryAfterTax && (
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
