import { computed } from "mobx";
import EqMap from "../utils/EqMap";
import Note from "./Note";

class AnalogSynth {
  private playing: EqMap<Note, OscillatorNode> = new EqMap();
  private ac: AudioContext;
  private output: AudioNode;

  constructor(ac: AudioContext) {
    this.ac = ac;
  }

  @computed
  get pressedKeys(): string[] {
    const notes = Array.from(this.playing.keys());
    return notes.map(note => note.name);
  }

  public connectTo(output: AudioNode) {
    this.output = output;
  }

  public playTone(note: Note): void {
    this.stopTone(note);
    const osc = this.ac.createOscillator();
    osc.connect(this.output);
    osc.type = "sawtooth";
    osc.frequency.value = note.frequency;
    osc.start(0);
    this.playing.set(note, osc);
  }

  public stopTone(note: Note): boolean {
    if (this.playing.has(note)) {
      const osc = this.playing.get(note);
      if (osc) {
        osc.stop();
        osc.disconnect(this.output);
        this.playing.delete(note);
        return true;
      }
    }
    return false;
  }
}

export default AnalogSynth;
