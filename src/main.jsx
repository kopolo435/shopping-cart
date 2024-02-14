import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import "./css/app.css";

function populateLocalStorage() {
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  const login = JSON.parse(localStorage.getItem("login"));
  const users = JSON.parse(localStorage.getItem("users"));
  if (cartList === null) {
    localStorage.setItem("cartList", JSON.stringify({}));
  }

  if (login === null) {
    localStorage.setItem("login", "false");
  }

  if (users === null) {
    localStorage.setItem("users", JSON.stringify({}));
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

populateLocalStorage();
