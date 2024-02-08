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
    buttonData.content = <SpanIcon iconName="close" />;
    buttonData.name = "open sidebar";
    buttonData.func = openMenu;
  } else {
    buttonData.content = <SpanIcon iconName="close" />;
    buttonData.name = "close sidebar";
    buttonData.func = closeMenu;
  }
  return (
    <div data-testid="menuContainer" className={`sideBarContainer ${status}`}>
      <Button
        type="button"
        onClick={buttonData.func}
        content={buttonData.content}
        className="sideBarBtn"
        label={buttonData.name}
      />
      <nav className="sideBarContent">
        <Link to="#">Home</Link>
        <Link to="#">Dulces</Link>
        <Link to="#">Cupcakes</Link>
        <Link to="#">Postres Helados</Link>
        <Link to="#">K-pop</Link>
      </nav>
    </div>
  );
}

export default HamburguerMenu;
