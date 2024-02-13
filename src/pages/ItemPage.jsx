import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import data from "../assets/data.json";
import ShoppinCart from "../components/ShoppingCart";

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

function saveInLocalStorage(id, quantity) {
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  if (cartList[id] !== undefined) {
    cartList[id] = Number(cartList[id]) + Number(quantity);
  } else {
    cartList[id] = quantity;
  }
  localStorage.setItem("cartList", JSON.stringify(cartList));
}

function ItemPage({ saveToCart }) {
  const [itemMap, setItemMap] = React.useState(new Map());
  const [cartList, setCartList] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const { id } = useParams();
  React.useEffect(() => {
    const tempMap = new Map();
    data.itemList.forEach((item) => {
      tempMap.set(item.id, item);
    });
    setItemMap(tempMap);
    setCartList(getCartItems(tempMap));
  }, []);

  function handleClick() {
    if (quantity > 0 && quantity < 1000) {
      saveToCart(id, quantity);
      setCartList(getCartItems(itemMap));
    }
  }
  const itemData = itemMap.get(id) ? itemMap.get(id) : null;
  return (
    <>
      <Header />
      {itemData ? (
        <main>
          <div className="itemImg">
            <img src={itemData.img} alt="" />
          </div>
          <div className="itemInformation">
            <h1>{itemData.cardTitle}</h1>
            <p>{itemData.longDescription}</p>
          </div>
          <div className="addTocart">
            <label htmlFor="quantity">
              Cantidad
              <input
                id="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                min={0}
                max={999}
              />
            </label>
            <Button type="button" className="" onClick={() => handleClick()}>
              Añadir al carro
            </Button>
          </div>
        </main>
      ) : (
        <main>
          <p>Cargando informacion</p>
        </main>
      )}
      <Footer />
    </>
  );
}

ItemPage.propTypes = {
  saveToCart: PropTypes.func,
};

ItemPage.defaultProps = {
  saveToCart: saveInLocalStorage,
};

export default ItemPage;
