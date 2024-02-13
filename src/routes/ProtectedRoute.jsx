import React from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLogin = JSON.parse(localStorage.getItem("login"));
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLogin) {
      navigate("/session-timed-out", { replace: true });
    }
  }, [isLogin]);

  return children;
}

export default ProtectedRoute;
