import * as React from "react";
import "./SliderGroup.css";

const SliderGroup = ({ name, children }) => (
  <div className="slider-group">
    <div className="name">{name}</div>
    {children}
  </div>
);

export default SliderGroup;
