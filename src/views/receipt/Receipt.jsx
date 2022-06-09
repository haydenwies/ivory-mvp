import React, { useEffect, useState } from "react";
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
  const {
    scrollDetect,
    isDiscountBeforeTax,
    isDeliveryBeforeTax,
    discountPercent,
    taxPercent,
    editingItemIndex,
  } = useSelector(({ orderInfo }) => orderInfo.orderOptions);
  const { editItemOn, categoryType } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const { choiceList } = useSelector((state) => state.menuData);

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

    // Stores the receipt totals in redux state
    dispatch(setOrder(["setSubTotal", subTotal]));
    dispatch(setOrder(["setTax", tax]));
    dispatch(setOrder(["setTotal", total]));
    dispatch(setOrder([isDiscountBeforeTax ? "setBeforeTaxDiscount" : "setAfterTaxDiscount", discount]));
  };

  const handleEditingItem = (item) => {
    if (item.modifiable) {
      //Finds the index of the selection items object from the choice list array
      let selectionIndex = choiceList.findIndex((selection) => {
        //Item Selection category represents the category name from the choiceList array
        return selection.category === item.selectionCategory;
      });

      //Opens the editing modal and sets the item that we will be editing
      dispatch(setOrderOptions(["setEditingItemIndex", item]));
      dispatch(setInstances(["setEditItemOn", true]));

      // Checks if there is a selection item list for that particular item
      if (selectionIndex !== -1) {
        let itemChoices = choiceList[selectionIndex].list; //Gets the list of selection items for the corresponding item
        dispatch(setOrderOptions(["setEditingSelectionList", itemChoices]));

        //Initializes the selection options to be empty slashes if there wasn't anything previously stored in state.
        if (item.selectionList.items.length === 0) {
          dispatch(setOrder(["setSelectionItems", Array(item.selectionList.itemLimit).fill("/")]));
        }
      }
    }
  };
  // Moves receipt scroll position to the bottom of the page.
  useEffect(() => {
    getTotal();
  }, [items, discounted]);

  //Triggers the scroll animation when item is added to receipt
  useEffect(() => {
    let r = document.querySelector(".receipt");
    r.scrollTo({ top: r.scrollHeight, behavior: "smooth" });
  }, [scrollDetect]);
  return (
    <div className="receipt col-fe-c">
      <div className="receipt-container col-sb-c">
        {/* ----------------------------- Receipt Items ----------------------------- */}
        <div className="receipt-items col-c-c">
          <h3>Name</h3>
          {items &&
            items.map((item, itemKey) => (
              <div key={itemKey} className="receipt-item row-sb-c" style={{border: editingItemIndex === itemKey? "#20b98a solid 2px": ""}}>
                <div className="receipt-item-content ">
                  {/* Item Name */}
                  <div
                    className="item-name"
                    onClick={() => {
                      handleEditingItem(item);
                    }}
                  >
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

                  {/* SelectionList */}
                  {item.selectionList ? (
                    item.selectionList.items.length > 0 && (
                      <div className="receipt-selection-list">
                        {item.category === "Special Combo" ? (
                          <div className="special-combo row-fs-c">
                            {item.selectionList.items.map((subItem, key) => (
                              <p key={key}>{subItem}</p>
                            ))}
                          </div>
                        ) : (
                          <ul>
                            {item.selectionList.items.map((subItem, key) => (
                              <li key={key}>{subItem}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  ) : (
                    <></>
                  )}

                  {/* Modifiers */}
                  {item.modifiers ? (
                    item.modifiers.length > 0 && (
                      <div className="receipt-modifiers col-c-fs">
                        <h6>{item.note} Note</h6>
                        {/* <div className="modifier-container "> */}
                        {item.modifiers &&
                          item.modifiers.map((modifier, key) => (
                            <div className="modifier-container" key={key}>
                              <p key={key}>{modifier.name}</p>
                              <div className="modifier-right-section row-c-c">
                                <p className="modifier-price">+${modifier.price.toFixed(2)}</p>
                                {editingItemIndex === itemKey && editItemOn ? (
                                  <button
                                    className="remove-modifier"
                                    onClick={() => {
                                      dispatch(setOrder(["DELETE_MODIFIER", modifier]));
                                    }}
                                  >
                                    -
                                  </button>
                                ) : (
                                  <button></button>
                                )}
                              </div>
                            </div>
                          ))}
                        {/* </div> */}
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
              <h6 className="price-amount">${subTotal.toFixed(2)}</h6>
            </div>
            {discounted && isDiscountBeforeTax && (
              <div className="discount row-sb-c total-container">
                <h6 className="price-label">Discount:</h6>
                <h6 className="price-amount">-${beforeTaxDiscount.toFixed(2)}</h6>
              </div>
            )}
            {orderType === "DELIVERY" && isDeliveryBeforeTax && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Delivery:</h6>
                <h6 className="price-amount">${deliveryFee.toFixed(2)}</h6>
              </div>
            )}
            <div className="tax row-sb-c total-container">
              <h6 className="price-label">Tax:</h6>
              <h6 className="price-amount">${tax.toFixed(2)}</h6>
            </div>
            {discounted && !isDiscountBeforeTax && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Discount:</h6>
                <h6 className="price-amount">-${afterTaxDiscount.toFixed(2)}</h6>
              </div>
            )}
            {orderType === "DELIVERY" && !isDeliveryBeforeTax && (
              <div className="delivery row-sb-c total-container">
                <h6 className="price-label">Delivery:</h6>
                <h6 className="price-amount">${deliveryFee.toFixed(2)}</h6>
              </div>
            )}
            <div className="grand-total row-sb-c total-container">
              <h6 className="price-label">Grand-Total:</h6>
              <h6 className="price-amount">${total.toFixed(2)}</h6>
            </div>
          </div>
          {/* ----------------------------- Options ----------------------------- */}
          <div className="receipt-options row-sa-c">
            <label
              className="col-c-c"
              onChange={() => {
                dispatch(setOrder(["setDiscounted", !discounted]));
              }}
            >
              <span>Discount</span>
              <input type="checkbox" checked={discounted} onChange={() => {}} />
            </label>
            <label
              className="col-c-c"
              onChange={() => {
                dispatch(setOrder(["setDiscounted", !discounted]));
              }}
            >
              <span>Out of Town Delivery</span>
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
