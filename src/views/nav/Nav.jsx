import React from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { Order, Saved, Settings, Logout, XIcon } from "../../Assets/Images";
import { useLogout } from "../../hooks/useLogout";
function Nav() {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = () => {
    navigate("/login");
    logout();
  };
  return (
    <div className="nav">
      {/* ----------------------------- Nav Panel ----------------------------- */}
      <div className="nav-panel col-fs-c">
        <div className="close-nav">
          <img src={XIcon} alt="Close Nav" />
        </div>
        <div className="user-icon row-c-c">
          <h1>KY</h1>
        </div>
        <div className="nav-links col-c-fs">
          <div className="nav-link row-fs-c" onClick={() => navigate("/order")}>
            <img src={Order} alt="" />
            <p>Order</p>
          </div>
          <div className="nav-link row-fs-c" onClick={() => navigate("/view-orders")}>
            <img src={Saved} alt="Saved Receipts" className="saved" />
            <p>View Orders</p>
          </div>
          <div className="nav-link row-fs-c" onClick={() => navigate("/settings")}>
            <img src={Settings} alt="Settings" className="settings" />
            <p>Settings</p>
          </div>
        </div>
        <div className="logout-link row-fs-c" onClick={handleLogout}>
          <img src={Logout} alt="Logout Icon" className="logout" />
          <p>Logout</p>
        </div>
      </div>
      {/* ----------------------------- Shadow Panel ----------------------------- */}
      <div className="shadow-panel">
        <div className="blur"></div>
        <div className="background-blur"></div>
        <div className="company-name col-c-c">
          <h1>Flipping Mikes</h1>
          <h4>Order Management System</h4>
        </div>
      </div>
    </div>
  );
}

export default Nav;