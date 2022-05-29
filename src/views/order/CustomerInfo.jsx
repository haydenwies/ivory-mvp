import React from "react";
import "./customerInfo.css";
import { XIcon } from "../../Assets/Images";
import { useDispatch, useSelector } from "react-redux";
import { setInstances } from "../../redux/functionality";
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import { setOrder } from "../../redux/orderInfo";
import { numbersOnly, formatPhoneNumber } from "../../utils/formValidation";
function CustomerInfo() {
  const dispatch = useDispatch();
  const { phoneNumber, orderType, waitTime, isScheduledOrder } = useSelector(
    ({ orderInfo }) => orderInfo.order
  );
  const { waitTimeOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  /* ----------------------------- Methods ----------------------------- */
  const handlePhoneNumber = (e) => {
    let word = e.target.value;
    let charInput = e.nativeEvent.data;
    let deleteKeys = e.nativeEvent.inputType;
    let deleteDash = word.slice(word.length - 1);

    //Removes the dash when deleting the phone number
    if (deleteDash === "-" && deleteKeys === "deleteContent") {
      dispatch(setOrder(["setPhoneNumber", word.slice(0, word.length - 2)]));
      return;
    }

    //Checks if the input is numbers only
    if (word.length > 12) {
      return;
    }
    if (
      numbersOnly(charInput) ||
      deleteKeys === "deleteContentBackward" ||
      deleteKeys === "deleteContentForward"
    ) {
      dispatch(setOrder(["setPhoneNumber", formatPhoneNumber(word)]));
    }
  };
  return (
    <>
      <BackgroundExit exitPage={() => dispatch(setInstances(["setCustomerInfoOn", false]))} />
      <div className="customer-info">
        {/* ----------------------------- Exit Icon ----------------------------- */}
        <button
          className="exit-customer-info row-c-c"
          onClick={() => {
            dispatch(setInstances(["setCustomerInfoOn", false]));
          }}
        >
          <img src={XIcon} alt="exit customer info" />
        </button>

        {/* ----------------------------- Customer Information ----------------------------- */}
        <div className="customer-info-input col-se-c">
          <h1>Customer Information</h1>
          <div className="phone-number input-info row-c-c">
            <input
              type="tel"
              placeholder="Phone Number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={handlePhoneNumber}
              value={phoneNumber}
            />
          </div>
          <div className="order-type row-sb-c">
            <button
              className={orderType === "PICK_UP" ? "order-type-active" : undefined}
              onClick={() => {
                dispatch(setOrder(["setOrderType", "PICK_UP"]));
              }}
            >
              Pick-Up
            </button>
            <button
              className={orderType === "DELIVERY" ? "order-type-active" : undefined}
              onClick={() => {
                dispatch(setOrder(["setOrderType", "DELIVERY"]));
              }}
            >
              Delivery
            </button>
          </div>
          {/* DELIVERY */}
          {orderType === "DELIVERY" && (
            <div className="address input-info row-c-c">
              <input type="text" placeholder="Address" />
            </div>
          )}
          {/* WAIT TIME */}
          <div className="wait-time input-info row-c-c">
            <button
              onClick={() => {
                dispatch(setInstances(["setWaitTimeOn", true]));
              }}
            >
              {waitTime.displayName ? waitTime.displayName : "Select Wait Time"}
            </button>
          </div>
          {waitTimeOn && (
            <>
              <BackgroundExit
                exitPage={() => {
                  dispatch(setInstances(["setWaitTimeOn", false]));
                }}
              />
              <div className="wait-time-modal col-c-c">
                <div className="wait-time-content">
                  <div className="order-time-header row-sb-c">
                    <h2>Wait Times</h2>
                    <div className="order-time-options row-se-c">
                      <button
                        className={!isScheduledOrder ? "option-active wait-time-option" : "wait-time-option"}
                        onClick={() => {
                          dispatch(setOrder(["setIsScheduledOrder", false]));
                        }}
                      >
                        Wait Time
                      </button>
                      <button
                        className={
                          isScheduledOrder ? "option-active schedule-time-option" : "schedule-time-option"
                        }
                        onClick={() => {
                          dispatch(setOrder(["setIsScheduledOrder", true]));
                        }}
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                  {/* Scheduled Order */}
                  {isScheduledOrder ? (
                    <div className="scheduled-order col-c-c">
                      <label className="col-c-c">
                        <span>Date</span>
                        <input type="date" placeholder="YYYY-MM-DD" />
                      </label>
                      <label className="col-c-c">
                        <span>Time</span>
                        <input type="time" placeholder="HH-MM-PM" />
                      </label>
                    </div>
                  ) : (
                    // Wait Times
                    <div className="wait-times col-c-c">
                      {[
                        "10 Minutes",
                        "20 Minutes",
                        "30 Minutes",
                        "40 Minutes",
                        "50 Minutes",
                        "60 Minutes",
                        "70 Minutes",
                      ].map((option) => (
                        <div
                          className="time-option row-c-c"
                          onClick={() => {
                            dispatch(setOrder(["setWaitTime", option]));
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="wait-time-save">Save</button>
                </div>
              </div>
            </>
          )}
          {/* NOTES */}
          <div className="notes input-info row-c-c">
            <textarea type="textarea" placeholder="Notes" />
          </div>
          {/* PRINT RECEIPT */}
          <button className="print">Print Receipt</button>
        </div>

        {/* ----------------------------- Print Options ----------------------------- */}
        <div className="print-options col-sa-c">
          <div className="printer-option">
            <h4>Printer Option</h4>
            <img src="" alt="" />
          </div>
          <div className="reprint-order">
            <h4>Reprint Order</h4>
            <img src="" alt="" />
          </div>
          <div className="save-order">
            <h4>Save Order</h4>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerInfo;
