import Note from "./Note";

interface IInstrument {
  playTone(tone: Note): void;
  stopTone(tone: Note): boolean;
  connect(node: AudioNode | AudioParam): void;
}
