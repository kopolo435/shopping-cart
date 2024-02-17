import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import SpanIcon from "./SpanIcon";
import formatMoneyAmount from "../javascript/formatMoney";

function ShoppingItem({ item, deleteItem }) {
  return (
    <div className="itemCard">
      <img src={`/${item.img}`} alt={item.alt} />
      <div className="content">
        <div className="top">
          <h3 className="roboto-condensed-400">{`${item.quantity}x ${item.cardTitle}`}</h3>
          <Button
            onClick={() => deleteItem(item.id)}
            type="button"
            className="removeItemButton"
            label="eliminar item del carro"
          >
            <SpanIcon iconName="remove_shopping_cart" />
          </Button>
        </div>
        <div className="text">
          <p className="roboto-condensed-400">{item.shortDescription}</p>
          <div className="cost">
            <p className="roboto-condensed-400">
              Precio individual:
              <span>{` $${formatMoneyAmount(`${item.price}`)}`}</span>
            </p>
            <p className="roboto-condensed-400">
              Costo total:
              <span>
                {` $${formatMoneyAmount(
                  `${Number(item.price) * Number(item.quantity)}`
                )}`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ShoppingItem.propTypes = {
  item: PropTypes.shape({
    cardTitle: PropTypes.string.isRequired,
    quantity: PropTypes.any.isRequired,
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ShoppingItem;
