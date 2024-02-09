import React from "react";
import PropTypes from "prop-types";

function TextInput({
  type,
  label,
  name,
  updateFormErrors,
  updateFormValues,
  validation,
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);

  function handleInputChange(newValue) {
    setValue(newValue);
    updateFormValues(newValue);
    if (!validation(newValue)) {
      setError(true);
      updateFormErrors((current) => {
        const tempMap = new Map([...current]);
        tempMap.set(name, true);
        return tempMap;
      });
    }
  }

  return !error ? (
    <div className="textInputContainer">
      <label htmlFor="nombre">
        {label}
        *
        <input
          type={type}
          id={name}
          value={value}
          name={name}
          required
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
    </div>
  ) : (
    <div className="textInputContainer">
      <label htmlFor="nombre">
        {label}
        *
        <input
          type={type}
          id={name}
          value={value}
          name={name}
          aria-describedby="nombre-error"
          aria-invalid="true"
          required
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
      <p id="nombre-error" role="alert">
        El nombre no es del tamaño correcto
      </p>
    </div>
  );
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateFormErrors: PropTypes.func.isRequired,
  updateFormValues: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
};

export default TextInput;
