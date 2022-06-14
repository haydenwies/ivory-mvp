import React from "react";
import { XIcon, AddIcon } from "../../Assets/Images";
import "./menuCustomization.css";

function MenuCustomization() {

  return (
      <div className="menu-customization">
        <h1>Menu Customization</h1>
        <div className="menu-items ">
          {Array(5)
            .fill("Chicken Fried Rice")
            .map((item) => (
              <div className="menu-item col-c-c">
                <button className="delete-menu-item">
                  <img src={XIcon} alt="" />
                </button>
                <h3>Name</h3>
                <p>Price</p>
              </div>
            ))}
        </div>
        <button className="add-menu-item row-c-c">
          <img src={AddIcon} alt="" />
        </button>
      </div>
    
  );
}

export default MenuCustomization;
