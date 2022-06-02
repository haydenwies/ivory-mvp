import React from "react";
import "./items.css";
import { Trash, Info, Swap, Draw, Undo, Search, Elipse, Custom } from "../../Assets/Images";
import { setInstances } from "../../redux/functionality";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setOrderManagement } from "../../redux/orderInfo";
import { getDefaultState } from "../../utils/managementUtils";
import CustomItem from "../order/CustomItem";
import SearchItem from "../order/SearchItem";
function Items() {
  /* ----------------------------- State Variables ----------------------------- */
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  const { menuItems, menuCategories } = useSelector((state) => state.menuData);
  const { categoryType, customItemOn, searchItemOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );

  return (
    <div className="items">
      {/* ----------------------------- Selection Items ----------------------------- */}
      <div className="selection">
        {menuItems
          .filter((item) => item.category[0] === categoryType)
          .map((item, key) => (
            <div
              key={key}
              className="selection-item row-c-c"
              onClick={() => {
                dispatch(setOrder(["ADD_ITEM", item]));
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
