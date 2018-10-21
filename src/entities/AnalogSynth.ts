import { computed, observable } from "mobx";
import AnalogVoice from "./AnalogVoice";
import Note from "./Note";

interface IAdsr {
  a: number;
  d: number;
  s: number;
  r: number;
}

class AnalogSynth {

  @computed
  get filterAdsr() {
    return this.$filterAdsr;
  }

  set filterAdsr(value) {
    this.voices.forEach(v => {
      // @ts-ignore
      v.filterAdsr = value;
    });
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
  private gain: GainNode;
  private compressor: DynamicsCompressorNode;
  private readonly merger: ChannelMergerNode;
  @observable private $filterFreq: number = 2000;
  @observable private $filterQ: number = 5;
  @observable private $filterAdsr: IAdsr = {
    a: 0.1,
    d: 0.3,
    s: 0.3,
    r: 0,
  };

  @observable private $wave: number = 0;
  @observable private voices: AnalogVoice[];
  private readonly ac: AudioContext;

  constructor(ac: AudioContext) {
    this.voices = [];
    this.buildAnalyser(ac);
    this.compressor = ac.createDynamicsCompressor();
    this.merger = ac.createChannelMerger(10);
    this.gain = ac.createGain();
    this.gain.gain.value = 1;
    this.merger.connect(this.compressor);
    this.compressor.connect(this.gain);
    this.gain.connect(this.analyser);
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
    voice.filterAdsr = this.filterAdsr;
    voice.connect(this.merger);
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
    this.voices[index].disconnect();
    this.voices.splice(index, 1);
    return true;
  }

  private buildAnalyser(ac: AudioContext): void {
    const analyser = ac.createAnalyser();
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const analyserData = new Uint8Array(bufferLength);
    this.analyser = analyser;
    this.analyserData = analyserData;
  }
}

export default AnalogSynth;
