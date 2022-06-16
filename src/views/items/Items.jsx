import React from "react";
import "./items.css";
import { Trash, Info, Swap, Draw, Undo, Search, Elipse, Custom } from "../../Assets/Images";
import { setInstances, setInstancesDefaultSettings } from "../../redux/functionality";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setOrderManagement, setOrderOptions } from "../../redux/orderInfo";
import CustomItem from "../order/CustomItem";
import SearchItem from "../order/SearchItem";
import EditItem from "../order/EditItem";
import { SPECIAL_COMBO } from "../../redux/menuData";
import { useEffect } from "react";
function Items() {
  /* ----------------------------- State Variables ----------------------------- */
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  const { items } = useSelector((state) => state.orderInfo.order);
  const { editingItemIndex } = useSelector((state) => state.orderInfo.orderOptions);
  const { menuItems, menuCategories, choiceList } = useSelector((state) => state.menuData);
  const { categoryType, customItemOn, searchItemOn, editItemOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );

  /**
   * Handles adding an item to the receipt and decides whether the item has selection choices.
   * @param {menuItem} item menu item selected from the selection section
   */
  const handleAddItem = (item) => {
    dispatch(setOrder(["ADD_ITEM", item])); //Adds the selected item to the receipt

    // Checks if the item is modifiable
    if (item.selectionList.itemLimit > 0) {
      //Finds the index of the selection items object from the choice list array
      let selectionIndex = choiceList.findIndex((selection) => {
        return selection.category === item.selectionCategory;
      });

      //Opens the editing modal and sets the item that we will be editing
      dispatch(setOrderOptions(["setEditingItemIndex", item]));
      dispatch(setInstances(["setEditItemOn", true]));

      // Checks if there is a selection item list for that particular item
      if (selectionIndex !== -1) {
        let selectionList = choiceList[selectionIndex].list; //Gets the list of selection items for the corresponding item
        dispatch(setOrderOptions(["setEditingSelectionList", selectionList]));

        //Initializes the selection options to be empty slashes if there wasn't anything previously stored in state.
        if (item.selectionList.items.length === 0) {
          dispatch(setOrder(["setSelectionItems", Array(item.selectionList.itemLimit).fill("/")]));
        }
      }
    }
  };
  const handleSpecialCombos = (category, e) => {
    if (category === "Special Combo") {
      handleAddItem(SPECIAL_COMBO);
    } else {
      dispatch(setInstances(["setCategoryType", e.target.innerText]));
    }
  };

  return (
    <div className="items">
      {/* ----------------------------- Selection Items ----------------------------- */}
      <div className="selection">
        {menuItems
          .filter((item) => item.category === categoryType)
          .map((item, key) => (
            <div
              key={key}
              className={
                item.selectionList.itemLimit !== 0
                  ? `choose-item selection-item row-c-c`
                  : `selection-item row-c-c`
              }
              onClick={() => {
                handleAddItem(item);
              }}
            >
              <p>{item.name}</p>
            </div>
          ))}
      </div>

      {/* ----------------------------- Item Categories ----------------------------- */}
      <div className="category">
        {menuCategories.map((category, key) => (
          <div
            key={key}
            className="category-item row-c-c"
            onClick={(e) => {
              handleSpecialCombos(category, e);
            }}
          >
            {category}
          </div>
        ))}
      </div>

      {/* ----------------------------- Edit Items ----------------------------- */}
      {editItemOn && items[editingItemIndex] && (
        <div className="edit-item-container">
          <EditItem />
        </div>
      )}

      {/* ----------------------------- Custom Item----------------------------- */}
      {customItemOn && (
        <div className="custom-item-container row-c-c">
          <CustomItem />
        </div>
      )}
      {/* ----------------------------- Search Item ----------------------------- */}
      {searchItemOn && (
        <div className="search-item-container row-c-c">
          <SearchItem />
        </div>
      )}

      {/* ----------------------------- Item Options ----------------------------- */}
      <div className="item-options row-sb-c">
        <div
          className="trash"
          onClick={() => {
            dispatch(setOrderManagement(["RESET_ORDER"]));
            dispatch(setInstances(["RESET_DEFAULT_FUNCTIONALITY"]));
          }}
        >
          <img src={Trash} alt="" />
        </div>
        <div className="main-options row-se-c">
          <div
            className="info"
            onClick={() => {
              dispatch(setInstances(["setCustomerInfoOn", true]));
            }}
          >
            <img src={Info} alt="" />
          </div>
          <div
            className="custom"
            onClick={() => {
              dispatch(setInstances(["setCustomItemOn", true]));
            }}
          >
            <img src={Custom} alt="" />
          </div>
          <div
            className="undo"
            onClick={() => {
              dispatch(setOrderManagement(["RESTORE_BACKUP_ORDER"]));
            }}
          >
            <img src={Undo} alt="" />
          </div>
          <div
            className="search"
            onClick={() => {
              dispatch(setInstances(["setSearchItemOn", true]));
            }}
          >
            <img src={Search} alt="" />
          </div>
        </div>
        <div className="elipse">
          <img src={Elipse} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Items;
