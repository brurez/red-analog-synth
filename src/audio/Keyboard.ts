import hotkeys from "hotkeys-js";
import Note from "./Note";

type NoteCb = (note: Note) => any;

class Keyboard {
  public static readonly keyMap = {
    a: "C",
    s: "D",
    d: "E",
    f: "F",
    g: "G",
    h: "A",
    j: "B",
    k: "C",
    l: "D",
    o: "Db",
    e: "Eb",
    t: "Gb",
    u: "Bb",
    w: "Db",
    y: "Ab"
  };

  private octave: any;
  private noteStartCb: NoteCb;
  private noteStopCb: NoteCb;

  constructor() {
    this.octave = 3;
    this.listenKeyboardEvents();
  }

  public registerForNoteStart(callback: NoteCb): void {
    this.noteStartCb = callback;
  }

  public registerForNoteStop(callback: NoteCb): void {
    this.noteStopCb = callback;
  }

  private listenKeyboardEvents(): void {
    document.addEventListener("keydown", ({ key }) => {
      if (['a', 's', 'd', 'f', 'g', 'h', 'j', 'w', 'e', 't', 'y', 'u'].indexOf(key) >= 0) {
        const note = new Note(Keyboard.keyMap[key], this.octave);
        this.noteStartCb(note);
      }
      if (['k', 'l', 'o'].indexOf(key) >= 0) {
        const note = new Note(Keyboard.keyMap[key], this.octave + 1);
        this.noteStartCb(note);
      }
    });

    document.addEventListener("keyup", ({ key }) => {
      if (['a', 's', 'd', 'f', 'g', 'h', 'j', 'w', 'e', 't', 'y', 'u'].indexOf(key) >= 0) {
        const note = new Note(Keyboard.keyMap[key], this.octave);
        this.noteStopCb(note);
      }
      if (['k', 'l', 'o'].indexOf(key) >= 0) {
        const note = new Note(Keyboard.keyMap[key], this.octave + 1);
        this.noteStopCb(note);
      }
    });

    hotkeys("z", () => (this.octave -= 1));
    hotkeys("x", () => (this.octave += 1));
  }
}

export default Keyboard;
