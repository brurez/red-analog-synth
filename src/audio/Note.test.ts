import Note from "./Note";

describe("Note", () => {
  it("returns right frequency on C4", () => {
    const note = new Note();
    note.pitch = "C";
    note.octave = 4;
    expect(note.frequency).toBeGreaterThan(261);
    expect(note.frequency).toBeLessThan(262);
  });

  it("returns right frequency on C3", () => {
    const note = new Note();
    note.pitch = "C";
    note.octave = 3;
    expect(note.frequency).toBeGreaterThan(130.8);
    expect(note.frequency).toBeLessThan(130.82);
  });

  it("returns right frequency on C2", () => {
    const note = new Note();
    note.pitch = "C";
    note.octave = 2;
    expect(note.frequency).toBeGreaterThan(65);
    expect(note.frequency).toBeLessThan(66);
  });

  it("returns right frequency on C1", () => {
    const note = new Note();
    note.pitch = "C";
    note.octave = 1;
    expect(note.frequency).toBeGreaterThan(32);
    expect(note.frequency).toBeLessThan(33);
  });

  it("returns right frequency on C0", () => {
    const note = new Note();
    note.pitch = "C";
    note.octave = 0;
    expect(note.frequency).toBeGreaterThan(16);
    expect(note.frequency).toBeLessThan(17);
  });
});
