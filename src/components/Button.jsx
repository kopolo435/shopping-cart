import React from "react";
import PropTypes from "prop-types";
import SpanIcon from "./SpanIcon";

function Button({ content, onClick, className, label, type }) {
  return label ? (
    <button
      type={type === "button" ? "button" : "submit"}
      onClick={onClick}
      className={className}
      aria-label={label}
    >
      {content}
    </button>
  ) : (
    <button
      type={type === "button" ? "button" : "submit"}
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  );
}

Button.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Button.defaultProps = {
  label: null,
};

export default Button;
