import React from "react";
import "./items.css";
import { Trash, Info, Swap, Draw, Undo, Search, Elipse, Custom } from "../../Assets/Images";
import { setInstances } from "../../redux/functionality";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../redux/orderInfo";
function Items() {
  /* ----------------------------- State Variables ----------------------------- */
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orderInfo);
  const { menuItems, menuCategories } = useSelector((state) => state.menuData);
  const { categoryType } = useSelector(
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

      {/* ----------------------------- Item Options ----------------------------- */}
      <div className="item-options row-sb-c">
        <div
          className="trash"
          onClick={() => {
            dispatch(setOrder(["CLEAR_ITEMS"]));
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
          <div className="custom">
            <img src={Custom} alt="" />
          </div>
          <div className="undo">
            <img src={Undo} alt="" />
          </div>
          <div className="search">
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
