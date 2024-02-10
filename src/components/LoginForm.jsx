import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import { emailInputTest, passwordTest } from "../javascript/inputValidation";
import Button from "./Button";

function LoginForm({ onSubmit }) {
  const [formErrors, setFormErrors] = React.useState(new Map());
  const [updateFormValues, setFormValues] = React.useState(new Map());
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
    <form onSubmit={handleSubmit} noValidate>
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
      <Button type="submit" className="" onClick={() => {}}>
        Iniciar sesion
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: () => null,
};

export default LoginForm;
