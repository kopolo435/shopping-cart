import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErroPage";

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
      path: "profile",
      element: <CategoryCard data={testData} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
