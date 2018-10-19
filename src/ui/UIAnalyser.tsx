import * as React from "react";
import { findDOMNode } from "react-dom";

interface IProps {
  analyser: AnalyserNode;
}

const D = {
  HEIGHT: 60,
  WIDTH: 150
};

class UIAnalyser extends React.Component<IProps> {
  private canvasRef: any;
  private cc: any;
  private canvas: Element | Text;

  public render() {
    return (
      <div className="ui-analyser">
        <canvas
          width={D.WIDTH}
          height={D.HEIGHT}
          ref={r => (this.canvasRef = r)}
        />
      </div>
    );
  }

  public componentDidMount() {
    this.canvas = findDOMNode(this.canvasRef);
    // @ts-ignore
    this.cc = this.canvas.getContext("2d");
    requestAnimationFrame(this.visualize.bind(this));
  }

  private visualize(): any {
    const { analyser } = this.props;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.cc.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.cc.fillRect(0, 0, D.WIDTH, D.HEIGHT);
    analyser.getByteTimeDomainData(dataArray);

    this.cc.lineWidth = 2;
    this.cc.strokeStyle = "lightBlue";

    this.cc.beginPath();
    const sliceWidth = D.WIDTH / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 255;
      const y = v * D.HEIGHT;

      if (i === 0) {
        this.cc.moveTo(x, y);
      } else {
        this.cc.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.cc.lineTo(D.WIDTH, D.HEIGHT / 2);
    this.cc.stroke();
    requestAnimationFrame(this.visualize.bind(this));
  }
}

export default UIAnalyser;
