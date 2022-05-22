import { useState } from "react";
import { auth } from "../firebase/config.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useAuthContext} from "./useAuthContext"
import {useNavigate} from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {dispatch} = useAuthContext();

  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        dispatch({type: "LOGIN", payload: res.user})
        navigate("/order");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return { error, login };
};
