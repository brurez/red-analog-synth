import cs from "classnames";
import * as React from "react";

import "./Select.css";

const Pressed = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 7.4083333 7.4072428"
    id="svg12484"
  >
    <g id="layer1" transform="translate(-155.97 -111.699)">
      <g
        id="g12476"
        transform="matrix(.2727 0 0 -.2727 81.039 439.91)"
        strokeWidth="1.294"
      >
        <g id="g12468" transform="translate(301.935 1189.951)">
          <path
            d="m 0,0 c 0,-7.5 -6.083,-13.58 -13.584,-13.58 -7.5,0 -13.582,6.08 -13.582,13.58 0,7.503 6.082,13.582 13.582,13.582 C -6.083,13.582 0,7.503 0,0"
            id="path12466"
            fill="#212221"
          />
        </g>
        <circle
          transform="scale(1 -1)"
          r="11.277"
          cy="-1189.238"
          cx="288.352"
          id="circle12472"
          fill="#676967"
        />
        <circle
          id="circle12474"
          cx="288.352"
          cy="-1189.952"
          r="11.277"
          transform="scale(1 -1)"
          fill="#141514"
        />
      </g>
    </g>
  </svg>
);

const Unpressed = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 7.4083333 7.4072428"
    id="svg12484"
  >
    <g id="layer1" transform="translate(-87.434 -104.64)">
      <g
        transform="matrix(.2727 0 0 -.2727 12.503 432.85)"
        id="g12430"
        strokeWidth="1.294"
      >
        <g transform="translate(301.935 1189.951)" id="g5959-5">
          <path
            id="path5961-3"
            d="m 0,0 c 0,-7.5 -6.083,-13.58 -13.584,-13.58 -7.5,0 -13.582,6.08 -13.582,13.58 0,7.503 6.082,13.582 13.582,13.582 C -6.083,13.582 0,7.503 0,0"
            fill="#212221"
          />
        </g>
        <circle
          id="circle12436"
          cx="288.352"
          cy="-1190.659"
          r="11.277"
          transform="scale(1 -1)"
          fill="#676967"
        />
        <circle
          transform="scale(1 -1)"
          r="11.277"
          cy="-1189.952"
          cx="288.352"
          id="path12411"
          fill="#2b2d2b"
        />
      </g>
    </g>
  </svg>
);

const LightSelect = props => {
  const { items, selected } = props;
  return (
    <div className="light-select">
      {items.map((item, index) => (
        <div className="item" key={index}>
          <img src={item} width={20} />
          <div className={cs("light", { on: selected === index })} />
        </div>
      ))}
    </div>
  );
};

interface IProps {
  size: number;
  value: number;
  items: string[]
  onChange: any;
}

interface IState {
  pressed: boolean;
  selected: number;
}

class Select extends React.Component<IProps, IState> {
  public state: Readonly<IState> = {
    pressed: false,
    selected: 0
  };

  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <div className="choice">
        {this.renderButton()}
        <LightSelect items={this.props.items} selected={this.props.value} />
      </div>
    );
  }

  private renderButton() {
    const { pressed } = this.state;
    const { size } = this.props;
    const Button = pressed ? Pressed : Unpressed;
    return (
      <div
        className="button"
        onMouseDown={e => this.handleMouseDown(e)}
        onMouseUp={() => this.setState({ pressed: false })}
      >
        <Button size={size} />
      </div>
    );
  }

  private handleMouseDown(e) {
    const { value, items } = this.props;
    const sel = value === items.length - 1 ? 0 : value + 1;
    this.setState({ pressed: true });
    this.props.onChange(sel);
  }
}

export default Select;
