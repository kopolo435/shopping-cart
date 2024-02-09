import { getByTestId, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import ShoppinCart from "../src/components/ShoppingCart";

it("Renders shoppingCard hidden", () => {
  const items = new Map();
  const mockFn = vi.fn(() => {});
  render(<ShoppinCart itemList={items} deleteItem={mockFn} />);
  expect(
    screen.getByTestId("shoppingCartContainer").classList.contains("hide")
  ).toBe(true);
});

it("Renders ammount of items in shopping cart", () => {
  const items = new Map();
  const mockFn = vi.fn(() => {});
  items.set("1", {
    name: "cake1",
    quantity: 12,
    description: "Este item es muy bueno",
    id: "1",
    img: "url/test1",
    alt: "",
  });
  items.set("2", {
    name: "cake2",
    quantity: 12,
    description: "Este item es muy bueno",
    id: "2",
    img: "url/test2",
    alt: "",
  });

  render(<ShoppinCart itemList={items} deleteItem={mockFn} />);

  expect(screen.getByTestId("itemAmmount").textContent).toBe("2");
});

it("Renders shopping cart open when open button is clicked", async () => {
  const user = userEvent.setup();
  const mockFn = vi.fn(() => {});
  const items = new Map();
  render(<ShoppinCart itemList={items} deleteItem={mockFn} />);

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
  const mockFn = vi.fn(() => {});
  const items = new Map();
  render(<ShoppinCart itemList={items} deleteItem={mockFn} />);

  const showButton = screen.getByRole("button", { name: "show shopping cart" });

  await user.click(showButton);

  const closeButton = screen.getByRole("button", {
    name: "hide shopping cart",
  });

  await user.click(closeButton);

  expect(
    screen.getByTestId("shoppingCartContainer").classList.contains("hiding")
  ).toBe(true);

  await (() => {
    expect(
      screen.getByTestId("shoppingCartContainer").classList.contains("hide")
    ).toBe(true);
  },
  1000);
});
