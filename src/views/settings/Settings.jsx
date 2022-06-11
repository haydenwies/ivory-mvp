import React from "react";
import { NavigationIcon } from "../../Assets/Images";
import MyAccount from "./MyAccount";

import "./settings.css";
import PrinterSetup from "./PrinterSetup";
import MenuCustomization from "./MenuCustomization";
import SecuritySettings from "./SecuritySettings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function Settings() {
  return (
    <div className="settings row-c-fs">
      <div className="side-nav col-c-fs">
        <div className="side-nav-content col-c-fs">
          <h1>Settings</h1>
          <h4>My Account</h4>
          <h4>Printer Setup</h4>
          <h4>Menu Customization</h4>
          <h4>Security Settings</h4>
        </div>
      </div>
      <div className="settings-features row-c-c">
        <Route path=""/>
        {false && <MyAccount />}
        {false && <PrinterSetup />}
        {false && <MenuCustomization />}
        <SecuritySettings />
      </div>
    </div>
  );
}

export default Settings;
