import * as React from "react";
import "./App.css";

import AnalogSynth from "../audio/AnalogSynth";
import Note from "../audio/Note";
import logo from "../logo.svg";

class App extends React.Component {
  private ac: AudioContext;

  public componentDidMount() {
    this.ac = new AudioContext();
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
        <button onClick={this.playMusic}>Play</button>
      </div>
    );
  }

  private playMusic = () => {
    this.ac.resume().then(() => {
      const synth = new AnalogSynth(this.ac, 140);
      synth.connect(this.ac.destination);
      const note1 = new Note();
      synth.play(note1);
    });
  };
}

export default App;
