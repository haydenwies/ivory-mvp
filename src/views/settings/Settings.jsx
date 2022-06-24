import React from "react";
import MyAccount from "./MyAccount";

import "./settings.css";
import PrinterSetup from "./PrinterSetup";
import MenuCustomization from "./MenuCustomization";
import SecuritySettings from "./SecuritySettings";
import { Routes, Route, Link } from "react-router-dom";

function Settings() {

  return (
    <div className="settings row-c-fs">
      <div className="side-nav col-c-fs">
        <div className="side-nav-content col-c-fs">
          <h1>Settings</h1>
          <Link
            to={'/settings/account'}
            style={{ textDecoration: 'none' }}
          >
            <h4>My Account</h4>
          </Link>
          <Link
            to={'/settings/printers'}
            style={{ textDecoration: 'none' }}
          >
            <h4>Printer Setup</h4>
          </Link>
          <Link
            to={'/settings/menu'}
            style={{ textDecoration: 'none' }}
          >
            <h4>Menu Customization</h4>
          </Link>
          <Link
            to={'/settings/security'}
            style={{ textDecoration: 'none' }}
          >
            <h4>Security Settings</h4>
          </Link>
        </div>
      </div>
      <div className="settings-features row-c-c">
        <Routes>
          {/* <Route path="/" element={<Navigate to={`${currentPath}/account`} />} /> */}
          <Route path="/account" element={<MyAccount />} />
          <Route path="/printers" element={<PrinterSetup />} />
          <Route path="/menu" element={<MenuCustomization />} />
          <Route path="/security" element={<SecuritySettings />} />
        </Routes>
      </div>
    </div>
  );
}

export default Settings;
