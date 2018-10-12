import { FREQUENCIES } from "./constants";

class Note implements INote {
  public pitch = "C";
  public octave = 3;
  public duration = 1;
  public velocity = 128;

  get frequency(): number {
    const base = FREQUENCIES[this.pitch];
    return base * (1 / Math.pow(2, 3 - this.octave));
  }
}

export default Note;
