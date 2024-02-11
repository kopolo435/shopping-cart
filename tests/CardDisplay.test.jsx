import { getByRole, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import CardDisplay from "../src/components/CardDisplay";

it("Renders message to add credit card", () => {
  const mock = vi.fn();
  render(<CardDisplay addCardOnclick={mock} />);

  expect(
    screen.getByRole("button", { name: "Agregar tarjeta de credito" })
  ).toBeTruthy();
});

it("Renders credit card container", () => {
  const mock = vi.fn();
  const user = userEvent.setup();
  render(<CardDisplay cardData={{ number: "1234" }} addCardOnclick={mock} />);

  expect(screen.getByTestId("cardContainer")).toBeTruthy();
});

it("Calls onCLick function when add Credit card button is clicked", async () => {
  const mock = vi.fn();
  const user = userEvent.setup();
  render(<CardDisplay addCardOnclick={mock} />);

  const addCardButton = screen.getByRole("button", {
    name: "Agregar tarjeta de credito",
  });

  await user.click(addCardButton);

  expect(mock).toBeCalled();
});
