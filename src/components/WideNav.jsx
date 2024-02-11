import React from "react";
import { Link } from "react-router-dom";

function WideNav() {
  return (
    <nav className="wideNav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="category/dulces">Dulces</Link>
        </li>
        <li>
          <Link to="category/cupcakes">Cupcakes</Link>
        </li>
        <li>
          <Link to="category/postresHelados">Postres helados</Link>
        </li>
        <li>
          <Link to="category/kpops">K-pops</Link>
        </li>
      </ul>
    </nav>
  );
}

export default WideNav;
