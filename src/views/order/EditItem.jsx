import React, { useEffect } from "react";
import ExitTab from "../../components/exitTab/ExitTab";
import "./editItem.css";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";

function EditItem() {
  const dispatch = useDispatch();
  const { editItemOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const { editingItemIndex, editingSelection, editingCategory } = useSelector(
    ({ orderInfo }) => orderInfo.orderOptions
  );
  const { items } = useSelector(({ orderInfo }) => orderInfo.order);
  const item = items[editingItemIndex];
  useEffect(() => {
    console.log("here on edit item", editingItemIndex);
  }, [editingItemIndex]);
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
            {item.modifiable && <button>Selection List</button>}
            <button>Swap</button>
            <button>No Add</button>
            <button>Add</button>
          </div>

          {/* ----------------------------- Selection Items ----------------------------- */}
          {true && (
            <div className="edit-selection-list">
              {editingSelection.map((selectionItem, key) => (
                <button key={key} className="edit-selection-item row-c-c" onClick={()=>{}}>
                  {selectionItem}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ----------------------------- Swap Items ----------------------------- */}
        {false && (
          <>
            <div className="swap-selection-list">Hi</div>
            <div className="swap-category-list">
              {[1, 2, 3].map((category, key) => (
                <p key={key}>Hi</p>
              ))}
            </div>
          </>
        )}
        <div className="edit-item-btns row-c-c">
          <button>Done</button>
        </div>
      </div>
    </>
  );
}

export default EditItem;
