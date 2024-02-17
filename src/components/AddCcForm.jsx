import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import Button from "./Button";
import {
  checkAddress,
  checkCreditCardNumber,
  checkMonthExpiration,
  checkYearExpiration,
  nameInputTest,
  checkCreditCardPin,
} from "../javascript/inputValidation";

function AddCcForm({ onSubmit }) {
  const [formErrors, setFormErrors] = React.useState(new Map());
  const [FormValues, setFormValues] = React.useState(new Map());
  const [submitting, setSubmitting] = React.useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
  }

  React.useEffect(() => {
    if (submitting) {
      let currentErrorsSize;
      setFormErrors((currentErrors) => {
        currentErrorsSize = currentErrors.size;
        return currentErrors; // Return the current state to ensure no changes
      });
      setTimeout(() => {
        if (currentErrorsSize === 0) {
          onSubmit(FormValues);
        }
      }, 0);

      setSubmitting(false);
    }
  }, [submitting, setFormErrors, onSubmit, FormValues]);

  return (
    <form onSubmit={handleSubmit} className="addCreditCardForm" noValidate>
      <TextInput
        type="text"
        label="Numero de tarjeta"
        name="ccNumber"
        updateFormErrors={setFormErrors}
        updateFormValues={setFormValues}
        validation={checkCreditCardNumber}
        submitting={submitting}
      />
      <TextInput
        type="text"
        label="Pin de tarjeta"
        name="ccPin"
        updateFormErrors={setFormErrors}
        updateFormValues={setFormValues}
        validation={checkCreditCardPin}
        submitting={submitting}
      />
      <TextInput
        type="text"
        label="Nombre dueño de la tarjeta"
        name="owner"
        updateFormErrors={setFormErrors}
        updateFormValues={setFormValues}
        validation={nameInputTest}
        submitting={submitting}
      />
      <TextInput
        type="text"
        label="Direccion"
        name="ccAdress"
        updateFormErrors={setFormErrors}
        updateFormValues={setFormValues}
        validation={checkAddress}
        submitting={submitting}
      />
      <fieldset>
        <legend>Fecha de expiración</legend>
        <TextInput
          type="number"
          label="Mes"
          name="monthExpiration"
          updateFormErrors={setFormErrors}
          updateFormValues={setFormValues}
          validation={checkMonthExpiration}
          submitting={submitting}
        />
        <TextInput
          type="number"
          label="Año"
          name="yearExpiration"
          updateFormErrors={setFormErrors}
          updateFormValues={setFormValues}
          validation={checkYearExpiration}
          submitting={submitting}
        />
      </fieldset>
      <Button type="submit" className="saveNewCreditCard" onClick={() => {}}>
        Guardar datos
      </Button>
    </form>
  );
}

AddCcForm.propTypes = {
  onSubmit: PropTypes.func,
};

AddCcForm.defaultProps = {
  onSubmit: () => null,
};

export default AddCcForm;
