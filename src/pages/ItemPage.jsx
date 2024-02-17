import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import data from "../assets/data.json";
import getCartItems from "../javascript/getCartItems";
import WideNav from "../components/WideNav";
import ImgCarousell from "../components/ImgCarousell";
import SpanIcon from "../components/SpanIcon";

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
  const [cartList, setCartList] = React.useState(new Map());
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
      <Header
        initialCartList={cartList}
        initialIsLogin={JSON.parse(localStorage.getItem("login"))}
      />
      <WideNav />
      {itemData ? (
        <main className="itemInfoContainer">
          <div className="imgCarousellContainer">
            <ImgCarousell imgList={itemData.imgList} />
          </div>
          <div className="itemContainer">
            <div className="itemInformation">
              <h1 className="roboto-condensed-600">{itemData.cardTitle}</h1>
              <p className="roboto-condensed-400">{itemData.longDescription}</p>
              <p className="roboto-condensed-400">
                Precio:
                <span>{` $${itemData.price}`}</span>
              </p>
            </div>
            <div className="addToCart">
              <label htmlFor="quantity" className="roboto-condensed-400">
                Cantidad
                <input
                  id="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  placeholder="1"
                  min={0}
                  max={999}
                />
              </label>
              <Button
                type="button"
                className="addToCartButton roboto-condensed-600"
                onClick={() => handleClick()}
              >
                <SpanIcon iconName="add_shopping_cart" />
                Añadir al carro
              </Button>
            </div>
          </div>
        </main>
      ) : (
        <main className="roboto-condensed-400">
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
