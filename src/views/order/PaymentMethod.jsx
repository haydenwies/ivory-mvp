import React from "react";
import "./paymentMethod.css";
import { setOrder } from "../../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";

function PaymentMethod() {
  const dispatch = useDispatch();
  const { paymentMethod } = useSelector(({ orderInfo }) => orderInfo.order);

  return (
    <div className="payment input-info row-se-c">
      <label
        className="col-c-c"
        onClick={() => {
          dispatch(setOrder(["setPaymentMethod", "CASH"]));
        }}
      >
        <span>Cash</span>
        <input type="checkbox" checked={paymentMethod === "CASH"} onChange={() => {}} />
      </label>
      <label
        className="col-c-c"
        onClick={() => {
          dispatch(setOrder(["setPaymentMethod", "DEBIT"]));
        }}
      >
        <span>Debit</span>
        <input type="checkbox" checked={paymentMethod === "DEBIT"} onChange={() => {}} />
      </label>
      <label
        className="col-c-c"
        onClick={() => {
          dispatch(setOrder(["setPaymentMethod", "CREDIT"]));
        }}
      >
        <span>Credit</span>
        <input type="checkbox" checked={paymentMethod === "CREDIT"} onChange={() => {}} />
      </label>
    </div>
  );
}

export default PaymentMethod;
