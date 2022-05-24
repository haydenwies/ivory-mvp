import React from "react";
import "./items.css";
import { Trash, Info, Swap, Draw, Undo, Search, Elipse, Custom } from "../../Assets/Images";
function Items() {
  return (
    <div className="items">
      <div className="selection">
        {Array(20).fill("HI").map(() => (
          <div className="selection-item row-c-c">hi</div>
        ))}
      </div>
      <div className="category">
        {Array(20).fill("HI").map(() => (
          <div className="category-item row-c-c">hi</div>
        ))}
      </div>
      {/* ----------------------------- Item Options ----------------------------- */}
      <div className="item-options row-sb-c">
        <div className="trash">
          <img src={Trash} alt="" />
        </div>
        <div className="main-options row-se-c">
          <div className="info">
            <img src={Info} alt="" />
          </div>
          <div className="custom">
            <img src={Custom} alt="" />
          </div>
          <div className="undo">
            <img src={Undo} alt="" />
          </div>
          <div className="search">
            <img src={Search} alt="" />
          </div>
        </div>
        <div className="elipse">
          <img src={Elipse} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Items;
