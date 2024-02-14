import React from "react";
import HamburguerMenu from "./HamburguerMenu";
import ShoppinCart from "./ShoppingCart";
import getCartItems from "../javascript/getCartItems";
import data from "../assets/data.json";

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
      <p>Art Delish</p>
      {cartList && <ShoppinCart itemList={cartList} />}
    </header>
  );
}

export default Header;
