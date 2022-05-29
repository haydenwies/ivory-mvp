import React from "react";
import "./navTab.css";
import { useDispatch } from "react-redux";
import { setInstances } from "../../redux/functionality";
import { NavigationTab } from "../../Assets/Images";

function NavTab() {
  const dispatch = useDispatch();
  return (
    <button className="nav-tab" onClick={() => dispatch(setInstances(["setNavOn", true]))}>
      <img src={NavigationTab} alt="Navigation Tab" />
    </button>
  );
}

export default NavTab;
