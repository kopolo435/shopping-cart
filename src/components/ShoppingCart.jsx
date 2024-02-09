import React from "react";
import PropTypes from "prop-types";
import SpanIcon from "./SpanIcon";
import Button from "./Button";

function ShoppinCart({ itemList, setItemList }) {
  const [status, setStatus] = React.useState("hide");
  function closeMenu() {
    setStatus("hiding");
    setTimeout(() => {
      setStatus("hide");
    }, 500);
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
          <SpanIcon iconName="open" />
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
          {itemList.size < 1 ? (
            <p>Todavia no se ha agregado nada</p>
          ) : (
            <>
              <p>
                Posee
                {itemList.size} en su carro
              </p>
              {Array.from(itemList.values()).map((item) => (
                <p>{item.name}</p>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

ShoppinCart.propTypes = {
  itemList: PropTypes.object.isRequired,
  setItemList: PropTypes.func.isRequired,
};

export default ShoppinCart;
