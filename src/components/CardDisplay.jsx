import React from "react";
import PropTypes, { object } from "prop-types";
import Button from "./Button";
import SpanIcon from "./SpanIcon";

function CardDisplay({ cardData, addCardOnclick }) {
  return cardData ? (
    <div className="cardInfoContainer">
      <div data-testid="cardContainer" className="cardContainer">
        <SpanIcon iconName="credit_card" />
        <p>
          Tarjeta terminando en:
          <span>{` ${cardData.number.slice(-4)}`}</span>
        </p>
      </div>
      <Button type="button" className="useAnotherCard" onClick={addCardOnclick}>
        <SpanIcon iconName="add_card" /> Usar otra tarjeta
      </Button>
    </div>
  ) : (
    <Button type="button" className="addCardButton" onClick={addCardOnclick}>
      <SpanIcon iconName="add_card" /> Agregar tarjeta de credito
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
