import React from "react";
import "./backgroundExit.css";
function BackgroundExit({ exitPage, bgColour}) {
  return <div className="background-exit" onClick={exitPage} style={{background: bgColour}}></div>;
}

export default BackgroundExit;
