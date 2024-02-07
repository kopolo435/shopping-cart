import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import CategoryCard from "../src/components/CategoryCard";

it("Renders correct Link card", () => {
  const testData = {
    name: "Cakes",
    description: "Los mejores pasteles",
    link: "/cakes",
    img: "#",
  };
  const { container } = render(
    <MemoryRouter>
      <CategoryCard data={testData} />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});
