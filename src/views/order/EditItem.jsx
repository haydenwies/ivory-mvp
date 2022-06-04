import React, { useEffect } from "react";
import ExitTab from "../../components/exitTab/ExitTab";
import "./editItem.css";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";
import { setOrder, setOrderOptions } from "../../redux/orderInfo";
import { CheckMark } from "../../Assets/Images";

function EditItem() {
  const dispatch = useDispatch();
  const { editItemOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const { swapCategories, menuItems } = useSelector(({ menuData }) => menuData);
  const { categoryType } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const { editingItemIndex, editingSelection, editingCategory, desiredSwapItem, currentSwapItem } =
    useSelector(({ orderInfo }) => orderInfo.orderOptions);
  const { items } = useSelector(({ orderInfo }) => orderInfo.order);
  const item = items[editingItemIndex];

  const handleAddModifier = () => {
    let swapItemFormatted = `${currentSwapItem} --> ${desiredSwapItem}`;
    dispatch(setOrder(["ADD_MODIFIER", swapItemFormatted]));
    dispatch(setOrderOptions(["setCurrentSwapItem", ""]));
    dispatch(setOrderOptions(["setDesiredSwapItem", ""]));
  };

  const test = editingCategory === "No Add" || editingCategory === "Add";
  useEffect(() => {}, [editingItemIndex]);
  return (
    <>
      <ExitTab
        closePage={() => {
          dispatch(setInstances(["setEditItemOn", false]));
        }}
      />
      <div className="edit-item col-fe-c">
        {/* <h1>{item.name}</h1> */}
        <div className="edit-item-content col-c-c">
          <div className="edit-item-tabs row-se-c">
            {/* ----------------------------- Edit Tabs ----------------------------- */}
            {item.modifiable && (
              <button
                className={editingCategory === "Selection List" ? "editing-tab-active" : undefined}
                onClick={(e) => {
                  dispatch(setOrderOptions(["setEditingCategory", e.target.innerText]));
                }}
              >
                Selection List
              </button>
            )}
            <button
              className={editingCategory === "Swap" ? "editing-tab-active" : undefined}
              onClick={(e) => {
                dispatch(setOrderOptions(["setEditingCategory", e.target.innerText]));
              }}
            >
              Swap
            </button>
            <button
              className={editingCategory === "No Add" ? "editing-tab-active" : undefined}
              onClick={(e) => {
                dispatch(setOrderOptions(["setEditingCategory", e.target.innerText]));
              }}
            >
              No Add
            </button>
            <button
              className={editingCategory === "Add" ? "editing-tab-active" : undefined}
              onClick={(e) => {
                dispatch(setOrderOptions(["setEditingCategory", e.target.innerText]));
              }}
            >
              Add
            </button>
          </div>

          {/* ----------------------------- Selection Items ----------------------------- */}
          {editingCategory === "Selection List" && (
            <div className="selection-content">
              <div className="edit-selection-list">
                {editingSelection.map((selectionItem, key) => (
                  <button
                    key={key}
                    className="edit-selection-item row-c-c"
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

          {/* ----------------------------- Swap Items ----------------------------- */}
          {editingCategory === "Swap" && (
            <div className="swap-content">
              <div className="swap-selection-list">
                {menuItems
                  .filter((item) => item.category[0] === categoryType)
                  .map((item, key) => (
                    <div
                      className="swap-selection row-c-c"
                      key={key}
                      onClick={(e) => dispatch(setOrderOptions(["setSwapItem", e.target.innerText]))}
                    >
                      {item.name}
                    </div>
                  ))}
              </div>
              <div className="swap-category-list ">
                {swapCategories.map((category, key) => (
                  <div
                    key={key}
                    className="swap-category row-c-c"
                    onClick={(e) => {
                      dispatch(setInstances(["setCategoryType", e.target.innerText]));
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
              <div className="swap-actions row-sa-c">
                <button
                  onClick={() => {
                    dispatch(setOrderOptions(["setCurrentSwapItem", ""]));
                    dispatch(setOrderOptions(["setDesiredSwapItem", ""]));
                  }}
                >
                  Clear Swap
                </button>
                <div
                  className="current-swap-item row-c-c"
                  onClick={() => {
                    dispatch(setOrderOptions(["setCurrentSwapItem", ""]));
                  }}
                >
                  {currentSwapItem}
                </div>
                <div className="swap-arrow row-c-c">{"-->"}</div>
                <div
                  className="desired-swap-item row-c-c"
                  onClick={() => {
                    dispatch(setOrderOptions(["setDesiredSwapItem", ""]));
                  }}
                >
                  {desiredSwapItem}
                </div>
                <button
                  onClick={() => {
                    handleAddModifier();
                  }}
                >
                  Add Swap
                </button>
              </div>
            </div>
          )}
          {/* ----------------------------- Add/No Add Items ----------------------------- */}
          {editingCategory === "No Add" ||
            (editingCategory === "Add" && (
              <div className="add-or-no-add">
                {item.modifierList
                  .filter((modifier) =>
                    editingCategory === "No Add"
                      ? modifier.modifyType === "No Add"
                      : modifier.modifyType === "Add"
                  )
                  .map((modifier, key) => (
                    <div
                      key={key}
                      className="no-add-items col-c-c"
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
              </div>
            ))}

          {/* ----------------------------- Edit Item Buttons ----------------------------- */}
          <div className="edit-item-btns row-se-c">
            <div className="edit-modfiy-quantity row-c-c">
              <h4>Item Quantity</h4>
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
            <button
              className="done-edit"
              onClick={() => {
                dispatch(setInstances(["setEditItemOn", false]));
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditItem;
