import * as React from "react";
import "./App.css";

import AnalogSynth from "../audio/AnalogSynth";
import KeyboardInterface from "../KeyboardInterface";
import MusicKeyboard from './MusicKeyboard';

class App extends React.Component {
  private ac: AudioContext;

  constructor(props) {
    super(props);
    const ac = new AudioContext();
    const key = new KeyboardInterface();
    const synth = new AnalogSynth(ac);
    synth.connectTo(ac.destination);

    key.registerForNoteStart(note => synth.playTone(note));
    key.registerForNoteStop(note => {
      synth.stopTone(note)
    });
  }

  public render() {
    return (
      <div className="App">
        <MusicKeyboard/>
      </div>
    );
  }
}

export default App;
