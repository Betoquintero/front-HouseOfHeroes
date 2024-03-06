import React from "react";

export default function CustomGrid({ universe, children }) {
  return (
    <div className="grid-container">
      <div
        className={
          universe === "DC"
            ? "item-1 backgroundImgDc"
            : "item-1 backgroundImgMarvel"
        }
      ></div>
      <div
        className={universe === "DC" ? "item-2 gridDc" : "item-2 gridMarvel"}
      ></div>
      <div className="item item-3">
      {children}
      </div>
      <div
        className={universe === "DC" ? "item-4 gridDc" : "item-4 gridMarvel"}
      ></div>
    </div>
  );
}
