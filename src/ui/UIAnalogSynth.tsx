import { observer } from "mobx-react";
import * as React from "react";
import AnalogSynth from "../entities/AnalogSynth";
import saw from "../images/sawtoothWave.svg";
import sine from "../images/sineWave.svg";
import square from "../images/squareWave.svg";
import triangle from "../images/triangleWave.svg";
import Knob from "./Knob";
import Select from "./Select";
import Slider from "./Slider";
import SliderGroup from "./SliderGroup";

interface IProps {
  synth: AnalogSynth;
}

const waves = [saw, triangle, square, sine];

@observer
class UIAnalogSynth extends React.Component<IProps> {
  public render() {
    const { synth } = this.props;

    return (
      <div className="analog-synth">
        <Select
          value={synth.wave}
          onChange={value => (synth.wave = value)}
          size={40}
          items={waves}
        />
        <Knob
          value={synth.filterFreq}
          onChange={value => (synth.filterFreq = value)}
          label="CUTOFF"
          minValue={0}
          maxValue={14000}
          size={54}
        />
        <Knob
          value={synth.filterQ}
          onChange={value => (synth.filterQ = value)}
          label="Q"
          minValue={0.001}
          maxValue={30}
          size={54}
        />
        <SliderGroup name="FILTER ADSR">
          <React.Fragment>
            <Slider
              value={0}
              minValue={0}
              maxValue={100}
              onChange={e => console.log(e)}
            />
            <Slider
              value={50}
              minValue={0}
              maxValue={100}
              onChange={e => console.log(e)}
            />
            <Slider
              value={75}
              minValue={0}
              maxValue={100}
              onChange={e => console.log(e)}
            />
            <Slider
              value={100}
              minValue={0}
              maxValue={100}
              onChange={e => console.log(e)}
            />
          </React.Fragment>
        </SliderGroup>
      </div>
    );
  }
}

export default UIAnalogSynth;
