import { useEffect, useState } from "react";
import { Search , XIcon } from "../../Assets/Images";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./viewOrder.css";

function Receipts({ data }) {
  // Toggle variables
  const [showModal, setShowModal] = useState(false);
  const [showFullReceipt, setShowFullReceipt] = useState(false);

  // // Receipt fetch data
  // const timezone = "America/Toronto";
  // const date = new Date().toLocaleString('sv', {timeZone: timezone}).slice(0, 10);

  // data will never change
  // const [data, setData] = useState();
  // displayData will change based on search results
  const [displayData, setDisplayData] = useState();

  // Search data
  const [search, setSearch] = useState("");

  const onToggleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const onModalClick = (e) => {
    e.preventDefault();
    // Handle sort outcomes
    // Retrieve method of sort from innerHTML (ex. "time") and make compatible with database conventions
    const method = e.target.innerHTML.toLowerCase()
    // Sort and return data
    setDisplayData(displayData.sort((a, b) => {
      console.log(method);
      return a[method].localeCompare(b[method])
    }))
    // Close modal to update view
    setShowModal(false)
  }

  const onToggleFullReceipt = (e) => {
    e.preventDefault();
    setShowFullReceipt(!showFullReceipt);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setDisplayData(data)
    } else {
      setDisplayData(data.filter(x => x.phoneNumber.replace("-", "").indexOf(e.target.value) !== -1))
    }
  }

  // Fetch data when the page loads
  useEffect(() => {
    setDisplayData(data)
    // const getData = async () => {
    //   // Get documents with correct date
    //   const q = query(collection(db, "orders"), where("date", "==", date));
    //   const snapshot = await getDocs(q);
    //   // Loop through data and add to array
    //   const docs = []
    //   snapshot.forEach((doc) => {
    //     docs.push(doc.data())
    //   });
    //   // Set data as array once loop finishes
    //   setData(docs);
    //   setDisplayData(docs)
    // };

    // getData();
    
  }, []);

  return (
    <div className="receipt-data">
      {/* ----------------------------- Display Receipt Options ----------------------------- */}
      <div className="view-options row-sb-c">
        <div className="search-receipt row-c-c">
          <img src={Search} alt="" /> 
          <input 
            type="text" 
            placeholder="Search" 
            value={search}
            onChange={onSearch}
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
          {/* <div className="filter">
            <h5 onClick={onToggleModal}>Filter</h5>
          </div> */}
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
            <h2>Sort Options</h2>
            {["Time"].map((property) => (
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
      {displayData && <div className="receipts">
        <div className="receipts-container">
          {displayData.map((doc, key) => (
            /* ----------------------------- Receipt Full Data ----------------------------- */
            <div key={key} className="receipt-card">
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
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}

export default Receipts;
