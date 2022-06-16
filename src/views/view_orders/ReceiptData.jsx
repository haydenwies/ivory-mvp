import { useEffect, useState } from "react";
import { Info, Search } from "../../Assets/Images";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import "./viewOrder.css";
import { setOrderManagement } from "../../redux/orderInfo";
import { useNavigate } from "react-router-dom";
import { filterPhoneNum } from "../../utils/filterUtils";

function Receipts() {
  // Modal data
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  // Show full receipt toggle data
  const [showFullReceipt, setShowFullReceipt] = useState(false);

  // Receipt fetch data
  const timezone = "America/Toronto";
  const date = new Date().toLocaleString("sv", { timeZone: timezone }).slice(0, 10);
  const [data, setData] = useState();

  //Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToggleModal = (e) => {
    if (modalType === e.target.innerHTML && showModal === true) {
      setShowModal(false);
    } else {
      setModalType(e.target.innerHTML);
      setShowModal(true);
    }
  };

  const onToggleFullReceipt = (e) => {
    e.preventDefault();
    setShowFullReceipt(!showFullReceipt);
  };

  const filterMethod = (entry, data) => {
    setFilteredData(filterPhoneNum(entry, data));
    console.log(filterPhoneNum);
  };
  // Fetch data when the page loads
  useEffect(() => {
    const getData = async () => {
      // Get documents with correct date
      const q = query(collection(db, "orders"), where("date", "==", date));
      const snapshot = await getDocs(q);
      // Loop through data and add to array
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      // Set data as array once loop finishes
      setData(docs);
      setFilteredData(docs);
    };

    getData();
  }, []);

  return (
    <div className="receipt-data">
      {/* ----------------------------- Display Receipt Options ----------------------------- */}
      <div className="view-options row-sb-c">
        <div className="search-receipt row-c-c">
          <img src={Search} alt="" />{" "}
          <input
            type="text"
            placeholder="Search by phone number"
            onChange={(e) => {
              filterMethod(e.target.value, data);
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
          <div className="sort">
            <h5 onClick={onToggleModal}>Sort</h5>
          </div>
          <div className="filter">
            <h5 onClick={onToggleModal}>Filter</h5>
          </div>
        </div>
        {/* ---------- Options Modal ---------- */}
        {showModal && (
          <div className="display-options-modal col-c-fs">
            <h2>{modalType} Options</h2>
            {["Time", "Date", "Name"].map((property) => (
              <div key={property}>
                <button className="display-option">{property}</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ----------------------------- Receipts ----------------------------- */}
      {data && (
        <div className="receipts">
          <div className="receipts-container">
            {filteredData.map((doc, key) => (
              /* ----------------------------- Receipt Meta Data ----------------------------- */
              <div key={key} className="receipt-card">
                {true && (
                  <div className="receipt-content">
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

                      {/* Full Receipt + Items */}
                      {showFullReceipt && (
                        <>
                          <div className="items-property receipt-property col-c-fs">
                            <p>Items:</p>
                            <div className="items-container col-c-fe">
                              {doc.items.map((item, key) => (
                                <div key={key} className="item-container row-sb-c">
                                  <p>
                                    <b>{item.name}</b>
                                  </p>
                                  <p>
                                    <b>${item.price.toFixed(2)}</b>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="receipt-property sub-total row-sb-c">
                        <p>Sub-Total:</p>
                        <p>
                          <b>${doc.subTotal.toFixed(2)}</b>
                        </p>
                      </div>
                      {doc.discounted &&
                        doc.beforeTaxDiscount !==
                          0(
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
                      {doc.discounted &&
                        doc.afterTaxDiscount !==
                          0(
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
                            <b>-${doc.deliveryFee.toFixed(2)}</b>
                          </p>
                        </div>
                      )}
                      <div className="receipt-property row-sb-c">
                        <p>Total:</p>
                        <p>
                          <b>${doc.total.toFixed(2)}</b>
                        </p>
                      </div>
                      <div
                        className="receipt-actions row-c-c"
                        onClick={() => {
                          dispatch(setOrderManagement(["setReprintOrder", doc]));
                          navigate("/orders");
                        }}
                      >
                        <button>Reprint Bill</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Receipts;
