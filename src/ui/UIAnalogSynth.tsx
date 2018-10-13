import { observer } from "mobx-react";
import * as React from "react";
import AnalogSynth from "../entities/AnalogSynth";
import Knob from "./Knob";

interface IProps {
  synth: AnalogSynth;
}

@observer
class UIAnalogSynth extends React.Component<IProps> {
  public render() {
    const {
      synth }
     = this.props;

    return (
      <div className="analog-synth">
        <Knob
          value={synth.filterFreq}
          minValue={0}
          maxValue={22050}
          onChange={value => synth.filterFreq = value}
          label="CUTOFF"
        />
      </div>
    );
  }
}

export default UIAnalogSynth;
