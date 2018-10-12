import { Provider } from "mobx-react";
import * as React from "react";

import "./App.css";

import AnalogSynth from "../audio/AnalogSynth";
import KeyboardInterface from "../KeyboardInterface";
import Knob from "./Knob";
import MusicKeyboard from "./MusicKeyboard";

class App extends React.Component {
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
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="App">
          <Knob
            size={100}
            numTicks={25}
            degrees={260}
            min={1}
            max={100}
            value={30}
            color={true}
            onChange={this.handleChange}
          />

          <Knob
            numTicks={125}
            degrees={180}
            min={1}
            max={100}
            value={0}
            onChange={this.handleChange}
          />
          <MusicKeyboard synth={this.synth} keyboard={this.keyboard}/>
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
