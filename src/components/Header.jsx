import React from "react";
import { Link } from "react-router-dom";
import HamburguerMenu from "./HamburguerMenu";
import ShoppinCart from "./ShoppingCart";
import getCartItems from "../javascript/getCartItems";
import data from "../assets/data.json";
import logo from "../assets/img/logo/logoMinimalista.png";
import Button from "./Button";

function Header({ initialCartList, initialIsLogin }) {
  const [cartList, setCartList] = React.useState(null);
  const [logOut, setLogOut] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(initialIsLogin);

  function deleteItem(id) {
    const tempMap = new Map([...cartList]);
    const tempCartListObj = JSON.parse(localStorage.getItem("cartList"));
    delete tempCartListObj[id];
    tempMap.delete(id);
    localStorage.setItem("cartList", JSON.stringify(tempCartListObj));
    setCartList(tempMap);
  }

  function handleLogOut() {
    localStorage.setItem("login", "false");
    localStorage.setItem("loginUser", "");
    setLogOut(true);
    setIsLogin(false);
  }

  React.useEffect(() => {
    if (logOut) {
      // Check if logOut is true
      setIsLogin(false); // Update isLogin to false
      setLogOut(false); // Reset logOut to false
    }
  }, [logOut]); // useEffect depends on logOut state

  React.useEffect(() => {
    if (!initialCartList) {
      const tempMap = new Map();
      data.itemList.forEach((item) => {
        tempMap.set(item.id, item);
      });
      setCartList(getCartItems(tempMap));
    } else {
      setCartList(getCartItems(initialCartList));
    }
  }, [initialCartList]);
  return (
    <header>
      <HamburguerMenu initialIsLogin={initialIsLogin} />
      <div className="logoContainer">
        <Link to="/" className="headerLink">
          <img src={logo} alt="" />
          <span className="headerLinkText">Arts Delish</span>
        </Link>
      </div>
      <div className="headerActions">
        {!isLogin ? (
          <>
            <Link to="/authentication/login" className="headerAuth login">
              Iniciar sesion
            </Link>
            <Link to="/authentication/singup" className="headerAuth singup">
              Registrarse
            </Link>
          </>
        ) : (
          <Button
            type="button"
            className="logOutHeader"
            onClick={() => handleLogOut()}
          >
            Cerrar sesion
          </Button>
        )}
        {cartList && (
          <ShoppinCart itemList={cartList} deleteItem={deleteItem} />
        )}
      </div>
    </header>
  );
}

export default Header;
