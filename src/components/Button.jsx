import React from "react";
import PropTypes from "prop-types";

function Button({ children, onClick, className, label, type }) {
  return label ? (
    <button
      type={type === "button" ? "button" : "submit"}
      onClick={onClick}
      className={className}
      aria-label={label}
    >
      {children}
    </button>
  ) : (
    <button
      type={type === "button" ? "button" : "submit"}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Button.defaultProps = {
  label: null,
  children: "",
};

export default Button;
