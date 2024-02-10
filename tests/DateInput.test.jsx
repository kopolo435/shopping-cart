import { getByTestId, render, screen, fireEvent } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { act } from "react-dom/test-utils";
import React from "react";
import userEvent from "@testing-library/user-event";
import DateInput from "../src/components/DateInput";
import { dateInputTest } from "../src/javascript/inputValidation";

it("Renders date input right", () => {
  const { container } = render(
    <DateInput
      label="Fecha"
      name="expiracion"
      updateFormErrors={() => {}}
      updateFormValues={() => {}}
      validation={dateInputTest}
    />
  );

  expect(container).toMatchFileSnapshot("./__snapshots__/DateInput.html");
});

it("Calls updateFormError and UpdateFormValues on an error", async () => {
  const mock1Fn = vi.fn(() => {});
  const mock2Fn = vi.fn(() => {});
  render(
    <DateInput
      label="Fecha"
      name="expiracion"
      updateFormErrors={mock1Fn}
      updateFormValues={mock2Fn}
      validation={dateInputTest}
    />
  );

  const input = screen.getByTestId("expiracion");

  act(() => {
    fireEvent.change(input, { target: { value: "2015-12-10" } });
  });

  expect(mock1Fn).toHaveBeenCalled();
  expect(mock2Fn).toHaveBeenCalled();
});

it("Calls updateFormValues on input change", async () => {
  const mockFn = vi.fn(() => {});
  render(
    <DateInput
      label="Fecha"
      name="expiracion"
      updateFormErrors={() => {}}
      updateFormValues={mockFn}
      validation={dateInputTest}
    />
  );

  const input = screen.getByTestId("expiracion");
  act(() => {
    fireEvent.change(input, { target: { value: "2015-12-10" } });
  });

  expect(mockFn).toHaveBeenCalled();
});

it("Shows alert on an error", async () => {
  render(
    <DateInput
      label="Fecha"
      name="expiracion"
      updateFormErrors={() => {}}
      updateFormValues={() => {}}
      validation={dateInputTest}
    />
  );

  const input = screen.getByTestId("expiracion");

  act(() => {
    fireEvent.change(input, { target: { value: "2015-12-10" } });
  });

  expect(screen.getByRole("alert").textContent.length > 0).toBe(true);
});
