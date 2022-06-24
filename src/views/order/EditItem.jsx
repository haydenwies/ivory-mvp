import React, { useEffect } from "react";
import ExitTab from "../../components/exitTab/ExitTab";
import "./editItem.css";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";
import { setOrder, setOrderOptions } from "../../redux/orderInfo";
import { CheckMark } from "../../Assets/Images";
import { priceInputCheck } from "../../utils/customerInfoUtils";
import { SPECIAL_COMBO } from "../../redux/menuData";

function EditItem({ handleAddItem }) {
  const dispatch = useDispatch();

  // Menu Data State
  const { nonSwappable, menuItems, menuCategories } = useSelector(({ menuData }) => menuData);

  // Order Options State
  const {
    swapPrice,
    editingItemIndex,
    editingSelection,
    editingTab,
    editingCategory,
    desiredSwapItem,
    currentSwapItem,
    tempFlatFee,
  } = useSelector(({ orderInfo }) => orderInfo.orderOptions);

  //Order Info State
  const { items } = useSelector(({ orderInfo }) => orderInfo.order);

  const item = items[editingItemIndex]; //Current Editing Item

  /* ----------------------------- Functions ----------------------------- */

  /**
   * Handles adding swap item
   */
  const handleSwap = () => {
    let decimalCount = 0;
    for (let i = 0; i < swapPrice.length; i++) {
      if (swapPrice[i] === ".") decimalCount++;
    }

    if (decimalCount > 1) {
      alert("Please enter a valid price");
      return;
    }
    if (
      currentSwapItem.name === "" ||
      !currentSwapItem.hasOwnProperty("name") ||
      desiredSwapItem.name === "" ||
      !desiredSwapItem.hasOwnProperty("name")
    ) {
      alert("Select swap items");
      return;
    }

    dispatch(
      setOrder([
        "ADD_SWAP",
        {
          name: `${currentSwapItem.name} --> ${desiredSwapItem.name}`,
          price: parseFloat(swapPrice),
          type: "swap",
        },
      ])
    );
    dispatch(setOrderOptions(["setCurrentSwapItem", { name: "", price: 0 }]));
    dispatch(setOrderOptions(["setDesiredSwapItem", { name: "", price: 0 }]));
    dispatch(setOrderOptions(["setSwapPrice", ""]));
  };

  const verifyFlatFeeModifier = () => {
    let decimalCount = 0;
    for (let i = 0; i < tempFlatFee.length; i++) {
      if (tempFlatFee[i] === ".") decimalCount++;
    }

    if (decimalCount > 1) {
      alert("Please enter a valid flat fee price");
      return;
    }

    dispatch(setOrder(["setFlatFeeModifier", tempFlatFee]));
  };

  const handleQuickClose = (e) => {
    e.preventDefault();
    dispatch(setInstances(["setEditItemOn", false]));
  };

  useEffect(() => {
    if (item.selectionList.itemLimit > 0) {
      dispatch(setOrderOptions(["setEditingTab", "Selection List"]));
    } else if (item.swappable) {
      dispatch(setOrderOptions(["setEditingTab", "Swap"]));
    } else {
      dispatch(setOrderOptions(["setEditingTab", "No Add"]));
    }
  }, [editingItemIndex]);
  useEffect(() => {
    return () => {
      dispatch(setOrderOptions(["setCurrentSwapItem", { name: "", price: 0 }]));
      dispatch(setOrderOptions(["setDesiredSwapItem", { name: "", price: 0 }]));
      dispatch(setOrderOptions(["setSwapPrice", ""]));
      dispatch(setOrderOptions(["setEditingTab", "Selection List"]));
      dispatch(setOrderOptions(["resetEditingItemIndex", item]));
    };
  }, []);
  return (
    <>
      {/* ----------------------------- Close Tab ----------------------------- */}
      <ExitTab
        closePage={() => {
          dispatch(setInstances(["setEditItemOn", false]));
        }}
      />

      {/* ----------------------------- Beginning of Edit Tab----------------------------- */}
      <div
        className="edit-item col-fe-c"
        onContextMenu={(e) => {
          handleQuickClose(e);
        }}
      >
        <div className="edit-item-content">
          <div className="edit-item-tabs row-se-c">
            {/* ----------------------------- Edit Tabs ----------------------------- */}
            {item.selectionList.itemLimit > 0 && (
              <button
                className={editingTab === "Selection List" ? "editing-tab-active" : undefined}
                onClick={(e) => {
                  dispatch(setOrderOptions(["setEditingTab", e.target.innerText]));
                }}
              >
                Selection List
              </button>
            )}
            {item.swappable && (
              <button
                className={editingTab === "Swap" ? "editing-tab-active" : undefined}
                onClick={() => {
                  dispatch(setOrderOptions(["setEditingTab", "Swap"])); //Change was used instead
                }}
              >
                Change
              </button>
            )}
            <button
              className={editingTab === "No Add" ? "editing-tab-active" : undefined}
              onClick={(e) => {
                dispatch(setOrderOptions(["setEditingTab", e.target.innerText]));
              }}
            >
              No Add
            </button>
            <button
              className={editingTab === "Add" ? "editing-tab-active" : undefined}
              onClick={(e) => {
                dispatch(setOrderOptions(["setEditingTab", e.target.innerText]));
              }}
            >
              Add
            </button>
          </div>

          {/* ----------------------------- Selection Items ----------------------------- */}
          {editingTab === "Selection List" && (
            <div className="selection-content">
              <div className="edit-selection-list">
                {editingSelection.map((selectionItem, key) => (
                  <button
                    key={key}
                    className="edit-selection-item row-c-c"
                    style={{
                      backgroundColor:
                        item.selectionList.items.indexOf("/") === -1
                          ? "rgba(247, 232, 191,0.5)"
                          : "rgb(247, 232, 191)",
                    }}
                    onClick={() => {
                      dispatch(setOrder(["ADD_SELECTION_ITEM", selectionItem]));
                    }}
                  >
                    {selectionItem}
                  </button>
                ))}
              </div>

              {/* ----------------------------- Selection Choices ----------------------------- */}
              <div className="selection-choices row-se-c">
                {item.selectionList.items.map((selectionItem, key) => (
                  <div
                    className="selection-choice row-c-c"
                    key={key}
                    onClick={() => {
                      dispatch(setOrder(["DELETE_SELECTION_ITEM", key]));
                    }}
                  >
                    {selectionItem}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------------------- Swap Selection ----------------------------- */}
          {editingTab === "Swap" && (
            <>
              <div className="swap-content">
                {/* Swap Selection Items */}
                <div className="swap-selection-list">
                  {menuItems
                    .filter((item) => item.category === editingCategory)
                    .map((item, key) => (
                      <div
                        className="swap-selection row-c-c"
                        style={{
                          backgroundColor:
                            currentSwapItem.name !== "" && desiredSwapItem.name !== ""
                              ? "#197e602d"
                              : "#197e5f",
                        }}
                        key={key}
                        onClick={() => dispatch(setOrderOptions(["setSwapItem", item]))}
                      >
                        {item.name}
                      </div>
                    ))}
                </div>

                {/* ----------------------------- Swap Category ----------------------------- */}
                <div className="swap-category-list ">
                  {menuCategories
                    .filter((category) => {
                      for (let i = 0; i < nonSwappable.length; i++) {
                        if (category === nonSwappable[i]) {
                          return false;
                        }
                      }
                      return true;
                    })
                    .map((category, key) => (
                      <div
                        key={key}
                        className="swap-category row-c-c"
                        onClick={(e) => {
                          dispatch(setOrderOptions(["setEditingCategory", e.target.innerText]));
                        }}
                      >
                        {category}
                      </div>
                    ))}
                </div>
              </div>

              {/* ----------------------------- Swap Actions ----------------------------- */}
              <div className="swap-actions">
                {/* Top Swap Container*/}
                <div className="swap-container">
                  {/* Clear Swap */}
                  <button
                    className="clear-swap"
                    onClick={() => {
                      dispatch(setOrderOptions(["setCurrentSwapItem", { name: "", price: 0 }]));
                      dispatch(setOrderOptions(["setDesiredSwapItem", { name: "", price: 0 }]));
                      dispatch(setOrderOptions(["setSwapPrice", ""]));
                    }}
                  >
                    Clear Swap
                  </button>
                  {/* Original Item to be swapped */}
                  <input
                    className="current-swap-item row-c-c"
                    onClick={() => {
                      dispatch(setOrderOptions(["setCurrentSwapItem", { name: "", price: 0 }]));
                    }}
                    readOnly
                    onChange={() => {}}
                    placeholder="Oringal Item"
                    value={currentSwapItem.name}
                  />
                  {/* Swap Price Difference */}
                  <div className="swap-price-container row-c-c">
                    <input
                      type="text"
                      placeholder="$0.00"
                      value={swapPrice}
                      onChange={(e) => {
                        dispatch(setOrderOptions(["setSwapPrice", priceInputCheck(e.target.value)]));
                      }}
                    />
                  </div>
                  {/* Desired Swap item */}
                  <input
                    className="desired-swap-item row-c-c"
                    onClick={() => {
                      dispatch(setOrderOptions(["setDesiredSwapItem", { name: "", price: 0 }]));
                    }}
                    readOnly
                    onChange={() => {}}
                    placeholder="Change Item"
                    value={desiredSwapItem.name}
                  />

                  {/* Add Swap */}
                  <button
                    className="add-swap"
                    onClick={() => {
                      handleSwap();
                    }}
                  >
                    Add Swap
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ----------------------------- Add/No Add Items ----------------------------- */}
          {(editingTab === "No Add" || editingTab === "Add") && (
            <div className="add-or-no-add">
              {item.modifierList
                .filter((modifier) =>
                  editingTab === "No Add" ? modifier.type === "No Add" : modifier.type === "Add"
                )
                .map((modifier, key) => (
                  <div
                    key={key}
                    className="add-or-no-add-items col-c-c"
                    style={{ backgroundColor: modifier.checked ? "#20b98a" : "rgb(247, 232, 191)" }}
                    onClick={() => {
                      dispatch(setOrder(["TOGGLE_MODIFIER", modifier]));
                    }}
                  >
                    <p>{modifier.name}</p>
                    <div className="checkbox-container row-c-c">
                      {modifier.checked ? <img src={CheckMark} /> : <></>}
                    </div>
                  </div>
                ))}
              {/* <div className="one-time-fee">
                  input
                </div> */}
            </div>
          )}

          {/* ----------------------------- Edit Item Buttons ----------------------------- */}
          {(editingTab === "No Add" || editingTab === "Add") && (
            <div className="flat-fee-modifier row-c-c">
              <label
                className="col-c-c"
                onChange={() => {
                  dispatch(setOrder(["setFlatFeeModifierOn", !item.flatFeeModifierOn]));
                }}
              >
                <span>Flat Fee</span>
                <input
                  type="checkbox"
                  checked={item.flatFeeModifierOn}
                  onChange={() => {
                    // dispatch(setOrder(["setFlatFeeModifierOn", !item.flatFeeModifierOn]));
                  }}
                />
              </label>
              <input
                type="text"
                className="flat-fee-price"
                placeholder="$0.00"
                value={tempFlatFee}
                onChange={(e) => {
                  dispatch(setOrderOptions(["setTempFlatFee", priceInputCheck(e.target.value)]));
                }}
              />
              <button
                className="flat-fee-add"
                onClick={() => {
                  verifyFlatFeeModifier();
                }}
              >
                Set
              </button>
            </div>
          )}
          {editingTab !== "Swap" && (
            <div className="edit-item-btns row-se-c">
              <div className="edit-modfiy-quantity col-c-c">
                <h4>Item Quantity</h4>
                <div className="edit-modify-actions row-c-c">
                  <button
                    className="edit-increment-item"
                    onClick={() => {
                      dispatch(setOrder(["setItemQuantity", item.quantity + 1]));
                    }}
                  >
                    +
                  </button>
                  <div className="edit-quantity row-c-c">{item.quantity}</div>
                  <button
                    className="edit-decrement-item"
                    onClick={() => {
                      dispatch(setOrder(["setItemQuantity", item.quantity - 1]));
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="new-combo-container">
                <button
                  className="new-combo"
                  onClick={() => {
                    handleAddItem(SPECIAL_COMBO);
                  }}
                >
                  New Combo
                </button>
              </div>
              <button
                className="done-edit"
                onClick={() => {
                  dispatch(setInstances(["setEditItemOn", false]));
                }}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditItem;
