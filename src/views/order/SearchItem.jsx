import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XIcon } from "../../Assets/Images";
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import { setInstances } from "../../redux/functionality";
import { setOrderOptions, setOrder } from "../../redux/orderInfo";
import { getSimilarItems } from "../../utils/customerInfoUtils";

import "./searchItem.css";
function SearchItem() {
  const { menuItems } = useSelector(({ menuData }) => menuData);
  const { filteredItems, searchedItem } = useSelector(({ orderInfo }) => orderInfo.orderOptions);

  const searchItemRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    searchItemRef.current.focus();
    return () => {
      dispatch(setOrder(["setSearchedItem", ""]));
      dispatch(setOrderOptions(["setFilteredItems", []]));
    };
  }, []);
  return (
    <>
      <BackgroundExit
        exitPage={() => {
          dispatch(setInstances(["setSearchItemOn", false]));
        }}
        bgColour={"#090a107a"}
      />

      <button
        className="exit-search row-c-c"
        onClick={() => {
          dispatch(setInstances(["setSearchItemOn", false]));
        }}
      >
        <img src={XIcon} alt="" />
      </button>
      <div className="search-item col-fs-c">
        <div className="search-item-content col-fs-c">
          <input
            type="text"
            placeholder="Search Item . . ."
            value={searchedItem}
            ref={searchItemRef}
            onChange={(e) => {
              dispatch(setOrderOptions(["setSearchedItem", e.target.value]));
              dispatch(setOrderOptions(["setFilteredItems", getSimilarItems(e.target.value, menuItems)]));
            }}
          />
          <div className="search-list col-fs-c" tabIndex={-1}>
            {filteredItems.length > 0 &&
              filteredItems.map((item, key) => (
                <button
                  key={key}
                  className="suggested-search-item"
                  onClick={() => {
                    dispatch(setOrder(["ADD_ITEM", item]));
                  }}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchItem;
