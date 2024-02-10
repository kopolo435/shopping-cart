import { getByTestId, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import { node } from "prop-types";
import TextInput from "../src/components/TextInput";

it("renders input right", () => {
  const { container } = render(
    <TextInput
      type="text"
      label="Nombre"
      name="nombre"
      updateFormErrors={() => {}}
      updateFormValues={() => {}}
      validation={() => {}}
    />
  );

  expect(container).toMatchSnapshot();
});

it("Calls updateFormError and UpdateFormValues on an error", async () => {
  const mock1Fn = vi.fn(() => {});
  const mock2Fn = vi.fn(() => {});
  const user = userEvent.setup();
  render(
    <TextInput
      type="text"
      label="Nombre"
      name="nombre"
      updateFormErrors={mock1Fn}
      updateFormValues={mock2Fn}
      validation={() => "Hay un error grave"}
    />
  );

  const input = screen.getByRole("textbox", { name: "Nombre*" });

  await user.type(input, "1231");

  expect(mock1Fn).toHaveBeenCalled();
  expect(mock2Fn).toHaveBeenCalled();
});

it("Calls updateFormValues on input change", async () => {
  const mockFn = vi.fn(() => {});
  const user = userEvent.setup();
  render(
    <TextInput
      type="text"
      label="Nombre"
      name="nombre"
      updateFormErrors={() => {}}
      updateFormValues={mockFn}
      validation={() => ""}
    />
  );

  const input = screen.getByRole("textbox", { name: "Nombre*" });

  await user.type(input, "Jose");

  expect(mockFn).toBeCalled();
});

it("Shows alert on an error", async () => {
  const user = userEvent.setup();
  render(
    <TextInput
      type="text"
      label="Nombre"
      name="nombre"
      updateFormErrors={() => {}}
      updateFormValues={() => {}}
      validation={() => "Hay un error grave"}
    />
  );

  const input = screen.getByRole("textbox", { name: "Nombre*" });

  await user.type(input, "1231");

  expect(screen.getByRole("alert").textContent.length > 0).toBe(true);
});
