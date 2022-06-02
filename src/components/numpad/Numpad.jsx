import React from "react";
import "./numpad.css";
import { setOrderOptions } from "../../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";

function Numpad() {
  const { customItem } = useSelector(({ orderInfo }) => orderInfo.orderOptions);
  const dispatch = useDispatch();
  return (
    <>
      {/* Main Numpad section */}
      <div className="numpad-page">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "00", "."].map((numpadItem, i) => (
          <button
            className="numpad-items"
            key={i}
            onClick={(e) => {
              dispatch(setOrderOptions(["setPriceWithNumPad", numpadItem]));
            }}
          >
            {numpadItem}
          </button>
        ))}
        <button
          className="delete-numpad-key"
          onClick={() => {
            dispatch(setOrderOptions(["setDeleteWithNumPad"]));
          }}
        >
          Delete
        </button>
        <button
          className="clear-numpad-key"
          onClick={() => {
            dispatch(setOrderOptions(["setClearWithNumPad"]));
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}

export default Numpad;
