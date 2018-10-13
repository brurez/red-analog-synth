import { Provider } from "mobx-react";
import * as React from "react";

import "./App.css";

import AnalogSynth from "../audio/AnalogSynth";
import KeyboardInterface from "../KeyboardInterface";
import Knob from "./Knob";
import MusicKeyboard from "./MusicKeyboard";

interface IState {
  value: number;
}

class App extends React.Component<{}, IState> {
  public state: Readonly<IState> = {
    value: 2000
  };
  private ac: AudioContext;
  private synth: AnalogSynth;
  private keyboard: KeyboardInterface;

  constructor(props) {
    super(props);
    const ac = new AudioContext();
    const keyboardInterface = new KeyboardInterface();
    this.synth = new AnalogSynth(ac);
    this.synth.connectTo(ac.destination);
    this.keyboard = keyboardInterface;
    this.ac = ac;

    keyboardInterface.registerForNoteStart(note => this.synth.playTone(note));
    keyboardInterface.registerForNoteStop(note => {
      this.synth.stopTone(note);
    });
  }

  public render() {
    console.log(this.state.value)
    return (
      <div className="App">
        <Knob
          min={0}
          max={4000}
          value={this.state.value}
          label="CUTOFF"
          onChange={value => {
            this.setState({ value });
          }}
        />
        <MusicKeyboard synth={this.synth} keyboard={this.keyboard} />
      </div>
    );
  }

  private handleChange = newValue => {
    this.setState({
      value: newValue
    });
  };
}

export default App;
