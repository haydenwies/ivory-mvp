import { useEffect, useState, useRef } from "react";
import { Info, Search } from "../../Assets/Images";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import "./viewOrder.css";
import { setOrderManagement } from "../../redux/orderInfo";
import { useNavigate } from "react-router-dom";
import { numbersOnly, numbersOnlyPhoneNum } from "../../utils/customerInfoUtils";
import { filterPhoneNum } from "../../utils/filterUtils";
import Loading from "../../components/loading/Loading";
import { setFilteredReceipts, setSelectedDate } from "../../redux/receiptInfo";
function Receipts() {
  const { receipts, activeDates, selectedDate, filteredReceipts } = useSelector(
    ({ receiptInfo }) => receiptInfo
  );
  // Modal data
  const [showModal, setShowModal] = useState(false);
  const [phoneEntry, setPhoneEntry] = useState("");
  const searchByPhoneRef = useRef();

  // Show full receipt toggle data
  const [showFullReceipt, setShowFullReceipt] = useState(true);

  //Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToggleModal = (e) => {
    setShowModal(!showModal);
  };

  const onToggleFullReceipt = (e) => {
    e.preventDefault();
    setShowFullReceipt(!showFullReceipt);
  };

  const findByPhone = (entry, data) => {
    if (entry === "") dispatch(setFilteredReceipts(data));

    if (numbersOnly(entry)) {
      dispatch(setFilteredReceipts(filterPhoneNum(entry, data)));
      console.log(filterPhoneNum(entry, data));
      setPhoneEntry(entry);
    } else {
      setPhoneEntry(entry.slice(0, -1));
    }
  };

  const deleteOrder = async (e, orderId) => {
    e.preventDefault();
    const docRef = doc(db, "orders", orderId);
    await deleteDoc(docRef);
  };

  useEffect(() => {
    dispatch(setFilteredReceipts(receipts.filter((receipt) => receipt.date === selectedDate)));
  }, [selectedDate, receipts]);

  useEffect(() => {
    let date = new Date();
    let day = date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;
    let month = date.getMonth() + 1 >= 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    let year = date.getFullYear();
    let today = `${year}-${month}-${day}`;
    dispatch(setSelectedDate(today));

    searchByPhoneRef.current.focus();
  }, []);
  return (
    <div className="receipt-data">
      {/* ----------------------------- Display Receipt Options ----------------------------- */}
      <div className="view-options row-sb-c">
        <div className="search-receipt row-c-c">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="Search by phone number"
            value={phoneEntry}
            ref={searchByPhoneRef}
            onChange={(e) => {
              findByPhone(e.target.value, receipts);
            }}
          />
        </div>
        <div className="display-options row-fe-c">
          <div className="row-sb-c full-receipt">
            <h5>Full Receipt</h5>
            <button
              className={showFullReceipt ? "full-receipt-btn full-receipt-on" : "full-receipt-btn"}
              onClick={onToggleFullReceipt}
            />
          </div>
          <div className="filter">
            <h5 onClick={onToggleModal}>Dates</h5>
          </div>
        </div>
        {/* ---------- Options Modal ---------- */}
        {showModal && (
          <div className="display-options-modal col-c-fs">
            <h2>Date Options</h2>
            {[...activeDates].map((property, key) => (
              <div key={key}>
                <button
                  className="display-option"
                  style={{ color: selectedDate === property ? "#20b98a" : "white" }}
                  onClick={() => {
                    dispatch(setSelectedDate(property));
                  }}
                >
                  {property}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ----------------------------- Receipts ----------------------------- */}
      {filteredReceipts.length === 0 ? (
        <div className="no-orders-saved row-c-c">No Orders.</div>
      ) : (
        <div className="receipts">
          <div className="receipts-container">
            {[...filteredReceipts].reverse().map((doc, i) => (
              /* ----------------------------- Receipt Meta Data ----------------------------- */
              <div key={i} className="receipt-card">
                <div className="receipt-content col-sb-c">
                  <div className="receipt-title row-c-c">
                    <h2>{doc.phoneNumber === "" ? "No Number" : doc.phoneNumber}</h2>
                  </div>
                  <div className="receipt-main-content col-c-c">
                    <div className="receipt-property row-sb-c">
                      <p>Paid:</p>
                      <p>{doc.paid ? <b>YES</b> : <b>NO</b>}</p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Order Type:</p>
                      <p>{doc.orderType}</p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Order Time:</p>
                      <p>{doc.time[0]}</p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Wait Time:</p>
                      <p>{doc.waitTime.displayName}</p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Finish Time:</p>
                      <p>{doc.finishTime}</p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Date:</p>
                      <p>{doc.date}</p>
                    </div>
                    {doc.orderType === "DELIVERY" && (
                      <div className="receipt-property row-sb-c">
                        <p>Delivery:</p>
                        <p>{doc.address}</p>
                      </div>
                    )}
                    <div className="receipt-property row-sb-c">
                      <p>Note:</p>
                      <p>{doc.note}</p>
                    </div>

                    {/* Full Receipt + Items */}
                    {showFullReceipt && (
                      <div className="items-property receipt-property col-c-fs">
                        <p>Items:</p>
                        <div className="items-container col-c-fe">
                          {doc.items.map((item, j) => (
                            <div key={j} className="item-container row-sb-c">
                              <p>
                                <b>{item.name}</b>
                              </p>
                              <p>
                                <b>${item.price.toFixed(2)}</b>
                              </p>
                              {/* Selection Choices */}
                              {item.selectionList.itemLimit !== 0 && (
                                <div className="selection-list-container row-fs-c">
                                  {item.selectionList.items.map((selectionItem, key3) => (
                                    <p key={key3} className="selection-list">
                                      {selectionItem}
                                    </p>
                                  ))}
                                </div>
                              )}
                              {/* Modifiers */}
                              {item.modifiers.length !== 0 && (
                                <div className="modifier-list-container col-c-fs">
                                  {item.modifiers.map((modifierItem, key4) => (
                                    <div key={key4} className="modifier-item-container row-sb-c">
                                      <p className="modifier-list">
                                        {"|-->"}
                                        {modifierItem.name}
                                      </p>
                                      $
                                      {item.flatFeeModifierOn &&
                                      (modifierItem.type === "No Add" || modifierItem.type === "Add")
                                        ? "0.00"
                                        : `${modifierItem.price.toFixed(2)}`}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="receipt-property sub-total row-sb-c">
                      <p>Sub-Total:</p>
                      <p>
                        <b>${doc.subTotal.toFixed(2)}</b>
                      </p>
                    </div>
                    {doc.discounted && doc.beforeTaxDiscount !== 0 && (
                      <div className="receipt-property row-sb-c">
                        <p>Discount:</p>
                        <p>
                          <b>-${doc.beforeTaxDiscount.toFixed(2)}</b>
                        </p>
                      </div>
                    )}
                    <div className="receipt-property row-sb-c">
                      <p>Taxes:</p>
                      <p>
                        <b>${doc.tax.toFixed(2)}</b>
                      </p>
                    </div>
                    {doc.discounted && doc.afterTaxDiscount !== 0 && (
                      <div className="receipt-property row-sb-c">
                        <p>Discount:</p>
                        <p>
                          <b>-${doc.afterTaxDiscount.toFixed(2)}</b>
                        </p>
                      </div>
                    )}
                    {doc.orderType === "DELIVERY" && (
                      <div className="receipt-property row-sb-c">
                        <p>Delivery Fee</p>
                        <p>
                          <b>${doc.deliveryFee.toFixed(2)}</b>
                        </p>
                      </div>
                    )}
                    <div className="receipt-property row-sb-c">
                      <p>Total:</p>
                      <p>
                        <b>${doc.total.toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                  <div className="receipt-actions-container row-c-c">
                    <div
                      className="receipt-actions row-c-c"
                      onClick={() => {
                        dispatch(setOrderManagement(["setReprintOrder", doc]));
                        navigate("/orders");
                      }}
                    >
                      <button className="reprint-order">Reprint Order</button>
                    </div>
                    <div className="receipt-actions row-c-c">
                      <button
                        className="delete-order"
                        onClick={(e) => {
                          deleteOrder(e, doc.id);
                        }}
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Receipts;
