import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../redux/orderInfo";
import BackgroundExit from "../../components/backgroundExit/BackgroundExit";
import { setInstances } from "../../redux/functionality";
import "./waitTime.css";
import { hoursValidation, minutesValidation } from "../../utils/customerInfoUtils";

function WaitTime() {
  const { waitTime, isScheduledOrder, scheduledTime } = useSelector(({ orderInfo }) => orderInfo.order);
  const { waitTimeOn } = useSelector(
    ({ functionality }) => functionality.instances[functionality.indexInstance]
  );
  const hourRef = useRef();
  const minuteRef = useRef();
  const dispatch = useDispatch();
  return (
    <>
      <div className="wait-time input-info row-c-c">
        <button
          onClick={() => {
            dispatch(setInstances(["setWaitTimeOn", true]));
          }}
        >
          {!isScheduledOrder && (waitTime.displayName ? waitTime.displayName : "Select Wait Time")}
          {isScheduledOrder &&
            (scheduledTime.hours && scheduledTime.minutes ? (
              <>
                <p>{scheduledTime.date} </p>
                <p>
                  {scheduledTime.hours} : {scheduledTime.minutes} {scheduledTime.meridian}
                </p>
              </>
            ) : (
              "Select Wait Time"
            ))}
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
                  <div className="scheduled-date col-c-c">
                    <span>Date</span>
                    <input
                      className="scheduled-date-input"
                      type="date"
                      placeholder="YYYY-MM-DD"
                      value={scheduledTime.date}
                      onChange={(e) => {
                        dispatch(setOrder(["setScheduledDate", e.target.value]));
                      }}
                    />
                  </div>
                  <div className="scheduled-time col-c-c">
                    <span>Time</span>
                    <div className="time-container">
                      <input
                        type="input"
                        className="scheduled-hours-input row-c-c"
                        value={scheduledTime.hours}
                        placeholder="00"
                        onChange={(e) => {
                          if (hoursValidation(e.target.value)) {
                            dispatch(setOrder(["setScheduledHours", e.target.value]));
                          }
                        }}
                      />
                      <div className="time-colon col-c-c">
                        <div className="dot1"></div>
                        <div className="dot2"></div>
                      </div>
                      <input
                        type="input"
                        className="scheduled-minutes-input row-c-c"
                        placeholder="00"
                        value={scheduledTime.minutes}
                        onChange={(e) => {
                          if (minutesValidation(e.target.value))
                            dispatch(setOrder(["setScheduledMinutes", e.target.value]));
                        }}
                      />
                    </div>
                    <div className="meridian-container row-c-c">
                      <button
                        onClick={() => {
                          dispatch(setOrder(["setScheduledMeridian", "AM"]));
                        }}
                        className={scheduledTime.meridian === "AM" ? "meridian-active" : undefined}
                      >
                        AM
                      </button>
                      <button
                        onClick={() => {
                          dispatch(setOrder(["setScheduledMeridian", "PM"]));
                        }}
                        className={scheduledTime.meridian === "PM" ? "meridian-active" : undefined}
                      >
                        PM
                      </button>
                    </div>
                  </div>
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
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default WaitTime;
