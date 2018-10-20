import * as React from "react";

import "./Slider.css";

interface IProps {
  minValue: number;
  maxValue: number;
  value: number;
  onChange: any;
}

interface IState {
  clientY: number;
}

class Slider extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    clientY: 0
  };

  public render() {
    const { value, minValue, maxValue, onChange } = this.props;
    return (
      <div className="slider">
        <div className="slider-container">
          <input
            className="control"
            type="range"
            max={maxValue}
            min={minValue}
            value={value}
            step={0.1}
            onChange={({ target }) => {
              onChange(Number.parseFloat(target.value));
            }}
          />
        </div>
      </div>
    );
  }
}

export default Slider;
