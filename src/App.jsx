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
function App() {
  // const { auth, user } = useAuthContext();
  const { navOn } = useSelector(({functionality}) => functionality.instances[functionality.indexInstance]);
  // document.addEventListener("contextmenu", (e) => e.preventDefault());
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
            path="/settings"
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
