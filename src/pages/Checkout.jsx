import React from "react";
import data from "../assets/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShoppinCart from "../components/ShoppingCart";
import CardDisplay from "../components/CardDisplay";

function getCartItems(itemMap) {
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  const cartListMap = new Map();

  Object.keys(cartList).forEach((key) => {
    const value = cartList[key];
    const itemData = { ...itemMap.get(key), quantity: value };
    cartListMap.set(key, itemData);
  });

  return cartListMap;
}

function Checkout() {
  const [itemMap, setItemMap] = React.useState(new Map());
  const [cartList, setCartList] = React.useState(new Map());
  let totalPrice = 0;
  let taxValue = 0;
  React.useEffect(() => {
    const tempMap = new Map();
    data.itemList.forEach((item) => {
      tempMap.set(item.id, item);
    });
    setItemMap(tempMap);
    setCartList(getCartItems(tempMap));
  }, []);

  if (cartList.size > 0) {
    const itemsPriceArray = Array.from(cartList.values()).map(
      (item) => item.price
    );
    totalPrice = itemsPriceArray.reduce((accumulator, currentItem) => {
      const value =
        Number(currentItem.price) * Number(currentItem.quantity) + accumulator;
      return value;
    });
    taxValue = Number(totalPrice) * 0.07;
  }

  return (
    <>
      <Header />
      {cartList.size > 0 ? (
        <main>
          <h1>Articulos en el carro</h1>
          <ShoppinCart itemList={cartList} />
          <div className="paymentInfo">
            <h2>Tarjeta de credio a usar</h2>
            <h2>Precio total a pagar</h2>
            <p>
              Productos:
              <span>{` ${totalPrice}`}</span>
            </p>
            <p>
              Impuestos:
              <span>{` ${taxValue}`}</span>
            </p>
            <p>
              Total a pagar:
              <span>{` ${Number(totalPrice) + Number(taxValue)}`}</span>
            </p>
          </div>
        </main>
      ) : (
        <main>Cargando informacion</main>
      )}
      <Footer />
    </>
  );
}

export default Checkout;
