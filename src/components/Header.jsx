import React from "react";
import { Link } from "react-router-dom";
import HamburguerMenu from "./HamburguerMenu";
import ShoppinCart from "./ShoppingCart";
import getCartItems from "../javascript/getCartItems";
import data from "../assets/data.json";
import logo from "../assets/img/logo/logoMinimalista.png";

function Header({ initialCartList }) {
  const [cartList, setCartList] = React.useState(null);

  function deleteItem(id) {
    const tempMap = new Map([...cartList]);
    const tempCartListObj = JSON.parse(localStorage.getItem("cartList"));
    delete tempCartListObj[id];
    tempMap.delete(id);
    localStorage.setItem("cartList", JSON.stringify(tempCartListObj));
    setCartList(tempMap);
  }

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
      <HamburguerMenu />
      <div className="logoContainer">
        <Link to="/">
          <img src={logo} alt="" />
          <span>Arts Delish</span>
        </Link>
      </div>
      {cartList && <ShoppinCart itemList={cartList} deleteItem={deleteItem} />}
    </header>
  );
}

export default Header;
