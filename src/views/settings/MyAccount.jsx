import React from "react";
import "./myAccount.css"
function MyAccount() {
  return (
    <div className="my-account col-c-fs">

      <h1>MyAccount</h1>
      <div className="account-logo row-c-c">
          <h2>KY</h2>
      </div>
      <div className="account-info col-c-fs">
          <div className="account-property row-sb-c">
              <h5>Name:</h5>
              <h4>Kevin Yu</h4>
          </div>
          <div className="account-property row-sb-c">
              <h5>Email:</h5>
              <h4>yu.kevin2002@gmail.com</h4>
          </div>
          <div className="account-property row-sb-c">
              <h5>Account Type:</h5>
              <h4>Employee</h4>
          </div>
      </div>
    </div>
  );
}

export default MyAccount;
