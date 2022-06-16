import Login from "./views/login/Login";
import "./globalStyles/app.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./views/logout/Logout";
import Order from "./views/order/Order";
import Nav from "./views/nav/Nav";
import Settings from "./views/settings/Settings";
import ViewOrders from "./views/view_orders/ViewOrders";
import { useDispatch, useSelector } from "react-redux";
import NavTab from "./components/navTab/NavTab";
import { useEffect } from "react";
import { setOrderManagement, setOrderOptions } from "./redux/orderInfo";
import { setInstancesDefaultSettings } from "./redux/functionality";
import { doc, collection, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/config";
function App() {
  // const { auth, user } = useAuthContext();
  const { navOn } = useSelector(({ functionality }) => functionality.instances[functionality.indexInstance]);
  const dispatch = useDispatch();

  const getPrinterInfo = async () => {
    // Get documents with correct date
    const printInfoRef = doc(db, "general", "printerInfo");
    onSnapshot(printInfoRef, (printerDoc) => {
      let printersInfo = [];
      if (printerDoc.exists()) {
        let printerData = printerDoc.data().printers;
        for (let i = 0; i < printerData.length; i++) {
          printersInfo.push(printerData[i]);
        }
      }
      console.log(printersInfo);
      dispatch(setOrderOptions(["setPrinterOptions", printersInfo])); //Stores the printer options in redux
    });
  };

  useEffect(() => {
    dispatch(setOrderManagement(["SAVE_DEFAULT_ORDER"]));
    dispatch(setInstancesDefaultSettings(["SAVE_DEFAULT_FUNCTIONALITY"]));
    getPrinterInfo();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/order" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/order"
            element={
              <PrivateRoute>
                {navOn && <Nav />}
                <NavTab />
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-orders"
            element={
              <PrivateRoute>
                {navOn && <Nav />}
                <NavTab />
                <ViewOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings/*"
            element={
              <PrivateRoute>
                {navOn && <Nav />}
                <NavTab />
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Navigate to="/order" />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
