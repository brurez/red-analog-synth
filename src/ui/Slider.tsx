import * as React from "react";
import foreground from "../images/dx7-slider-foreground.svg";
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
    clientY: 0,
  };
  public render() {
    const { value, minValue, maxValue } = this.props;
    const ratio = (value * 79) / (maxValue - minValue);
    return (
      <div className="slider">
        <div
          className="slider-container"
          onMouseMove={e => this.handleMouseMove(e)}
        >
          <div className="slider-foreground" style={{ top: `calc(${ratio}%)` }}>
            <div
              className="touch"
              draggable={false}
            />
            <img src={foreground} />
          </div>
        </div>
        <div className="slider-meter" />
      </div>
    );
  }

  private handleMouseMove(e) {
    const { clientY, buttons } = e;
    const { maxValue: max, minValue: min, value } = this.props;

    if (buttons && clientY !== this.state.clientY) {
      const delta = (clientY - this.state.clientY);
      let result = value + delta * (max - min) / 50;
      result = result > max ? max : result;
      result = result < min ? min : result;

      this.props.onChange(result);
      this.setState({ clientY });
    }
  }
}

export default Slider;
