const { describe, it, expect } = require("@jest/globals");
const solution = require("./solution");

describe("2. Promises:", () => {
  it("Wrong input type", (done) => {
    solution("as", (text) => {
      expect(text).toContain("ID type is incorrect");
      done();
    });
  });

  it("Franklin", (done) => {
    solution(35, (text) => {
      expect(text).toContain("Franklin does not exist in our records");
    });

    solution(25, (text) => {
      expect(text).toContain("Franklin does not exist in our records");
    });

    setTimeout(() => done(), 100); //task queue
  });

  it("19 - Spencer Laurier", (done) => {
    solution(19, (text) => {
      expect(text).toBe("Spencer Laurier");
      done();
    });
  });

  it("17 - Jim Hart", (done) => {
    solution(17, (text) => {
      expect(text).toBe("Jim Hart");
      done();
    });
  });

  it("Negative number", (done) => {
    solution(-4, (text) => {
      expect(text).toContain("ID type must be a positive integer");
      done();
    });
  });


});
