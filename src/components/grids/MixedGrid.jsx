import React from "react";

export default function MixedGrid({ children }) {
  return (
    <div className="grid-container">
      <div className="item item-1 backgroundImgHome"></div>
      <div className="item item-2 gridDc"></div>
      <div className="item item-3">{children}</div>
      <div className="item item-4 gridMarvel"></div>
    </div>
  );
}
