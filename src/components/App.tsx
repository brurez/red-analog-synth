import * as React from "react";
import "./App.css";

import AnalogSynth from "../audio/AnalogSynth";
import Keyboard from "../audio/Keyboard";
import logo from "../logo.svg";

class App extends React.Component {
  private ac: AudioContext;

  constructor(props) {
    super(props);
    const ac = new AudioContext();
    const key = new Keyboard();
    const synth = new AnalogSynth(ac);
    synth.connectTo(ac.destination);

    key.registerForNoteStart(note => synth.playTone(note));
    key.registerForNoteStop(note => synth.stopTone(note));
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
