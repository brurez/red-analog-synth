import { observable } from "mobx";
import Note from "./audio/Note";

type NoteCb = (note: Note) => any;

class KeyboardInterface {
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

  @observable private octave: number;
  private noteStartCb: NoteCb;
  private noteStopCb: NoteCb;
  private pressed = new Set();


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
      if(!this.pressed.has(key)) {
        if (
          ["a", "s", "d", "f", "g", "h", "j", "w", "e", "t", "y", "u"].indexOf(
            key
          ) >= 0
        ) {
          const note = new Note(KeyboardInterface.keyMap[key], this.octave);
          this.noteStartCb(note);
        }
        if (["k", "l", "o"].indexOf(key) >= 0) {
          const note = new Note(KeyboardInterface.keyMap[key], this.octave + 1);
          this.noteStartCb(note);
        }
        if (key === "z") {
          this.octave -= 1;
        }
        if (key === "x") {
          this.octave += 1;
        }
        this.pressed.add(key);
      }
    });

    document.addEventListener("keyup", ({ key }) => {
      this.pressed.delete(key);

      if (
        ["a", "s", "d", "f", "g", "h", "j", "w", "e", "t", "y", "u"].indexOf(
          key
        ) >= 0
      ) {
        const note = new Note(KeyboardInterface.keyMap[key], this.octave);
        this.noteStopCb(note);
      }
      if (["k", "l", "o"].indexOf(key) >= 0) {
        const note = new Note(KeyboardInterface.keyMap[key], this.octave + 1);
        this.noteStopCb(note);
      }
    });
  }
}

export default KeyboardInterface;
