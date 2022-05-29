import React from "react";
import "./securitySettings.css"
function SecuritySettings() {
  return (
    <div className="security-settings col-c-fs">
      <h1>Security Settings</h1>
      <div className="account-settings col-c-fs">
        <h3>Account</h3>
        <div className="account-actions row-fs-c">
          <button className="add-user">Add User</button>
          <button className="change-password">Change Password</button>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;
