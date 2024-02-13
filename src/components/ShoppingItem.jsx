import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

function ShoppingItem({ item, deleteItem }) {
  return (
    <div className="itemCard">
      <img src={item.img} alt={item.alt} />
      <div className="content">
        <div className="top">
          <h3>{item.cardTitle}</h3>
          <Button
            onClick={() => deleteItem(item.id)}
            type="button"
            className=""
            label="eliminar item del carro"
          >
            Eliminar item
          </Button>
        </div>
        <div className="text">
          <p>{item.shortDescription}</p>
          <p>{item.quantity} unidades</p>
        </div>
      </div>
    </div>
  );
}

ShoppingItem.propTypes = {
  item: PropTypes.shape({
    cardTitle: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ShoppingItem;
