import { computed, observable } from "mobx";
import AnalogVoice from "./AnalogVoice";
import Note from "./Note";

interface IAdsr {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

class AnalogSynth {

  @computed
  get filterAdsr() {
    return this.$filterAdsr;
  }

  set filterAdsr(value) {
    this.$filterAdsr = value;
  }

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
  public analyser: AnalyserNode;

  @observable public analyserData: Uint8Array;
  @observable private $filterFreq: number = 2000;
  @observable private $filterQ: number = 1;
  @observable private $filterAdsr: IAdsr = {
    attack: 0,
    decay: 0,
    sustain: 1,
    release: 0,
  };

  @observable private $wave: number = 0;
  @observable private voices: AnalogVoice[];
  private ac: AudioContext;

  constructor(ac: AudioContext) {
    this.voices = [];
    this.buildAnalyser(ac);
    this.ac = ac;
  }

  public connectTo(output: AudioNode) {
    this.analyser.connect(output);
  }

  public play(note: Note): void {
    this.stop(note);
    const voice = new AnalogVoice(this.ac);
    // @ts-ignore
    voice.osc.type = AnalogSynth.waves[this.wave];
    voice.filter.frequency.value = this.filterFreq;
    voice.filter.Q.value = this.filterQ;
    voice.connect(this.analyser);
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

  private buildAnalyser(ac: AudioContext): void {
    const analyser = ac.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const analyserData = new Uint8Array(bufferLength);
    this.analyser = analyser;
    this.analyserData = analyserData;
  }
}

export default AnalogSynth;
