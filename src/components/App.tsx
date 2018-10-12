import { Provider } from "mobx-react";
import * as React from "react";

import "./App.css";

import AnalogSynth from "../audio/AnalogSynth";
import KeyboardInterface from "../KeyboardInterface";
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

    keyboardInterface.registerForNoteStart(note => this.synth.playTone(note));
    keyboardInterface.registerForNoteStop(note => {
      this.synth.stopTone(note);
    });
  }

  public render() {
    // @ts-ignore
    return (
        <div className="App">
          <MusicKeyboard synth={this.synth} keyboard={this.keyboard}/>
        </div>
    );
  }
}

export default App;
