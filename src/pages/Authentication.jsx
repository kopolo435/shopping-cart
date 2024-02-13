import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Authentication() {
  const { type } = useParams();

  return (
    <>
      <Header />
      <main>{type === "login" ? <LoginForm /> : <RegisterForm />}</main>
      <Footer />
    </>
  );
}

export default Authentication;
