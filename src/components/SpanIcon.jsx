import React from "react";
import PropTypes from "prop-types";

function SpanIcon({ text, iconName, className }) {
  return text ? (
    <span>
      {text}
      <span className={className}>{iconName}</span>
    </span>
  ) : (
    <span className={className}>{iconName}</span>
  );
}

SpanIcon.propTypes = {
  text: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
};
SpanIcon.defaultProps = {
  text: null,
  className: "material-symbols-outlined",
};

export default SpanIcon;
