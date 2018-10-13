import * as React from "react";
import "./Knob.css";

interface IProps {
  label: string;
  minValue: number;
  maxValue: number;
  value: number;
  onChange: any;
}

interface IState {
  clientY: number;
}

class Knob extends React.Component<IProps, IState> {
  private readonly range: number;

  constructor(props) {
    super(props);

    this.range = 300; // degrees

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  public render() {
    const { value } = this.props;

    const styles = {
      transform: `rotate(${this.angle()}deg)`
    };

    return (
      <div className="knob">
        <div className="label">{this.props.label}</div>
        <div
          className="drag-btn"
          draggable={true}
          onDragStart={this.handleDragStart}
          onDrag={this.handleDrag}
          onDragEnd={this.handleDrag}
        >
          <svg
            style={styles}
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54.002"
            viewBox="0 0 14.2875 14.288095"
            id="svg16908"
          >
            <defs id="defs16902">
              <clipPath id="clipPath6367">
                <path d="M 0,3193 H 2089 V 0 H 0 Z" id="path6365" />
              </clipPath>
            </defs>
            <g id="layer1" transform="translate(-230.096 -118.47)">
              <g
                id="g2012"
                transform="matrix(.39687 0 0 -.39687 -284.352 1064.726)"
                strokeWidth="0.889"
              >
                <g transform="translate(1332.265 2366.3)" id="g6443">
                  <path
                    id="path6445"
                    d="m 0,0 c 0,-9.941 -8.06,-18 -18,-18 -9.941,0 -18,8.059 -18,18 0,9.941 8.059,18 18,18 C -8.06,18 0,9.941 0,0"
                    fill="#aaa"
                  />
                </g>
                <g transform="translate(1332.163 2368.202)" id="g6447">
                  <path
                    id="path6449"
                    d="m 0,0 c -0.79,1.279 -2.12,2.537 -2.86,4.327 -0.74,1.784 -0.691,3.609 -1.033,5.067 -0.805,0.997 -1.711,1.902 -2.709,2.708 -1.459,0.341 -3.282,0.293 -5.068,1.033 -1.79,0.742 -3.048,2.069 -4.325,2.86 -0.625,0.066 -1.26,0.104 -1.902,0.104 -0.644,0 -1.279,-0.038 -1.903,-0.104 -1.279,-0.791 -2.537,-2.118 -4.327,-2.86 -1.784,-0.74 -3.607,-0.692 -5.067,-1.033 -0.997,-0.806 -1.904,-1.711 -2.708,-2.708 -0.342,-1.458 -0.294,-3.283 -1.035,-5.067 -0.74,-1.79 -2.069,-3.048 -2.858,-4.327 -0.066,-0.625 -0.103,-1.26 -0.103,-1.902 0,-0.643 0.037,-1.278 0.103,-1.905 0.789,-1.277 2.118,-2.535 2.858,-4.325 0.741,-1.784 0.693,-3.609 1.035,-5.066 0.804,-0.998 1.711,-1.904 2.708,-2.709 1.46,-0.342 3.283,-0.293 5.067,-1.032 1.79,-0.743 3.048,-2.071 4.327,-2.861 0.624,-0.065 1.259,-0.103 1.903,-0.103 0.642,0 1.277,0.038 1.902,0.103 1.277,0.79 2.535,2.118 4.325,2.861 1.786,0.739 3.609,0.69 5.068,1.032 0.998,0.805 1.904,1.711 2.709,2.709 0.342,1.457 0.293,3.282 1.033,5.066 0.74,1.79 2.07,3.048 2.86,4.325 0.065,0.627 0.102,1.262 0.102,1.905 C 0.102,-1.26 0.065,-0.625 0,0"
                    fillRule="evenodd"
                  />
                </g>
                <g transform="translate(1314.863 2384.231)" id="g6451">
                  <path
                    id="path6453"
                    d="M 0,0 C -0.195,0.045 -0.393,0.069 -0.598,0.069 -0.804,0.069 -1.002,0.045 -1.196,0 V -18.157 H 0 Z"
                    fill="#fff"
                    fillRule="evenodd"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div className="label" style={{ color: "gray" }}>
          {value.toFixed(0)}
        </div>
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
      let result = value + (delta * (max - min)) / this.range;
      result = result > max ? max : result;
      result = result < min ? min : result;

      this.props.onChange(result);
      this.setState({ clientY });
    }
  }

  private angle() {
    const { maxValue: max, minValue: min, value } = this.props;
    const r = value / (max - min);
    return r * this.range - this.range / 2;
  }
}

export default Knob;
