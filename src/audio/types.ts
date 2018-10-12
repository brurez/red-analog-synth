interface INote {
  pitch: string;
  octave: number;
  duration: number;
  velocity: number;
  readonly frequency: number;
}

interface IInstrument {
  play(note: INote): void;
  connect(node: AudioNode | AudioParam): void;
}
