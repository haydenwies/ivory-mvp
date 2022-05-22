import React, { useState } from "react";
import { WhiteLogo } from "../../Assets/Images";
import "../login/login.css";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="login col-fs-c">
      <div className="login-box-shadow">
        <div className="content-container col-sb-c">
          {/* Ivory Logo Header */}
          <div className="logo-container col-c-c">
            <img src={WhiteLogo} alt="Ivory POS Logo" />
            <h6>The future of OMS systems</h6>
          </div>
          {/* Login Form */}
          <form className="login-container col-fe-c" onSubmit={handleSubmit}>
            <h3>Lets Order.</h3>
            <input
              className="login-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
