import React from "react";
import { useLogout } from "../../hooks/useLogout";

function Logout() {
  const { logout } = useLogout();

  return (
    <div className="logout">
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;
