import EqMap from "./EqMap";

describe("EqMap", () => {
  describe("#isEqual", () => {
    const a1 = { a: 1 };
    const a2 = { a: 1 };
    const b = { b: 1 };
    it("returns true when objects are equivalent", () => {
      expect(EqMap.isEqual(a1, a2)).toBeTruthy();
    });

    it("returns false when objects are not equivalent", () => {
      expect(EqMap.isEqual(a1, b)).toBeFalsy();
    });
  });

  describe("#has", () => {
    let a;
    beforeEach(() => {
      a = new EqMap();
      a.set({ x: 1 }, 1);
      a.set({ x: 2 }, 2);
    });

    it("returns true when key object is equal", () => {
      expect(a.has({ x: 1 })).toBeTruthy();
    });

    it("returns false when key object is not equal", () => {
      expect(a.has({ x: 3 })).toBeFalsy();
    });
  });

  describe("#get", () => {
    let a;
    beforeEach(() => {
      a = new EqMap();
      a.set({ x: 1 }, 1);
      a.set({ x: 2 }, 2);
    });

    it("returns the pair value 1", () => {
      expect(a.get({ x: 1 })).toBe(1);
    });

    it("returns the pair value", () => {
      expect(a.get({ x: 2 })).toBe(2);
    });
  });
});
