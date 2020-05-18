const evaluateOperation = require("./main.js");

test("properly evaluates simple multiplication", () => {
  expect(evaluateOperation([2, 3], ["*"])).toBe(6);
  expect(evaluateOperation([2, -4], ["*"])).toBe(-8);
});

test("properly evaluates simple division", () => {
  expect(evaluateOperation([4, 2], ["/"])).toBe(2);
});

test("properly evaluates simpleaddition", () => {
  expect(evaluateOperation([2, 2], ["+"])).toBe(4);
});

test("properly evaluates simple subtraction", () => {
  expect(evaluateOperation([2, 2], ["-"])).toBe(0);
});

test("respect order of operations", () => {
  expect(evaluateOperation([2, 3, 4], ["+", "*"])).toBe(14);
});

test("does not allow dividing by 0", () => {
  expect(evaluateOperation([2, 0], ["/"])).toBe("divisionByZero");
});

test("handles long operations", () => {
  expect(evaluateOperation([2, 5, 9, 6, 8], ["+", "*", "/", "-"])).toBe(1.5);
});

test("handles strings and numbers", () => {
  expect(evaluateOperation([2, "5", 9, "6", 8], ["+", "*", "/", "-"])).toBe(
    1.5
  );
});
