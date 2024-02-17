import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import WideNav from "../components/WideNav";

function Authentication() {
  const { type } = useParams();
  const [notification, setNotification] = React.useState("");
  const [didLogIng, setDidLogin] = React.useState(
    JSON.parse(localStorage.getItem("login"))
  );
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
    setDidLogin(true);
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
      localStorage.setItem("login", JSON.stringify("true"));
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      setTimeout(() => {
        navigate("/");
        setNotification("");
      }, 1000);
    }
  }

  return (
    <>
      <Header initialIsLogin={didLogIng} />
      <WideNav />
      <main className="authMain">
        {type === "login" ? (
          <div className="formContainer">
            <h1>Iniciar sesion</h1>
            <LoginForm onSubmit={handleLogin} />
            <p>
              No tienes una cuenta?{" "}
              <Link to="/authentication/singup">Registrate aqui</Link>
            </p>
          </div>
        ) : (
          <div className="formContainer">
            <h1>Registrarse</h1>
            <RegisterForm onSubmit={handleRegister} />
            <p>
              Ya te registrarste?{" "}
              <Link to="/authentication/login">Inicia sesion aqui</Link>
            </p>
          </div>
        )}
        {notification !== "" && (
          <div className="authNotification">
            <p>{notification}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Authentication;
