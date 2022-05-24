import Login from "./views/login/Login";
import "./globalStyles/app.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./views/logout/Logout";
import Order from "./views/order/Order";
import Nav from "./views/nav/Nav";
import ViewOrders from "./views/view_orders/ViewOrders";
function App() {
  const { auth, user } = useAuthContext();

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
                {/* <Nav /> */}
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-orders"
            element={
              <PrivateRoute>
                {false && <Nav />}
                <ViewOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Navigate to="/login"/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
