import Note from "../entities/Note";
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

  private noteStartCb: NoteCb;
  private noteStopCb: NoteCb;
  private pressed = new Set();
  private store: IStore;


  constructor(store) {
    this.listenKeyboardEvents();
    this.store = store;
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
          const note = new Note(Keyboard.keyMap[key], this.store.octave);
          this.noteStartCb(note);
        }
        if (["k", "l", "o"].indexOf(key) >= 0) {
          const note = new Note(Keyboard.keyMap[key], this.store.octave + 1);
          this.noteStartCb(note);
        }
        if (key === "z") {
          this.store.octave -= 1;
        }
        if (key === "x") {
          this.store.octave += 1;
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
        const note = new Note(Keyboard.keyMap[key], this.store.octave);
        this.noteStopCb(note);
      }
      if (["k", "l", "o"].indexOf(key) >= 0) {
        const note = new Note(Keyboard.keyMap[key], this.store.octave + 1);
        this.noteStopCb(note);
      }
    });
  }
}

export default Keyboard;
