import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import { emailInputTest, passwordTest } from "../javascript/inputValidation";
import Button from "./Button";

function LoginForm({ onSubmit }) {
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
          onSubmit(formValues);
        }
      }, 0);

      setSubmitting(false);
    }
  }, [submitting, setFormErrors, onSubmit, formValues]);

  return (
    <form
      onSubmit={handleSubmit}
      className="loginForm roboto-condensed-400"
      noValidate
    >
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
      <Button
        type="submit"
        className="logInButton roboto-condensed-600"
        onClick={() => {}}
      >
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
