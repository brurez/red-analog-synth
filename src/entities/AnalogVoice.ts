import Note from "./Note";

class AnalogVoice {
  public filter: BiquadFilterNode;
  public gain: AudioNode;
  public osc: OscillatorNode;
  public note: Note;

  constructor(ac, filterEnv) {
    const filter = ac.createBiquadFilter();
    filter.type = 'lowpass';

    const gain = ac.createGain();

    const osc = ac.createOscillator();
    osc.type = "sawtooth";

    osc.connect(filter);
    filter.connect(gain);

    filterEnv.applyTo(filter.frequency, ac.currentTime);

    this.filter = filter;
    this.gain = gain;
    this.osc = osc;

    this.osc.onended = () => {
      this.osc.disconnect();
      this.filter.disconnect();
      this.gain.disconnect();
    };
  }

  public connect(node: AudioNode) {
    this.gain.connect(node);
  }

  public play(note: Note) {
    this.osc.frequency.value = note.frequency;
    this.osc.start(0);
    this.note = note;
  }

  public stop() {
    this.osc.stop();
  }
}

export default AnalogVoice