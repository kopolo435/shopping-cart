import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import SpanIcon from "./SpanIcon";
import data from "../assets/data.json";

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
        className={`hamburguerContaiener ${status}`}
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
      </div>
    </>
  );
}

export default HamburguerMenu;
