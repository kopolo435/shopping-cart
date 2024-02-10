import React from "react";
import PropTypes from "prop-types";

function formatDateToString(dateValue) {
  return dateValue ? dateValue.toISOString().split("T")[0] : "";
}

function DateInput({
  label,
  name,
  updateFormErrors,
  updateFormValues,
  validation,
}) {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);

  function setDateObj(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj;
  }

  function handleInputChange(dateString) {
    const newValue = setDateObj(dateString);
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
    <div className="dateInputContainer">
      <label htmlFor={name}>
        {`${label}*`}
        <input
          type="date"
          id={name}
          value={formatDateToString(value)}
          name={name}
          required
          data-testid={name}
          onChange={(e) => handleInputChange(e.target.value)}
          min="1950-01-01"
          max="2025-01-01"
        />
      </label>
    </div>
  ) : (
    <div className="textInputContainer">
      <label htmlFor={name}>
        {`${label}*`}
        <input
          id={name}
          value={formatDateToString(value)}
          name={name}
          aria-describedby={`${name}-error`}
          aria-invalid="true"
          required
          data-testid={name}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </label>
      <p id={`${name}-error`} role="alert">
        La fecha es invalida
      </p>
    </div>
  );
}

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateFormErrors: PropTypes.func.isRequired,
  updateFormValues: PropTypes.func.isRequired,
  validation: PropTypes.func.isRequired,
};

export default DateInput;
