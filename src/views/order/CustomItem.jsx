import React, { useRef, useEffect } from "react";
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import Numpad from "../../components/numpad/Numpad";
import "./customItem.css";
import { XIcon } from "../../Assets/Images";
import { setOrderOptions } from "../../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";
import { priceInputCheck } from "../../utils/customerInfoUtils";
import { setInstances } from "../../redux/functionality";

function CustomItem() {
  const { customItem } = useSelector(({ orderInfo }) => orderInfo.orderOptions);
  const dispatch = useDispatch();
  const customNameRef = useRef();

  const validPrice = () => {
    let decimalCount = 0;
    for (let i = 0; i < customItem.price.length; i++) {
      if (customItem.price[i] === ".") decimalCount++;
    }

    if (decimalCount > 1) {
      alert("Please enter a valid price");
    }
    dispatch(setOrderOptions(["ADD_CUSTOM_ITEM"]));
  };

  useEffect(() => {
    customNameRef.current.focus();
  }, []);
  return (
    <>
      <div className="custom-item">
        <div className="custom-item-info row-c-c">
          <div className="custom-item-content">
            <h1>Add Custom Item</h1>

            <button
              className="close-custom-item"
              onClick={() => {
                dispatch(setInstances(["setCustomItemOn", false]));
              }}
            >
              <img src={XIcon} alt="exit customer info" />
            </button>
            <div className="custom-name">
              <input
                type="text"
                placeholder="Custom Item Name"
                value={customItem.name}
                ref={customNameRef}
                onChange={(e) => {
                  dispatch(setOrderOptions(["setCustomItemName", e.target.value]));
                }}
              />
              <button
                className="clear-custom-name"
                onClick={() => {
                  dispatch(setOrderOptions(["setCustomItemName", ""]));
                }}
                tabIndex={-1}
              >
                X
              </button>
            </div>
            <div className="custom-item-middle-section row-sb-c">
              <div className="custom-item-price row-c-fe">
                <input
                  type="text"
                  placeholder="$0.00"
                  value={customItem.price}
                  onChange={(e) => {
                    dispatch(setOrderOptions(["setCustomItemPrice", priceInputCheck(e.target.value)]));
                  }}
                />
                <button
                  className="clear-custom-price"
                  onClick={() => {
                    dispatch(setOrderOptions(["setCustomItemPrice", ""]));
                  }}
                  tabIndex={-1}
                >
                  X
                </button>
              </div>
              <div className="custom-item-num-pad">
                <Numpad />
              </div>
            </div>
            <div
              className="add-custom-item row-c-c"
              onClick={() => {
                validPrice();
              }}
            >
              <button>Add Item</button>
            </div>
          </div>
        </div>
      </div>
      <BackgroundExit
        exitPage={() => {
          dispatch(setInstances(["setCustomItemOn", false]));
        }}
      />
    </>
  );
}

export default CustomItem;
