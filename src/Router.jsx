import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErroPage";
import ItemPage from "./pages/ItemPage";
import Checkout from "./pages/Checkout";
import Authentication from "./pages/Authentication";

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
    {
      path: "/authentication/:type",
      element: <Authentication />,
    },
    {
      path: "/cart/checkout",
      element: <Checkout />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
