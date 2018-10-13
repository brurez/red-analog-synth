import { computed, observable } from "mobx";
import AnalogVoice from "./AnalogVoice";
import Note from "./Note";

class AnalogSynth {
  @observable private $filterFreq: number = 2000;

  @observable private voices: AnalogVoice[];
  private ac: AudioContext;
  private output: AudioNode;

  constructor(ac: AudioContext) {
    this.voices = [];
    this.ac = ac;
  }

  @computed
  get filterFreq() {
    return this.$filterFreq;
  }

  set filterFreq(value) {
    this.voices.forEach(v =>  {
        v.filter.frequency.value = value;
    });
    this.$filterFreq = value;
  }

  @computed
  get tonesPlayingNow(): string[] {
    return this.voices.map(v => v.note && v.note.name);
  }

  public connectTo(output: AudioNode) {
    this.output = output;
  }

  public play(note: Note): void {
    this.stop(note);
    const voice = new AnalogVoice(this.ac);
    voice.filter.frequency.value = this.filterFreq;
    voice.connect(this.ac.destination);
    voice.play(note);
    this.voices.push(voice);
  }

  public stop(note: Note): boolean {
     const index =  this.voices.findIndex(v => v.note && v.note.name === note.name);

    if (index === -1) {
      return false;
    }

    this.voices[index].stop();
    this.voices.splice(index, 1);
    return true;
  }
}

export default AnalogSynth;
