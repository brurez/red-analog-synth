import Note from "./Note";

class AnalogSynth {
  private ac: AudioContext;
  private tones: object = {};
  private output: AudioNode;

  constructor(ac: AudioContext) {
    this.ac = ac;
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
    this.tones[note.name] = osc;
  }

  public stopTone(note: Note): boolean {
    if(this.tones[note.name]) {
      this.tones[note.name].stop();
      delete this.tones[note.name];
      return true;
    }

    return false;
  }
}

export default AnalogSynth;
