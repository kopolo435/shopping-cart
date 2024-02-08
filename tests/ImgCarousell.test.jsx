import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import React from "react";
import userEvent from "@testing-library/user-event";
import ImgCarousell from "../src/components/ImgCarousell";

it("Carousell renders right", () => {
  const imgData = [
    { title: "img1", src: "url/sitio1", alt: "Imagen 1" },
    { title: "img2", src: "url/sitio2", alt: "Imagen 2" },
    { title: "img3", src: "url/sitio3", alt: "Imagen 3" },
  ];

  const { container } = render(<ImgCarousell imgList={imgData} />);
  expect(container).toMatchSnapshot();
});

it("Shows correct img", () => {
  const imgData = [
    { title: "img1", src: "./url/sitio1", alt: "Imagen 1" },
    { title: "img2", src: "./url/sitio2", alt: "Imagen 2" },
    { title: "img3", src: "./url/sitio3", alt: "Imagen 3" },
  ];
  render(<ImgCarousell imgList={imgData} />);

  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio1"
  );
  expect(screen.getByTestId("currentImgTitle").textContent).toBe("img1");
});

it("Move to the right button shows correct img", async () => {
  const imgData = [
    { title: "img1", src: "http://localhost:3000/url/sitio1", alt: "Imagen 1" },
    { title: "img2", src: "http://localhost:3000/url/sitio2", alt: "Imagen 2" },
    { title: "img3", src: "http://localhost:3000/url/sitio3", alt: "Imagen 3" },
  ];
  const user = userEvent.setup();
  render(<ImgCarousell imgList={imgData} />);

  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio1"
  );

  const button = screen.getByRole("button", { name: "show next image" });
  await user.click(button);
  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio2"
  );
  await user.click(button);
  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio3"
  );
  await user.click(button);
  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio1"
  );
});

it("Move to the left button shows correct img", async () => {
  const imgData = [
    { title: "img1", src: "http://localhost:3000/url/sitio1", alt: "Imagen 1" },
    { title: "img2", src: "http://localhost:3000/url/sitio2", alt: "Imagen 2" },
    { title: "img3", src: "http://localhost:3000/url/sitio3", alt: "Imagen 3" },
  ];
  const user = userEvent.setup();
  render(<ImgCarousell imgList={imgData} />);

  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio1"
  );

  const button = screen.getByRole("button", { name: "show previous image" });
  await user.click(button);
  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio3"
  );
  await user.click(button);
  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio2"
  );
  await user.click(button);
  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio1"
  );
});

it("Choose img button show correct img", async () => {
  const imgData = [
    { title: "img1", src: "./url/sitio1", alt: "Imagen 1" },
    { title: "img2", src: "./url/sitio2", alt: "Imagen 2" },
    { title: "img3", src: "./url/sitio3", alt: "Imagen 3" },
  ];
  const user = userEvent.setup();
  render(<ImgCarousell imgList={imgData} />);

  const showImgButtons = screen.getAllByRole("button", {
    name: /.+[\d]+/im,
  });

  await user.click(showImgButtons[2]);
  expect(screen.getByTestId("currentImg").src).toBe(
    "http://localhost:3000/url/sitio3"
  );
  expect(screen.getByTestId("currentImgTitle").textContent).toBe("img3");
});
