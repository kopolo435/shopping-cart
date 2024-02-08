import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HamburguerMenu from "../src/components/HamburguerMenu";

it("Renders hidden menu", () => {
  render(
    <MemoryRouter>
      <HamburguerMenu />
    </MemoryRouter>
  );
  expect(screen.getByTestId("menuContainer").classList.contains("hide")).toBe(
    true
  );
});

it("Renders menu open when Open Button is clicked", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <HamburguerMenu />
    </MemoryRouter>
  );

  const button = screen.getByRole("button", { name: "open sidebar" });
  await user.click(button);

  expect(
    screen.getByTestId("menuContainer").classList.contains("showing")
  ).toBe(true);

  await setTimeout(() => {
    expect(screen.getByTestId("menuContainer").classList.contains("show")).toBe(
      true
    );
  }, 1000);
});

it("Renders menu close when Close Button clicked", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <HamburguerMenu />
    </MemoryRouter>
  );

  const button = screen.getByRole("button", { name: "open sidebar" });
  await user.click(button);

  await setTimeout(() => {
    expect(screen.getByTestId("menuContainer").classList.contains("show")).toBe(
      true
    );
  }, 1000);

  const closeButton = screen.getByRole("button", { name: "close sidebar" });
  await user.click(closeButton);

  expect(screen.getByTestId("menuContainer").classList.contains("hiding")).toBe(
    true
  );

  await setTimeout(() => {
    expect(screen.getByTestId("menuContainer").classList.contains("hide")).toBe(
      true
    );
  }, 1000);
});
