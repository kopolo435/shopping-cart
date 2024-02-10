import React from "react";
import PropTypes from "prop-types";

function validateError(
  name,
  value,
  setError,
  updateFormErrors,
  validation,
  passwordValue
) {
  const errorMessage = validation(value, passwordValue);
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

function ConfirmPasswordInput({
  label,
  name,
  updateFormErrors,
  updateFormValues,
  validation,
  submitting,
  passwordValue,
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (submitting) {
      validateError(
        name,
        value,
        setError,
        updateFormErrors,
        validation,
        passwordValue
      );
    }
  }, [
    submitting,
    setError,
    updateFormErrors,
    validation,
    name,
    value,
    passwordValue,
  ]);

  function handleInputChange(newValue) {
    setValue(newValue);
    updateFormValues((current) => {
      const tempMap = new Map([...current]);
      tempMap.set(name, newValue);
      return tempMap;
    });
    validateError(
      name,
      newValue,
      setError,
      updateFormErrors,
      validation,
      passwordValue
    );
  }

  return error === "" ? (
    <div className="textInputContainer">
      <label htmlFor={name}>
        {label}
        *
        <input
          type="password"
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
          type="password"
          id={name}
          value={value}
          name={name}
          aria-describedby={`${name}-error`}
          aria-invalid="true"
          required
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
      <p id={`${name}-error`} role="alert">
        {error}
      </p>
    </div>
  );
}

ConfirmPasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  updateFormErrors: PropTypes.func.isRequired,
  updateFormValues: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
  submitting: PropTypes.string.isRequired,
};

export default ConfirmPasswordInput;
