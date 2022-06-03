import React from "react";
import { XIcon } from "../../Assets/Images";
import "./exitTab.css";
function ExitTab({ styles, closePage }) {
  return (
    <button className="exit-tab row-c-c" onClick={closePage}>
      <img src={XIcon} alt="exit-tab" style={styles} />
    </button>
  );
}

export default ExitTab;
