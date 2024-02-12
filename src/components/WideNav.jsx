import React from "react";
import { Link } from "react-router-dom";
import data from "../assets/data.json";

function WideNav() {
  return (
    <nav className="wideNav">
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
  );
}

export default WideNav;
