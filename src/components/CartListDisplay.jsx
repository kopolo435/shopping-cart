import React from "react";
import PropTypes from "prop-types";
import ShoppingItem from "./ShoppingItem";

function CartListDisplay({ cartList, deleteItem }) {
  return Array.from(cartList.values()).map((item) => (
    <ShoppingItem key={item.id} item={item} deleteItem={deleteItem} />
  ));
}

CartListDisplay.propTypes = {
  cartList: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default CartListDisplay;
