import { useEffect, useState } from "react";
import { Search , XIcon } from "../../Assets/Images";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./viewOrder.css";
function Receipts() {
  // Modal data
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Show full receipt toggle data
  const [showFullReceipt, setShowFullReceipt] = useState(false);

  // Receipt fetch data
  const timezone = "America/Toronto";
  const date = new Date().toLocaleString('sv', {timeZone: timezone}).slice(0, 10);
  const [data, setData] = useState();

  const onToggleModal = (e) => {
    if (e.target.alt === "Close modal") {
      setShowModal(false)
    } else if (modalType === e.target.innerHTML && showModal === true) {
      setShowModal(false)
    } else {
      setModalType(e.target.innerHTML);
      setShowModal(true)
    };
  };

  const onModalClick = (e) => {
    e.preventDefault();
    if (modalType === "Filter") {
      // Handle different filter outcomes

    } else if (modalType === "Sort") {
      // Handle sort outcomes
      // Retrieve method of sort from innerHTML (ex. "time") and make compatible with database conventions
      const method = e.target.innerHTML.toLowerCase()
      // Sort and return data
      setData(data.sort((a, b) => {
        return a[method].localeCompare(b[method])
      }))
    }
    // Close modal to update view
    setShowModal(false)
  }

  const onToggleFullReceipt = (e) => {
    e.preventDefault();
    setShowFullReceipt(!showFullReceipt);
  };

  // Fetch data when the page loads
  useEffect(() => {

    const getData = async () => {
      // Get documents with correct date
      const q = query(collection(db, "orders"), where("date", "==", date));
      const snapshot = await getDocs(q);
      // Loop through data and add to array
      const docs = []
      snapshot.forEach((doc) => {
        docs.push(doc.data())
      });
      // Set data as array once loop finishes
      setData(docs);
    };

    getData();
    
  }, [date]);

  return (
    <div className="receipt-data">
      {/* ----------------------------- Display Receipt Options ----------------------------- */}
      <div className="view-options row-sb-c">
        <div className="search-receipt row-c-c">
          <img src={Search} alt="" /> <input type="text" placeholder="Search" />
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
            <button 
              className="display-close"
              onClick={onToggleModal}
            >
              <img src={XIcon} alt="Close modal" />
            </button>
            <h2>{modalType} Options</h2>
            {["Time", "Name"].map((property) => (
              <div key={property}>
                <button 
                  className="display-option"
                  onClick={onModalClick}
                >
                  {property}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ----------------------------- Receipts ----------------------------- */}
      {data && <div className="receipts">
        <div className="receipts-container">
          {data
            .map((doc, key) => (
              /* ----------------------------- Receipt Meta Data ----------------------------- */
              <div key={key} className="receipt-card">
                {false && (
                  <div className="receipt-content">
                    <h2>{doc.phoneNumber}</h2>
                    <h3>{doc.name}</h3>
                    <h4>{doc.orderType}</h4>
                  </div>
                )}

                {/* ----------------------------- Receipt Full Data ----------------------------- */}
                {true && (
                  <div className="receipt-content receipt-full-content col-c-fs">
                    <div className="receipt-title row-c-c">
                      <h2>{doc.phoneNumber}</h2>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Paid:</p>
                      <p>
                        {doc.paid && (
                          <b>TRUE</b>
                        )}
                        {!doc.paid && (
                          <b>FALSE</b>
                        )}
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Name:</p>
                      <p>
                        <b>{doc.name}</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Order Type:</p>
                      <p>
                        <b>{doc.orderType}</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Order Time:</p>
                      <p>
                        <b>{doc.time}</b>
                      </p>
                    </div>
                    <div className="receipt-property row-sb-c">
                      <p>Wait Time:</p>
                      <p>
                        <b>{doc.waitTime.displayName}</b>
                      </p>
                    </div>
                    
                    {showFullReceipt && (
                      <>
                        <div className="items-property receipt-property col-c-fs">
                          <p>Items:</p>
                          <div className="items-container col-c-fe">
                            {doc.items
                              .map((item, key) => (
                                <div key={key} className="item-container row-sb-c">
                                  <p>
                                    <b>{item.name}</b>
                                  </p>
                                  <p>
                                    <b>${item.price}</b>
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="receipt-property row-sb-c">
                          <p>Sub-Total:</p>
                          <p>
                            <b>{doc.subTotal}</b>
                          </p>
                        </div>
                        <div className="receipt-property row-sb-c">
                          <p>Taxes:</p>
                          <p>
                            <b>{doc.tax}</b>
                          </p>
                        </div>
                        <div className="receipt-property row-sb-c">
                          <p>Total:</p>
                          <p>
                            <b>{doc.total}</b>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>}
    </div>
  );
}

export default Receipts;
