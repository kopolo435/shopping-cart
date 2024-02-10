import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import {
  confirmPasswordTest,
  emailInputTest,
  passwordTest,
} from "../javascript/inputValidation";
import Button from "./Button";

function RegisterUserForm({ onSubmit }) {
  const [formErrors, setFormErrors] = React.useState(new Map());
  const [formValues, setFormValues] = React.useState(new Map());
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
          onSubmit();
        }
      }, 0);

      setSubmitting(false);
    }
  }, [submitting, setFormErrors, onSubmit]);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextInput
        type="email"
        label="Correo"
        name="correo"
        updateFormErrors={setFormErrors}
        updateFormValues={setFormValues}
        validation={emailInputTest}
        submitting={submitting}
      />
      <TextInput
        type="password"
        label="Contraseña"
        name="password"
        updateFormErrors={setFormErrors}
        updateFormValues={setFormValues}
        validation={passwordTest}
        submitting={submitting}
      />
      <ConfirmPasswordInput
        label="Confirmar contraseña"
        name="confirmPassword"
        updateFormErrors={setFormErrors}
        updateFormValues={setFormValues}
        validation={confirmPasswordTest}
        passwordValue={formValues.get("password")}
        submitting={submitting}
      />
      <Button type="submit" className="" onClick={() => {}}>
        Registrarse
      </Button>
    </form>
  );
}

RegisterUserForm.propTypes = {
  onSubmit: PropTypes.func,
};

RegisterUserForm.defaultProps = {
  onSubmit: () => null,
};

export default RegisterUserForm;
