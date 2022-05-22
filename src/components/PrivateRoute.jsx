import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function PrivateRoute({ children }) {
  const { user, authIsReady } = useAuthContext();
  
  if (!authIsReady) {
    return <div style={{ color: "white" }}>Loading</div>;
  } else {
    return user ? children : <Navigate to="/" />;
  }
}

export default PrivateRoute;
