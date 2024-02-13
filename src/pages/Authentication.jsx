import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Authentication() {
  const { type } = useParams();
  const [notification, setNotification] = React.useState("");
  const navigate = useNavigate();

  function handleRegister(values) {
    const user = JSON.parse(localStorage.getItem("users"));
    const userName = values.get("nombre");
    const userEmail = values.get("correo");
    const userPassword = values.get("password");

    user[userEmail] = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };

    localStorage.setItem("users", JSON.stringify(user));
    setNotification("Registro exitoso, redireccionando a Inicio de sesion");
    setTimeout(() => {
      navigate("/authentication/login");
      setNotification("");
    }, 1000);
  }

  function handleLogin(values) {
    const users = JSON.parse(localStorage.getItem("users"));
    const loginUser = users[values.get("correo")];

    if (!loginUser) {
      setNotification(
        "El correo ingresado no exite, puede registrase si no lo ha hecho"
      );
    } else if (loginUser.password !== values.get("password")) {
      setNotification(
        "La contraseña ingresada es incorrecta, intentelo de nuevo"
      );
    } else {
      setNotification("Inicio de sesion exitoso, redireccionando a Home");
      setTimeout(() => {
        navigate("/");
        setNotification("");
      }, 1000);
    }
  }

  return (
    <>
      <Header />
      <main>
        {notification !== "" && (
          <div className="authNotification">{notification}</div>
        )}
        {type === "login" ? (
          <LoginForm onSubmit={handleLogin} />
        ) : (
          <RegisterForm onSubmit={handleRegister} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default Authentication;
