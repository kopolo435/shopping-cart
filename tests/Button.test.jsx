import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import Button from "../src/components/Button";
import SpanIcon from "../src/components/SpanIcon";

it("Renders correct button without label", () => {
  const mockFn = vi.fn(() => {});
  const content = "Añadir al carro";
  const btnClass = "primaryBtn";

  const { container } = render(
    <Button
      type="button"
      content={content}
      onClick={mockFn}
      className={btnClass}
    />
  );

  expect(container).toMatchSnapshot();
});

it("Renders correct button with accesibility label", () => {
  const mockFn = vi.fn(() => {});
  const content = <SpanIcon iconName="add" />;
  const btnClass = "primaryBtn";
  const label = "Añadir al carro";

  const { container } = render(
    <Button
      type="button"
      content={content}
      onClick={mockFn}
      className={btnClass}
      label={label}
    />
  );

  expect(container).toMatchSnapshot();
});

it("Calls onClick function when clicked", async () => {
  const onClick = vi.fn(() => {});
  const content = "Añadir al carro";
  const btnClass = "primaryBtn";
  const user = userEvent.setup();

  render(
    <Button
      type="button"
      content={content}
      onClick={onClick}
      className={btnClass}
    />
  );

  const button = screen.getByRole("button", { name: "Añadir al carro" });

  await user.click(button);
  expect(onClick).toHaveBeenCalled();
});
