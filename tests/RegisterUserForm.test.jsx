import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import RegisterUserForm from "../src/components/RegisterForm";

it("Form submits when no errors", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();

  render(<RegisterUserForm onSubmit={mock} />);

  const emailInput = screen.getByRole("textbox", { name: /correo[*]/i });
  const password = screen.getByLabelText("Contraseña*");
  const confirmPassword = screen.getByLabelText("Confirmar contraseña*");
  const submitButton = screen.getByRole("button", { name: /registrarse/i });

  await user.type(emailInput, "corre@gmail.com");
  await user.type(password, "12345678");
  await user.type(confirmPassword, "12345678");

  await user.click(submitButton);

  expect(mock).toBeCalled();
});

it("Form doesn't submitt on email errors", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();

  render(<RegisterUserForm onSubmit={mock} />);

  const emailInput = screen.getByRole("textbox", { name: /correo[*]/i });
  const password = screen.getByLabelText("Contraseña*");
  const confirmPassword = screen.getByLabelText("Confirmar contraseña*");
  const submitButton = screen.getByRole("button", { name: /registrarse/i });

  await user.type(emailInput, "corre@gma");
  await user.type(password, "12345678");
  await user.type(confirmPassword, "12345678");

  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});

it("Form doesn't submitt on password errors", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();

  render(<RegisterUserForm onSubmit={mock} />);

  const emailInput = screen.getByRole("textbox", { name: /correo[*]/i });
  const password = screen.getByLabelText("Contraseña*");
  const confirmPassword = screen.getByLabelText("Confirmar contraseña*");
  const submitButton = screen.getByRole("button", { name: /registrarse/i });

  await user.type(emailInput, "corre@gmail.com");
  await user.type(password, "12345");
  await user.type(confirmPassword, "12345678");

  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});

it("Form doesn't submitt on confirm password errors", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();

  render(<RegisterUserForm onSubmit={mock} />);

  const emailInput = screen.getByRole("textbox", { name: /correo[*]/i });
  const password = screen.getByLabelText("Contraseña*");
  const confirmPassword = screen.getByLabelText("Confirmar contraseña*");
  const submitButton = screen.getByRole("button", { name: /registrarse/i });

  await user.type(emailInput, "corre@gmail.com");
  await user.type(password, "12345678");
  await user.type(confirmPassword, "123");

  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});
