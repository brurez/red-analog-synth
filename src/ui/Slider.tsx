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
  public render() {
    const { value, minValue, maxValue } = this.props;
    const ratio = (value * 79) / (maxValue - minValue);
    return (
      <div className="slider">
        <div className="slider-container">
          <div
            className="slider-foreground"
            style={{ top: `calc(${ratio}%)` }}
            draggable={true}
            onDragStart={e => this.handleDragStart(e)}
            onDrag={e => this.handleDrag(e)}
            onDragEnd={e => this.handleDrag(e)}
          >
            <div className="touch" />
            <img src={foreground} />
          </div>
        </div>
        <div className="slider-meter" />
      </div>
    );
  }

  private handleDragStart(e) {
    const img = new Image();
    const { clientY } = e;
    e.dataTransfer.setDragImage(img, 10, 10);
    this.setState({ clientY });
  }

  private handleDrag(e) {
    const { clientY } = e;
    const { maxValue: max, minValue: min, value } = this.props;

    if (clientY !== this.state.clientY) {
      const delta = clientY - this.state.clientY;
      let result = value + (delta * (max - min));
      result = result > max ? max : result;
      result = result < min ? min : result;

      this.props.onChange(result);
      this.setState({ clientY });
    }
  }
}

export default Slider;
