import ADSREnvelope from "adsr-envelope";
import { computed, observable } from "mobx";

import AnalogVoice from "./AnalogVoice";
import Note from "./Note";

class AnalogSynth {
  @computed
  get wave() {
    return this.$wave;
  }

  set wave(value) {
    this.voices.forEach(v => {
      // @ts-ignore
      v.osc.type = AnalogSynth.waves[value];
    });
    this.$wave = value;
  }

  @computed
  get filterFreq() {
    return this.$filterFreq;
  }

  set filterFreq(value) {
    this.voices.forEach(v => {
      v.filter.frequency.value = value;
    });
    this.$filterFreq = value;
  }

  @computed
  get filterQ() {
    return this.$filterQ;
  }

  set filterQ(value) {
    this.voices.forEach(v => {
      v.filter.Q.value = value;
    });
    this.$filterQ = value;
  }

  @computed
  get tonesPlayingNow(): string[] {
    return this.voices.map(v => v.note && v.note.name);
  }

  public static waves = ["sawtooth", "triangle", "square", "sine"];
  public filterEnv: ADSREnvelope;
  @observable private $filterFreq: number = 2000;
  @observable private $filterQ: number = 1;

  @observable private $wave: number = 0;
  @observable private voices: AnalogVoice[];
  private ac: AudioContext;
  private output: AudioNode;

  constructor(ac: AudioContext) {
    this.filterEnv = new ADSREnvelope({
      attackTime: 0.5,
      decayTime: 0.25,
      sustainLevel: 0.8,
      releaseTime: 2.5,
      gateTime: 6,
      releaseCurve: "exp"
    });

    this.voices = [];
    this.ac = ac;
  }

  public connectTo(output: AudioNode) {
    this.output = output;
  }

  public play(note: Note): void {
    this.stop(note);
    const voice = new AnalogVoice(this.ac, this.filterEnv);
    // @ts-ignore
    voice.osc.type = AnalogSynth.waves[this.wave];
    voice.filter.frequency.value = this.filterFreq;
    voice.filter.Q.value = this.filterQ;
    voice.connect(this.ac.destination);
    voice.play(note);

    this.voices.push(voice);
  }

  public stop(note: Note): boolean {
    const index = this.voices.findIndex(
      v => v.note && v.note.name === note.name
    );

    if (index === -1) {
      return false;
    }

    this.voices[index].stop();
    this.voices.splice(index, 1);
    return true;
  }
}

export default AnalogSynth;
