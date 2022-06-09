import React from "react";
import { setOrder, setOrderOptions } from "../../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";
import "./orderType.css";
import { formatAddress, getSimilarAddresses } from "../../utils/customerInfoUtils";
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
function OrderType() {
  const dispatch = useDispatch();
  const { orderType, deliveryAddress } = useSelector(({ orderInfo }) => orderInfo.order);
  const { filteredAddresses, addressList } = useSelector(({ orderInfo }) => orderInfo.orderOptions);

  return (
    <>
      <div className="order-type row-sb-c">
        {/* PICKUP */}
        <button
          className={orderType === "PICKUP" ? "order-type-active" : undefined}
          onClick={() => {
            dispatch(setOrder(["setOrderType", "PICKUP"]));
          }}
        >
          Pick-Up
        </button>
        {/* DELIVERY */}
        <button
          className={orderType === "DELIVERY" ? "order-type-active" : undefined}
          onClick={() => {
            dispatch(setOrder(["setOrderType", "DELIVERY"]));
          }}
        >
          Delivery
        </button>
        {/* ADDRESS */}
      </div>
      {orderType === "DELIVERY" && (
        <>
          {filteredAddresses.length > 0 && (
            <BackgroundExit
              bgColour="transparent"
              exitPage={() => {
                dispatch(setOrderOptions(["setFilteredAddresses", []]));
              }}
            />
          )}
          <div className="address input-info row-c-c">
            <input
              type="text"
              placeholder="Address"
              value={deliveryAddress}
              onChange={(e) => {
                dispatch(setOrder(["setDeliveryAddress", e.target.value]));
                dispatch(
                  setOrderOptions(["setFilteredAddresses", getSimilarAddresses(e.target.value, addressList)])
                );
              }}
            />
            {filteredAddresses.length > 0 && (
              <div className="delivery-options">
                {filteredAddresses.map((streetName, key) => (
                  <button
                    key={key}
                    onClick={() => {
                      dispatch(setOrder(["setDeliveryAddress", formatAddress(deliveryAddress, streetName)]));
                      dispatch(setOrderOptions(["setFilteredAddresses", []]));
                    }}
                  >
                    {streetName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default OrderType;
