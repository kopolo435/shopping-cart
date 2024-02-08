import { getByTestId, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import ShoppinCart from "../src/components/ShoppingCart";

it("Renders shoppingCard hidden", () => {
  render(<ShoppinCart />);
  expect(getByTestId("shoppingCartContainer").classList.contains("hide")).toBe(
    true
  );
});

it("Renders ammount of items in shopping cart", () => {
  const items = new Map();
  items.set("1", { name: "cake1" });
  items.set("2", { name: "cake2" });

  render(<ShoppinCart items={items} />);

  expect(screen.getByRole("paragraph").textContent).toBe("2");
});

it("Renders shopping cart open when open button is clicked", async () => {
  const user = userEvent.setup();
  render(<ShoppinCart />);

  const button = screen.getByRole("button", { name: "show shopping cart" });

  await user.click(button);
  expect(
    screen.getByTestId("shoppingCartContainer").classList.contains("showing")
  ).toBe(true);

  await (() => {
    screen.getByTestId("shoppingCartContainer").classList.contains("show");
  },
  1000);
});

it("Renders shopping cart close when close button is clicked", async () => {
  const user = userEvent.setup();
  render(<ShoppinCart />);

  const showButton = screen.getByRole("button", { name: "open shopping cart" });

  await user.click(showButton);

  const closeButton = screen.getByRole("button", {
    name: "hide shopping cart",
  });

  await user.click(closeButton);

  expect(
    screen.getByTestId("shoppingCartContainer").classList.contains("hiding")
  ).toBe(true);

  await (() => {
    screen.getByTestId("shoppingCartContainer").classList.contains("hide");
  },
  1000);
});
