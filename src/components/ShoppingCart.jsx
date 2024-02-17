import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SpanIcon from "./SpanIcon";
import Button from "./Button";
import CartListDisplay from "./CartListDisplay";
import logo from "../assets/img/logo/logoMinimalista.png";
import { setModalFocus, wrapTabOrder } from "../javascript/modalAccesibility";

function ShoppinCart({ itemList, deleteItem }) {
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

  function openMenu() {
    setStatus("showing");
    setTimeout(() => {
      setStatus("show");
      const shoppingCartModal = document.querySelector(
        ".shoppingCartContainer"
      );
      setModalFocus(shoppingCartModal);
      shoppingCartModal.addEventListener("keydown", (event) => {
        wrapTabOrder(event, shoppingCartModal);
      });
    }, 100);
  }
  return (
    <>
      <div className={`backdrop ${status}`} />
      <div className="cartButtonContainer">
        <Button
          type="button"
          onClick={openMenu}
          label="show shopping cart"
          className="shoppingCartButton"
        >
          <SpanIcon iconName="shopping_cart" />
        </Button>
        <p data-testid="itemAmmount roboto-condensed-600">{itemList.size}</p>
      </div>
      <div
        className={`shoppingCartContainer ${status}`}
        data-testid="shoppingCartContainer"
      >
        <div className="shoppingCartHeader">
          <Button
            type="button"
            onClick={closeMenu}
            label="hide shopping cart"
            className="hideShoppingCart"
          >
            <SpanIcon iconName="close" />{" "}
          </Button>
          <div className="logoContainer">
            <Link to="/" className="headerLink">
              <img src={logo} alt="" />
              <span className="headerLinkText">Arts Delish</span>
            </Link>
          </div>
        </div>
        <h2 className="roboto-condensed-600">Tu carro de compras</h2>
        {cartList.size < 1 ? (
          <p className="roboto-condensed-400">Todavia no se ha agregado nada</p>
        ) : (
          <>
            <p className="roboto-condensed-400">
              Posee
              {` ${cartList.size}`} productos en su carro
            </p>
            <div className="listContainer">
              <div className="cartItemsListContainer">
                <CartListDisplay cartList={cartList} deleteItem={deleteItem} />
              </div>
            </div>
          </>
        )}
        <Link
          to="/cart/checkout"
          className="goToCheckoutButton roboto-condensed-600"
        >
          Ir a caja
        </Link>
      </div>
    </>
  );
}

ShoppinCart.propTypes = {
  itemList: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ShoppinCart;
