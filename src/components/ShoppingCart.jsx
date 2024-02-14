import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SpanIcon from "./SpanIcon";
import Button from "./Button";
import CartListDisplay from "./CartListDisplay";

function ShoppinCart({ itemList }) {
  const initialItemList = itemList;
  const [status, setStatus] = React.useState("hide");
  const [cartList, setCartList] = React.useState(new Map([...initialItemList]));
  function closeMenu() {
    setStatus("hiding");
    setTimeout(() => {
      setStatus("hide");
    }, 500);
  }

  React.useEffect(() => {
    setCartList(new Map([...initialItemList]));
  }, [initialItemList]);

  function deleteItem(id) {
    const tempMap = new Map([...cartList]);
    const tempCartListObj = JSON.parse(localStorage.getItem("cartList"));
    delete tempCartListObj[id];
    tempMap.delete(id);
    localStorage.setItem("cartList", JSON.stringify(tempCartListObj));
    setCartList(tempMap);
  }

  function openMenu() {
    setStatus("showing");
    setTimeout(() => {
      setStatus("show");
    }, 500);
  }
  return (
    <>
      <div className="cartButtonContainer">
        <Button
          type="button"
          onClick={openMenu}
          label="show shopping cart"
          className=""
        >
          <SpanIcon iconName="shopping_cart" />
        </Button>
        <p data-testid="itemAmmount">{itemList.size}</p>
      </div>
      <div
        className={`shoppingCartContainer ${status}`}
        data-testid="shoppingCartContainer"
      >
        <Button
          type="button"
          onClick={closeMenu}
          label="hide shopping cart"
          className=""
        >
          <SpanIcon iconName="close" />{" "}
        </Button>
        <h2>Tu carro de compras</h2>
        <div className="itemsContainer">
          {cartList.size < 1 ? (
            <p>Todavia no se ha agregado nada</p>
          ) : (
            <>
              <p>
                Posee
                {cartList.size} productos en su carro
              </p>
              <CartListDisplay cartList={cartList} deleteItem={deleteItem} />
            </>
          )}
        </div>
        <Link to="/cart/checkout">Pagar articulos</Link>
      </div>
    </>
  );
}

ShoppinCart.propTypes = {
  itemList: PropTypes.object.isRequired,
};

export default ShoppinCart;
