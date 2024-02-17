import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import SpanIcon from "./SpanIcon";

function ShoppingItem({ item, deleteItem }) {
  return (
    <div className="itemCard">
      <img src={`/${item.img}`} alt={item.alt} />
      <div className="content">
        <div className="top">
          <h3>{`${item.quantity}x ${item.cardTitle}`}</h3>
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
          <p>{item.shortDescription}</p>
          <div className="cost">
            <p>
              Precio individual:
              <span>{` $${item.price}`}</span>
            </p>
            <p>
              Costo total:
              <span>{` $${Number(item.price) * Number(item.quantity)}`}</span>
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
