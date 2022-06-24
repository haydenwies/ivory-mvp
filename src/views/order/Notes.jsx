import React from "react";
import { setOrder } from "../../redux/orderInfo";
import { useDispatch, useSelector } from "react-redux";
import "./notes.css";
function Notes() {
  const dispatch = useDispatch();
  const { note } = useSelector(({ orderInfo }) => orderInfo.order);
  return (
    <div className="notes input-info row-c-c">
      <textarea
        value={note}
        type="textarea"
        placeholder="Notes"
        spellCheck={false}
        onChange={(e) => {
          dispatch(setOrder(["setNote", e.target.value]));
        }}
      />
    </div>
  );
}

export default Notes;
