import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";
import LoginForm from "./components/LoginForm";

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
      element: (
        <LoginForm
          onSubmit={() => {
            console.log("hola");
          }}
        />
      ),
    },
    {
      path: "profile",
      element: <CategoryCard data={testData} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
