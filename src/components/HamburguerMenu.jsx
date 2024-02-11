import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SpanIcon from "./SpanIcon";

function HamburguerMenu() {
  const [status, setStatus] = React.useState("hide");

  const buttonData = {};

  function closeMenu() {
    setStatus("hiding");
    setTimeout(() => {
      setStatus("hide");
    }, 500);
  }

  function openMenu() {
    setStatus("showing");
    setTimeout(() => {
      setStatus("show");
    }, 500);
  }

  if (status === "hide" || status === "hiding") {
    buttonData.content = <SpanIcon iconName="open" />;
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
        className="sideBarBtn"
        label={buttonData.name}
      >
        {buttonData.content}
      </Button>
      <div data-testid="menuContainer" className={`sideBarContainer ${status}`}>
        <nav className="sideBarContent">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dulces">Dulces</Link>
            </li>
            <li>
              <Link to="/cupcakes">Cupcakes</Link>
            </li>
            <li>
              <Link to="/postresHelados">Postres helados</Link>
            </li>
            <li>
              <Link to="/kpops">K-pops</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default HamburguerMenu;
