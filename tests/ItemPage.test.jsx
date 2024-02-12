import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import ItemPage from "../src/pages/ItemPage";

it("Adds 1 qty of product to shoopingCart", async () => {
  const addTocart = vi.fn();
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/dulces/1"]}>
      <ItemPage saveToCart={addTocart} />
    </MemoryRouter>
  );

  await setTimeout(() => {}, 2000);

  const quantityInput = screen.getByRole("spinbutton", { name: "cantidad" });
  const addToCartButton = screen.getByRole("button", {
    name: /añadir al carro/i,
  });

  user.type(quantityInput, "1");
  user.click(addToCartButton);

  expect(addTocart).toBeCalledWith("1", "1"); // (id,quantity)
});

it("Doesnt add a negative quantity of product to shoopingCart", () => {
  const addTocart = vi.fn();
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/dulces/1"]}>
      <ItemPage saveToCart={addTocart} />
    </MemoryRouter>
  );

  const quantityInput = screen.getByRole("spinbutton", { name: "cantidad" });
  const addToCartButton = screen.getByRole("button", {
    name: /añadir al carro/i,
  });

  user.type(quantityInput, "-1");
  user.click(addToCartButton);

  expect(addTocart).toBeCalledTimes(0);
});

it("Doesnt add a extreme quantity of product to shoopingCart", () => {
  const addTocart = vi.fn();
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/dulces/1"]}>
      <ItemPage saveToCart={addTocart} />
    </MemoryRouter>
  );

  const quantityInput = screen.getByRole("spinbutton", { name: "cantidad" });
  const addToCartButton = screen.getByRole("button", {
    name: /añadir al carro/i,
  });

  user.type(quantityInput, "1000");
  user.click(addToCartButton);

  expect(addTocart).toBeCalledTimes(0);
});
