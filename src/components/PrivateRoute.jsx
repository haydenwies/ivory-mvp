import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function PrivateRoute({ children }) {
  const { user, authIsReady } = useAuthContext();
  
  if (!authIsReady) {
    return <div style={{ color: "white" }}>Loading</div>;
  } else if (!user) {
    return <Navigate to="/login" />;
  }

  return children

}

export default PrivateRoute;
