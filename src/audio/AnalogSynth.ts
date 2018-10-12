import { observable } from "mobx";
import EqMap from "../utils/EqMap";
import Note from "./Note";

class AnalogSynth {
  private ac: AudioContext;
  private playing: EqMap<Note, OscillatorNode> = new EqMap();
  private output: AudioNode;

  constructor(ac: AudioContext) {
    this.ac = ac;
  }

  public connectTo(output: AudioNode) {
    this.output = output;
  }

  public playTone(note: Note): void {
    const osc = this.ac.createOscillator();
    osc.connect(this.output);
    osc.type = "sawtooth";
    osc.frequency.value = note.frequency;
    osc.start(0);
    this.playing.set(note, osc);
  }

  public stopTone(note: Note): boolean {
    console.log(this.playing);
    if(this.playing.has(note)) {
      const playedNote = this.playing.get(note);
      if (playedNote) {
        playedNote.stop();
        this.playing.delete(note);
        return true;
      }
    }

    return false;
  }
}

export default AnalogSynth;
