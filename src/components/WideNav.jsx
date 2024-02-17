import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import data from "../assets/data.json";

function isChosenPage(linkName, currentPage) {
  return linkName === currentPage ? "chosenLinkNav" : "";
}

function WideNav() {
  const { name } = useParams();
  const location = useLocation();
  return (
    <nav className="wideNav">
      <ul>
        <li>
          <Link to="/" className={isChosenPage("/", location.pathname)}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to={data.categoryInfo.dulces.pageLink}
            className={isChosenPage("dulces", name)}
          >
            Dulces
          </Link>
        </li>
        <li>
          <Link
            to={data.categoryInfo.cupcakes.pageLink}
            className={isChosenPage("cupcakes", name)}
          >
            Cupcakes
          </Link>
        </li>
        <li>
          <Link
            to={data.categoryInfo.postreshelados.pageLink}
            className={isChosenPage("postreshelados", name)}
          >
            Postres helados
          </Link>
        </li>
        <li>
          <Link
            to={data.categoryInfo.kpops.pageLink}
            className={isChosenPage("kpops", name)}
          >
            K-pops
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default WideNav;
