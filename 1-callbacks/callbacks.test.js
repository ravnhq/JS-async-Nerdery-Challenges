const { describe, it, expect } = require("@jest/globals");
const solution = require("./solution.js");

describe("1.1 Callbacks ", () => {
  it("Both cases", (done) => {
    const names = ["Ronald", "Mary", "Ris", "Stacy", "Ashley"];

    solution(names, (successUser, failureUser) => {
      expect(failureUser.length).toBe(3);
      expect(successUser.length).toBe(2);
      expect(successUser.some((u) => u.name == "Stacy")).toBeTruthy();
      expect(successUser.some((u) => u.name == "Mary")).toBeTruthy();
      expect(successUser.some((u) => u.name == "Ronald")).toBeFalsy();
      expect(
        failureUser.some((message) => message.includes("Ronald"))
      ).toBeTruthy();
      expect(
        failureUser.some((message) => message.includes("Ris"))
      ).toBeTruthy();
      expect(
        failureUser.some((message) => message.includes("Ashley"))
      ).toBeTruthy();

      done();
    });
  });

  it("All failure", (done) => {
    const names = ["Ronald", "Ris", "Ashley"];

    solution(names, (successUser, failureUser) => {
      expect(failureUser.length).toBe(3);
      expect(successUser.length).toBe(0);
      expect(successUser.some((u) => u.name == "Ronald")).toBeFalsy();
      expect(
        failureUser.some((message) => message.includes("Ronald"))
      ).toBeTruthy();
      expect(
        failureUser.some((message) => message.includes("Ris"))
      ).toBeTruthy();
      expect(
        failureUser.some((message) => message.includes("Ashley"))
      ).toBeTruthy();

      done();
    });
  });

  it("all successful", (done) => {
    const names = ["John", "Mary", "Richard", "Stacy", "Stacy", "John", "john"];

    solution(names, (successUser, failureUser) => {
      expect(failureUser.length).toBe(1);
      expect(successUser.length).toBe(6);
      expect(successUser.some((u) => u.name == "John")).toBeTruthy();
      expect(successUser.some((u) => u.name == "Mary")).toBeTruthy();
      expect(successUser.some((u) => u.name == "Richard")).toBeTruthy();
      expect(successUser.some((u) => u.name == "Stacy")).toBeTruthy();
      expect(successUser.some((u) => u.name == "Ronald")).toBeFalsy();
      expect(
        failureUser.some((message) => message.includes("john"))
      ).toBeTruthy();

      done();
    });
  });

  it("No data", (done) => {
    const names = [];

    solution(names, (successUser, failureUser) => {
      expect(failureUser.length).toBe(0);
      expect(successUser.length).toBe(0);
      expect(successUser.some((u) => u.name == "Ronald")).toBeFalsy();
      expect(
        failureUser.some((message) => message.includes("Ronald"))
      ).toBeFalsy();
      expect(
        failureUser.some((message) => message.includes("Ris"))
      ).toBeFalsy();
      expect(
        failureUser.some((message) => message.includes("Ashley"))
      ).toBeFalsy();

      done();
    });
  });
});
