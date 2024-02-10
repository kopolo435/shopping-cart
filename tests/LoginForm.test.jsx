import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../src/components/LoginForm";

it("Form submits when no errors", async () => {
  const mock = vi.fn(() => {});
  render(<LoginForm onSubmit={mock} />);
  const user = userEvent.setup();

  const button = screen.getByRole("button", { name: /iniciar sesion/i });
  const correoInput = screen.getByRole("textbox", { name: /correo[*]/i });
  const passwordInput = screen.getByLabelText("Contraseña*");

  await user.type(correoInput, "correo@gmail.com");
  await user.type(passwordInput, "12345678");

  await user.click(button);
  expect(mock).toHaveBeenCalled();
});

it("Form doesn't submits when there are errors", async () => {
  const mock = vi.fn(() => {});
  render(<LoginForm onSubmit={mock} />);
  const user = userEvent.setup();

  const button = screen.getByRole("button", { name: /iniciar sesion/i });

  await user.click(button);
  expect(mock).toBeCalledTimes(0);
});
