import React from "react";
import "./items.css";
import { Trash, Info, Swap, Draw, Undo, Search, Elipse, Custom } from "../../Assets/Images";
import { setInstances } from "../../redux/functionality";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setOrderManagement, setOrderOptions } from "../../redux/orderInfo";
import { getDefaultState } from "../../utils/managementUtils";
import CustomItem from "../order/CustomItem";
import SearchItem from "../order/SearchItem";
import EditItem from "../order/EditItem";
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
  const handleAddItem = (item) => {
    dispatch(setOrder(["ADD_ITEM", item]));

    if (item.modifiable) {
      let selectionIndex = choiceList.findIndex((selection) => {
        return selection.category === item.selectionCategory;
      });

      if (selectionIndex !== -1) {
        let selectionList = choiceList[selectionIndex].list;
        dispatch(setOrderOptions(["setEditingItemIndex", item]));
        dispatch(setOrderOptions(["setEditingSelectionList", selectionList]));
        dispatch(setInstances(["setEditItemOn", true]));

        if (item.selectionList.items.length === 0) {
          dispatch(setOrder(["setSelectionItems", Array(item.selectionList.itemLimit).fill("/")]));
        }
      }
    }
  };
  return (
    <div className="items">
      {/* ----------------------------- Selection Items ----------------------------- */}
      <div className="selection">
        {menuItems
          .filter((item) => item.category[0] === categoryType)
          .map((item, key) => (
            <div
              key={key}
              className={
                item.modifiable ? `modifiable-item selection-item row-c-c` : `selection-item row-c-c`
              }
              onClick={() => {
                handleAddItem(item);
              }}
            >
              <p>{item.name}</p>
            </div>
          ))}
      </div>

      {/* ----------------------------- Edit Items ----------------------------- */}
      {editItemOn && items[editingItemIndex] && (
        <div className="edit-item-container">
          <EditItem />
        </div>
      )}

      {/* ----------------------------- Item Categories ----------------------------- */}
      <div className="category">
        {menuCategories.map((category, key) => (
          <div
            key={key}
            className="category-item row-c-c"
            onClick={(e) => {
              dispatch(setInstances(["setCategoryType", e.target.innerText]));
            }}
          >
            <p>{category}</p>
          </div>
        ))}
      </div>
      {/* ----------------------------- Item Categories ----------------------------- */}
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
            dispatch(setOrder(["RESET_ORDER", getDefaultState()]));
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
