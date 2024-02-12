import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

function CategoryCard({ data }) {
  return (
    <Link to={data.pageLink}>
      <div className="cardImg">
        <img src={data.img} alt="" />
      </div>
      <div className="cardContent">
        <h3>{data.cardTitle}</h3>
        <p>{data.shortDescription}</p>
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
