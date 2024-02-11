import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErroPage";
import ItemPage from "./pages/ItemPage";

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
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/:name",
      element: <CategoryPage />,
    },
    {
      path: "/:name/:id",
      element: <ItemPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
