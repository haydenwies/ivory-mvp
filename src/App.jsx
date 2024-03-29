import Login from "./views/login/Login";
import "./globalStyles/app.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./views/logout/Logout";
import Order from "./views/order/Order";
import Nav from "./views/nav/Nav";
import Settings from "./views/settings/Settings";
import ViewOrders from "./views/view_orders/ViewOrders";
import { useDispatch, useSelector } from "react-redux";
import NavTab from "./components/navTab/NavTab";
import { useEffect } from "react";
import { setOrderManagement } from "./redux/orderInfo";
import { setInstancesDefaultSettings } from "./redux/functionality";
import { useDeleteDocs } from "./hooks/useDeleteDocs";
import Loading from "./components/loading/Loading";
import Checkout from "./views/checkout/Checkout";
import { useGetPrinters } from "./hooks/useGetPrinters";
import { useGetReceipts } from "./hooks/useGetReceipts";
import { useState } from "react";
function App() {
  // const { auth, user } = useAuthContext();
  const { navOn } = useSelector(({ functionality }) => functionality.instances[functionality.indexInstance]);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { receiptsLoaded } = useGetReceipts("orders");
  const { printersLoaded } = useGetPrinters("orders");
  const { deleteOutDatedReceipts } = useDeleteDocs();

  useEffect(() => {
    dispatch(setOrderManagement(["SAVE_DEFAULT_ORDER"]));
    dispatch(setInstancesDefaultSettings(["SAVE_DEFAULT_FUNCTIONALITY"]));
  }, []);

  useEffect(() => {
    if (receiptsLoaded && printersLoaded) {
      setLoaded(true);
      deleteOutDatedReceipts();
    }
  }, [receiptsLoaded, printersLoaded]);

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
                {loaded ? (
                  <>
                    <Order />
                    <NavTab />
                  </>
                ) : (
                  <Loading pageName={"Order Page"} />
                )}
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
            path="/checkout"
            element={
              <PrivateRoute>
                {navOn && <Nav />}
                <NavTab />
                <Checkout />
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
