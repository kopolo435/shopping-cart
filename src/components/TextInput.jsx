import React from "react";
import PropTypes from "prop-types";

function validateError(name, value, setError, updateFormErrors, validation) {
  const errorMessage = validation(value);
  setError(errorMessage);
  if (errorMessage !== "") {
    updateFormErrors((current) => {
      const tempMap = new Map([...current]);
      tempMap.set(name, true);
      return tempMap;
    });
  } else {
    updateFormErrors((current) => {
      const tempMap = new Map([...current]);
      if (tempMap.get(name)) {
        tempMap.delete(name);
      }
      return tempMap;
    });
  }
}

function TextInput({
  type,
  label,
  name,
  updateFormErrors,
  updateFormValues,
  validation,
  submitting,
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (submitting) {
      validateError(name, value, setError, updateFormErrors, validation);
    }
  }, [submitting, setError, updateFormErrors, validation, name, value]);

  function handleInputChange(newValue) {
    setValue(newValue);
    updateFormValues((current) => {
      const tempMap = new Map([...current]);
      tempMap.set(name, newValue);
      return tempMap;
    });
    validateError(name, newValue, setError, updateFormErrors, validation);
  }

  return error === "" ? (
    <div className="textInputContainer">
      <label htmlFor={name}>
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
      <label htmlFor={name}>
        {label}
        *
        <input
          type={type}
          id={name}
          value={value}
          name={name}
          aria-describedby={`${name}-error`}
          aria-invalid="true"
          required
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
      <p id={`${name}-error`} role="alert" className="errorInputText">
        {error}
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
  submitting: PropTypes.bool.isRequired,
};

export default TextInput;
