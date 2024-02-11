import React from "react";
import PropTypes, { object } from "prop-types";
import Button from "./Button";

function CardDisplay({ cardData, addCardOnclick }) {
  return cardData ? (
    <div data-testid="cardContainer" />
  ) : (
    <Button type="button" className="" onClick={addCardOnclick}>
      Agregar tarjeta de credito
    </Button>
  );
}

CardDisplay.propTypes = {
  cardData: PropTypes.object,
  addCardOnclick: PropTypes.func.isRequired,
};

CardDisplay.defaultProp = {
  cardData: null,
};
export default CardDisplay;
