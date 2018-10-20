import Note from "./Note";

interface IAdsr {
  a: number;
  d: number;
  s: number;
  r: number;
}

class AnalogVoice {
  public filter: BiquadFilterNode;
  public filterAdsr: IAdsr;
  public gain: AudioNode;
  public osc: OscillatorNode;
  public note: Note;
  public ac: AudioContext;

  constructor(ac) {
    const filter = ac.createBiquadFilter();
    filter.type = "lowpass";

    const gain = ac.createGain();

    const osc = ac.createOscillator();
    osc.type = "sawtooth";

    osc.connect(filter);
    filter.connect(gain);

    this.filter = filter;
    this.gain = gain;
    this.osc = osc;
    this.ac = ac;
  }

  public connect(node: AudioNode) {
    this.gain.connect(node);
  }

  public play(note: Note) {
    const { a, d, s } = this.filterAdsr;
    this.osc.frequency.value = note.frequency;
    this.envGenOn(this.filter.frequency, a, d, s);
    this.osc.start();
    this.note = note;
  }

  public stop() {
    const { r } = this.filterAdsr;
    const time = this.envGenOff(this.filter.frequency, r);
    this.osc.stop(time);
  }

  private envGenOn(param, a, d, s) {
    const { value } = param;
    const now = this.ac.currentTime;
    param.cancelScheduledValues(0);
    param.setValueAtTime(0, now);
    param.linearRampToValueAtTime(value, now + a);
    param.linearRampToValueAtTime(value * s, now + a + d);
  }

  private envGenOff(param, r) {
    const { value } = param;
    const now = this.ac.currentTime;
    param.cancelScheduledValues(0);
    param.setValueAtTime(value, now);
    param.linearRampToValueAtTime(0, now + r);
    return now + r;
  }
}

export default AnalogVoice;
