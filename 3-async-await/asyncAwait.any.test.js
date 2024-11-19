// const { describe, it, expect } = require("@jest/globals");
const { describe, it, expect } = require("@jest/globals");
const { promiseAnySolution } = require("./solution");

describe("3. AsyncAwait: 4. Promise.any ", () => {
  it("74", async () => {
    expect(await promiseAnySolution(74)).toStrictEqual({
      id: 74,
      price: 1.5,
      product: "sugar",
    });
  });
  it("19", async () => {
    expect(await promiseAnySolution(19)).toStrictEqual({
      id: 19,
      price: 1.5,
      product: "sugar",
    });
  });

  it("88", async () => {
    expect(await promiseAnySolution(88)).toContain(
      "This is a forced internal error"
    );
  });

  it("1", async () => {
    expect(await promiseAnySolution(1)).toStrictEqual({
      id: 1,
      price: 0.5,
      product: "salt",
    });
  });
});
