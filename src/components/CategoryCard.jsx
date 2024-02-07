import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

function CategoryCard({ data }) {
  return (
    <Link to={data.link}>
      <div className="cardImg">
        <img src={data.img} alt="" />
      </div>
      <div className="cardContent">
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>
    </Link>
  );
}

CategoryCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};
export default CategoryCard;
