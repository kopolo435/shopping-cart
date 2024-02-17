import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

function CategoryCard({ data }) {
  return (
    <Link to={data.pageLink} className="categoryCard">
      <div className="cardImg">
        <img src={data.img} alt="" />
      </div>
      <div className="cardContent">
        <h3 className="roboto-condensed-600">{data.cardTitle}</h3>
        <p className="roboto-condensed-400">{data.shortDescription}</p>
      </div>
    </Link>
  );
}

CategoryCard.propTypes = {
  data: PropTypes.shape({
    cardTitle: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    pageLink: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};
export default CategoryCard;
