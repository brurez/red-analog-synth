import "web-audio-test-api";

import AnalogSynth from "./AnalogSynth";
import Note from "./Note";

describe("AnalogSynth", () => {
  let ac;
  let note1;
  let note2;

  beforeEach(() => {
    ac = new AudioContext();
    note1 = new Note("D", 4);
    note2 = new Note("F", 5);
  });

  describe("tonesPlayingNow", () => {
    it("tonesPlayingNow returns 2 notes", () => {
      const analogSynth = new AnalogSynth(ac);
      analogSynth.play(note1);
      analogSynth.play(note2);
      analogSynth.play(note2);
      expect(analogSynth.tonesPlayingNow).toEqual(["D4", "F5"]);
    });
  });

  describe("tonesPlayingNow", () => {
    it("tonesPlayingNow returns 1 note", () => {
      const analogSynth = new AnalogSynth(ac);
      analogSynth.play(note1);
      analogSynth.play(note2);
      analogSynth.stop(note1);
      expect(analogSynth.tonesPlayingNow).toEqual(["F5"]);
    });
  });
});
