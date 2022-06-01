import React from "react";
import { setOrder } from "../../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";
import "./orderType.css";
function OrderType() {
  const dispatch = useDispatch();
  const { orderType, deliveryAddress } = useSelector(({ orderInfo }) => orderInfo.order);

  return (
    <>
      <div className="order-type row-sb-c">
        {/* PICKUP */}
        <button
          className={orderType === "PICK_UP" ? "order-type-active" : undefined}
          onClick={() => {
            dispatch(setOrder(["setOrderType", "PICK_UP"]));
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
        <div className="address input-info row-c-c">
          <input type="text" placeholder="Address" value={deliveryAddress} onChange={(e)=>{dispatch(setOrder(["setDeliveryAddress", e.target.value]))}} />
        </div>
      )}
    </>
  );
}

export default OrderType;
