// const { describe, it, expect } = require("@jest/globals");
const { describe, it, expect } = require("@jest/globals");
const { promiseAllSettledSolution } = require("./solution");

describe("3. AsyncAwait: 2. Promise.allSettled ", () => {
  it("74", async () => {
    expect(await promiseAllSettledSolution(74)).toStrictEqual({
      id: 74,
      price: 1.5,
      product: "sugar",
    });
  });
  it("19", async () => {
    expect(await promiseAllSettledSolution(19)).toStrictEqual({
      id: 19,
      price: 1.5,
      product: "sugar",
    });
  });

  it("88", async () => {
    expect(await promiseAllSettledSolution(88)).toContain(
      "This is a forced internal error"
    );
  });

  it("1", async () => {
    expect(await promiseAllSettledSolution(1)).toStrictEqual({
      id: 1,
      price: 0.5,
      product: "salt",
    });
  });
});
