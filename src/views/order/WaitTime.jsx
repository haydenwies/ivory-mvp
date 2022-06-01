import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../redux/orderInfo";
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import { setInstances } from "../../redux/functionality";
import "./waitTime.css";

function WaitTime() {
  const { waitTime, isScheduledOrder } = useSelector(({ orderInfo }) => orderInfo.order);
  const { waitTimeOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const dispatch = useDispatch();
  return (
    <>
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
                    <input
                      type="date"
                      placeholder="YYYY-MM-DD"
                      onChange={(e) => {
                        dispatch(() => {
                          dispatch(setOrder(["setScheduledTime", ["DATE", e.target.value]]));
                        });
                      }}
                    />
                  </label>
                  <label className="col-c-c">
                    <span>Time</span>
                    <input
                      type="time"
                      placeholder="HH-MM-PM"
                      onChange={(e) => {
                        dispatch(() => {
                          dispatch(setOrder(["setScheduledTime", ["TIME", e.target.value]]));
                        });
                      }}
                    />
                  </label>
                </div>
              ) : (
                // Wait Times
                <div className="wait-times col-c-c">
                  {[
                    { displayName: "10 Minutes", units: "MM", magnitude: 10 },
                    { displayName: "20 Minutes", units: "MM", magnitude: 20 },
                    { displayName: "30 Minutes", units: "MM", magnitude: 30 },
                    { displayName: "40 Minutes", units: "MM", magnitude: 40 },
                    { displayName: "50 Minutes", units: "MM", magnitude: 50 },
                    { displayName: "60 Minutes", units: "MM", magnitude: 60 },
                    { displayName: "70 Minutes", units: "MM", magnitude: 70 },
                    { displayName: "80 Minutes", units: "MM", magnitude: 80 },
                  ].map((option, key) => (
                    <div
                      key={key}
                      className={
                        waitTime.displayName === option.displayName
                          ? "time-option-active time-option row-c-c"
                          : "time-option row-c-c"
                      }
                      onClick={() => {
                        dispatch(setOrder(["setWaitTime", option]));
                      }}
                    >
                      {option.displayName}
                    </div>
                  ))}
                </div>
              )}
              <button
                className="wait-time-done"
                onClick={() => {
                  dispatch(setInstances(["setWaitTimeOn", false]));
                }}
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default WaitTime;
