class AnalogSynth implements IInstrument {
  public bpm: number;
    private ac: AudioContext;
  private readonly oscillators: OscillatorNode[];

  constructor(ac: AudioContext, bpm: number) {
    this.oscillators = [];
    this.oscillators[0] = ac.createOscillator();
    this.oscillators[0].type = "sawtooth";
    this.bpm = bpm;
    this.ac = ac;
  }

  public connect(node: AudioNode) {
    this.oscillators.forEach(osc => osc.connect(node));
  }

  public play(note: INote): void {
    this.oscillators.forEach(osc => {
      osc.frequency.value = note.frequency;
      osc.start(0);
      osc.stop(this.ac.currentTime + (note.duration * 60) / this.bpm);
    });
  }
}

export default AnalogSynth;
