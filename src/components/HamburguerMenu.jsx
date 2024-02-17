import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SpanIcon from "./SpanIcon";
import data from "../assets/data.json";

function HamburguerMenu({ initialIsLogin }) {
  const [status, setStatus] = React.useState("hide");
  const [timeoutId, setTimeoutId] = React.useState(null);
  const [logOut, setLogOut] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(initialIsLogin);

  function handleLogOut() {
    localStorage.setItem("login", "false");
    localStorage.setItem("loginUser", "");
    setLogOut(true);
    setIsLogin(false);
  }

  React.useEffect(() => {
    if (logOut) {
      // Check if logOut is true
      setLogOut(false); // Reset logOut to false
    }
  }, [logOut]); // useEffect depends on logOut state

  const buttonData = {};

  function closeMenu() {
    setStatus("hiding");
    clearTimeout(timeoutId); // Clear any existing timeout
    const newTimeoutId = setTimeout(() => {
      setStatus("hide");
    }, 500);
    setTimeoutId(newTimeoutId); // Save the new timeout ID
  }

  function openMenu() {
    setStatus("showing");
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(() => {
      setStatus("show");
    }, 100);
    setTimeoutId(newTimeoutId);
  }

  if (status === "hide" || status === "hiding") {
    buttonData.content = <SpanIcon iconName="menu" />;
    buttonData.name = "open sidebar";
    buttonData.func = openMenu;
  } else {
    buttonData.content = <SpanIcon iconName="close" />;
    buttonData.name = "close sidebar";
    buttonData.func = closeMenu;
  }
  return (
    <>
      <Button
        type="button"
        onClick={buttonData.func}
        className="toogleHamburguerMenu"
        label={buttonData.name}
      >
        {buttonData.content}
      </Button>
      <div
        data-testid="menuContainer"
        className={`hamburguerContainer ${status}`}
      >
        <nav className="hamburguerNav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={data.categoryInfo.dulces.pageLink}>Dulces</Link>
            </li>
            <li>
              <Link to={data.categoryInfo.cupcakes.pageLink}>Cupcakes</Link>
            </li>
            <li>
              <Link to={data.categoryInfo.postreshelados.pageLink}>
                Postres helados
              </Link>
            </li>
            <li>
              <Link to={data.categoryInfo.kpops.pageLink}>K-pops</Link>
            </li>
          </ul>
        </nav>
        <div className="hamburguerActions">
          {!isLogin ? (
            <>
              <Link
                to="/authentication/login"
                className="hamburguerAuth loginHamburguer"
              >
                Iniciar sesion
              </Link>
              <Link
                to="/authentication/singup"
                className="hamburguerAuth singupHamburguer"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <Button
              type="button"
              className="logOutHamburguer"
              onClick={() => handleLogOut()}
            >
              Cerrar sesion
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default HamburguerMenu;
