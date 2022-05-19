import { WhiteLogo } from "../../Assets/Images";
import "../login/login.css";

export default function Login() {
  return (
    <div className="login col-fs-c">
      <div className="login-box-shadow">
        <div className="content-container col-sb-c">
          {/* Ivory Logo Header */}
          <div className="logo-container col-c-c">
            <img src={WhiteLogo} alt="Ivory POS Logo" />
            <h6>The future of POS systems</h6>
          </div>
          {/* Login Form */}
          <form className="login-container col-fe-c">
            <h3>Lets Order.</h3>
            <input className="login-email" type="email" placeholder="Email" />
            <input className="login-password" type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
