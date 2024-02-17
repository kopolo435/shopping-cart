import { Link } from "react-router-dom";
import React from "react";

function ErrorPage() {
  return (
    <div>
      <h1 className="roboto-condensed-600">Esta pagina no exitste</h1>
      <Link to="/" className="roboto-condensed-400">
        Volver a la pagina principal
      </Link>
    </div>
  );
}

export default ErrorPage;
