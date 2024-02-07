import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";

const testData = {
  name: "Cakes",
  description: "Los mejores pasteles",
  link: "/cakes",
  img: "#",
};

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CategoryCard data={testData} />,
    },
    {
      path: "profile",
      element: <CategoryCard data={testData} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
