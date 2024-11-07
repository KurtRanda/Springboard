// Card.test.js
import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke test
test("it renders without crashing", () => {
  render(<Card caption="Sample caption" src="/path/to/image.jpg" currNum={1} totalNum={3} />);
});

// Snapshot test
test("it matches snapshot", () => {
  const { asFragment } = render(<Card caption="Sample caption" src="/path/to/image.jpg" currNum={1} totalNum={3} />);
  expect(asFragment()).toMatchSnapshot();
});
