import { Provider } from "mobx-react";
import * as React from "react";

import "./App.css";

import AnalogSynth from "../entities/AnalogSynth";
import Keyboard from "./Keyboard";
import store from './store';
import UIAnalogSynth from './UIAnalogSynth';
import UIKeyboard from "./UIKeyboard";

class App extends React.Component {
  private ac: AudioContext;
  private synth: AnalogSynth;
  private keyboard: Keyboard;

  constructor(props) {
    super(props);
    const ac = new AudioContext();
    this.synth = new AnalogSynth(ac);
    this.synth.connectTo(ac.destination);
    this.keyboard = new Keyboard(store);
    this.ac = ac;

    this.keyboard.registerForNoteStart(note => this.synth.play(note));
    this.keyboard.registerForNoteStop(note => {
      this.synth.stop(note);
    });
  }

  public render() {
    return (
      <div className="App">
        <UIAnalogSynth synth={this.synth}/>
        <UIKeyboard synth={this.synth} store={store} />
      </div>
    );
  }
}

export default App;
