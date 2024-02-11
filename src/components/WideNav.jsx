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
  );
}

export default WideNav;
