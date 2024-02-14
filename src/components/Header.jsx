import React from "react";
import { Link } from "react-router-dom";
import HamburguerMenu from "./HamburguerMenu";
import ShoppinCart from "./ShoppingCart";
import getCartItems from "../javascript/getCartItems";
import data from "../assets/data.json";
import logo from "../assets/img/logo/logoMinimalista.png";

function Header() {
  const [cartList, setCartList] = React.useState(null);

  React.useEffect(() => {
    const tempMap = new Map();
    data.itemList.forEach((item) => {
      tempMap.set(item.id, item);
    });
    setCartList(getCartItems(tempMap));
  }, []);

  return (
    <header>
      <HamburguerMenu />
      <div className="logoContainer">
        <Link to="/">
          <img src={logo} alt="" />
          <span>Arts Delish</span>
        </Link>
      </div>
      {cartList && <ShoppinCart itemList={cartList} />}
    </header>
  );
}

export default Header;
