import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import AddCcForm from "../src/components/AddCcForm";

it("Submits when no errors", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  render(<AddCcForm onSubmit={mock} />);

  const ccNumberInput = screen.getByRole("textbox", {
    name: /Numero de tarjeta[*]/i,
  });
  const ccNameInput = screen.getByRole("textbox", {
    name: /nombre dueño de la tarjeta[*]/i,
  });
  const adressInput = screen.getByRole("textbox", { name: /direccion[*]/i });
  const monthInput = screen.getByRole("spinbutton", { name: /mes[*]/i });
  const añoInput = screen.getByRole("spinbutton", { name: /año[*]/i });
  const submitButton = screen.getByRole("button", { name: /guardar datos/i });

  await user.type(ccNumberInput, "1234-1234-1234-1234");
  await user.type(ccNameInput, "sdsd");
  await user.type(adressInput, "sdd");
  await user.type(monthInput, "2");
  await user.type(añoInput, "2024");
  await user.click(submitButton);

  expect(mock).toBeCalled();
});

it("Doesn't submit on credit card number error", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  render(<AddCcForm onSubmit={mock} />);

  const ccNumberInput = screen.getByRole("textbox", {
    name: /Numero de tarjeta[*]/i,
  });
  const ccNameInput = screen.getByRole("textbox", {
    name: /nombre dueño de la tarjeta[*]/i,
  });
  const adressInput = screen.getByRole("textbox", { name: /direccion[*]/i });
  const monthInput = screen.getByRole("spinbutton", { name: /mes[*]/i });
  const añoInput = screen.getByRole("spinbutton", { name: /año[*]/i });
  const submitButton = screen.getByRole("button", { name: /guardar datos/i });

  await user.type(ccNumberInput, "12");
  await user.type(ccNameInput, "Jhon Doe");
  await user.type(adressInput, "Direccion imaginaria");
  await user.type(monthInput, "12");
  await user.type(añoInput, "2028");
  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});

it("Doesn't submit on credit card owner name  error", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  render(<AddCcForm onSubmit={mock} />);

  const ccNumberInput = screen.getByRole("textbox", {
    name: /Numero de tarjeta[*]/i,
  });
  const ccNameInput = screen.getByRole("textbox", {
    name: /nombre dueño de la tarjeta[*]/i,
  });
  const adressInput = screen.getByRole("textbox", { name: /direccion[*]/i });
  const monthInput = screen.getByRole("spinbutton", { name: /mes[*]/i });
  const añoInput = screen.getByRole("spinbutton", { name: /año[*]/i });
  const submitButton = screen.getByRole("button", { name: /guardar datos/i });

  await user.type(ccNumberInput, "1234-1234-1234-1234");
  await user.type(ccNameInput, "212");
  await user.type(adressInput, "Direccion imaginaria");
  await user.type(monthInput, "12");
  await user.type(añoInput, "2028");
  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});

it("Doesn't submit on address error", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  render(<AddCcForm onSubmit={mock} />);

  const ccNumberInput = screen.getByRole("textbox", {
    name: /Numero de tarjeta[*]/i,
  });
  const ccNameInput = screen.getByRole("textbox", {
    name: /nombre dueño de la tarjeta[*]/i,
  });
  const addressInput = screen.getByRole("textbox", { name: /direccion[*]/i });
  const monthInput = screen.getByRole("spinbutton", { name: /mes[*]/i });
  const añoInput = screen.getByRole("spinbutton", { name: /año[*]/i });
  const submitButton = screen.getByRole("button", { name: /guardar datos/i });

  await user.type(ccNumberInput, "1234-1234-1234-1234");
  await user.type(ccNameInput, "Jhon Doe");
  await user.type(addressInput, "???");
  await user.type(monthInput, "12");
  await user.type(añoInput, "2028");
  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});

it("Doesn't submit on expiration month error", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  render(<AddCcForm onSubmit={mock} />);

  const ccNumberInput = screen.getByRole("textbox", {
    name: /Numero de tarjeta[*]/i,
  });
  const ccNameInput = screen.getByRole("textbox", {
    name: /nombre dueño de la tarjeta[*]/i,
  });
  const adressInput = screen.getByRole("textbox", { name: /direccion[*]/i });
  const monthInput = screen.getByRole("spinbutton", { name: /mes[*]/i });
  const añoInput = screen.getByRole("spinbutton", { name: /año[*]/i });
  const submitButton = screen.getByRole("button", { name: /guardar datos/i });

  await user.type(ccNumberInput, "1234-1234-1234-1234");
  await user.type(ccNameInput, "Jhon Doe");
  await user.type(adressInput, "Direccion imaginaria");
  await user.type(monthInput, "dsfd");
  await user.type(añoInput, "2028");
  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});

it("Doesn't submit on expiration year error", async () => {
  const user = userEvent.setup();
  const mock = vi.fn();
  render(<AddCcForm onSubmit={mock} />);

  const ccNumberInput = screen.getByRole("textbox", {
    name: /Numero de tarjeta[*]/i,
  });
  const ccNameInput = screen.getByRole("textbox", {
    name: /nombre dueño de la tarjeta[*]/i,
  });
  const adressInput = screen.getByRole("textbox", { name: /direccion[*]/i });
  const monthInput = screen.getByRole("spinbutton", { name: /mes[*]/i });
  const añoInput = screen.getByRole("spinbutton", { name: /año[*]/i });
  const submitButton = screen.getByRole("button", { name: /guardar datos/i });

  await user.type(ccNumberInput, "1234-1234-1234-1234");
  await user.type(ccNameInput, "Jhon Doe");
  await user.type(adressInput, "Direccion imaginaria");
  await user.type(monthInput, "12");
  await user.type(añoInput, "fsdf");
  await user.click(submitButton);

  expect(mock).toBeCalledTimes(0);
});
