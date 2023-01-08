import foo from "../index";

describe("a simple function to test", () => {
  it("returns a string with the name and the age", () => {
    expect(foo("Ahmed", 1994)).toBe(
      "Hello, Ahmed! congratz for turning 29 years old"
    );
  });
});
