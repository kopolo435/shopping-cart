import { getByTestId, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import ShoppingItem from "../src/components/ShoppingItem";

it("Renders element right", () => {
  const testItem = {
    quantity: 12,
    name: "Test Item",
    description: "Este item es muy bueno",
    id: "1",
    img: "url/test1",
    alt: "",
  };
  const setItemsList = vi.fn();
  const { container } = render(
    <ShoppingItem item={testItem} deleteItem={setItemsList} />
  );
  expect(container).toMatchFileSnapshot("./__snapshots__/itemList.html");
});

it("Shows correct information of item", () => {
  const testItem = {
    quantity: 12,
    name: "Test Item",
    description: "Este item es muy bueno",
    id: "1",
    img: "url/test1",
    alt: "",
  };
  const setItemsList = vi.fn();
  render(<ShoppingItem item={testItem} deleteItem={setItemsList} />);

  expect(screen.getByRole("heading", { name: "Test Item" }).textContent).toBe(
    "Test Item"
  );
  expect(screen.getByText("12 unidades").textContent).toBe("12 unidades");
  expect(screen.getByRole("img").src).toBe("http://localhost:3000/url/test1");
});

it("Delete button handles the passed function", async () => {
  const testItem = {
    quantity: 12,
    name: "Test Item",
    description: "Este item es muy bueno",
    id: "1",
    img: "url/test1",
    alt: "",
  };
  const setItemsList = vi.fn(() => {});
  const user = userEvent.setup();
  render(<ShoppingItem item={testItem} deleteItem={setItemsList} />);

  const deleteButton = screen.getByRole("button", {
    name: "eliminar item del carro",
  });

  await user.click(deleteButton);
  expect(setItemsList).toHaveBeenCalled();
});
