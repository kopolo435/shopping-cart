function nameInputTest(text) {
  const regex = /^[A-Za-z\s'-]+$/;
  if (text.length === 0) {
    return "Debe llenar este campo";
  }
  if (!regex.test(text)) {
    return "No debe ingresar caracteres especiales";
  }
  return "";
}

function emailInputTest(text) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (text.length === 0) {
    return "Debe llenar este campo";
  }
  if (!regex.test(text)) {
    return "Ingrese un correo valido. Formato: nombre123@correo.com";
  }
  return "";
}

function cellphoneTest(text) {
  const regex = /^(\+\d{2}-)?(\d{4}-\d{4}|\d{8})$/;
  if (text.lenght === 0) {
    return "Debe llenar este campo";
  }
  if (!regex.test(text)) {
    return "Debe ingresar un numbero en el formato 1234-5678, puede agregar el codigo de pais";
  }
}

function requiredTestField(text) {
  if (text.length === 0) {
    return "Debe llenar este campo";
  }
  return "";
}

function isDateInRange(dateToCheck, startDate, endDate) {
  return dateToCheck >= startDate && dateToCheck <= endDate;
}

function dateInputTest(dateObj) {
  const minDate = new Date("1950-01-01");
  const maxDate = new Date("2025-01-01");
  if (typeof dateObj !== "object") {
    return "Debe ingresar una fecha";
  }
  if (!isDateInRange(dateObj, minDate, maxDate)) {
    return "La fecha ingresada debe estar entre 1950 y 2025";
  }

  return "";
}

function passwordTest(password) {
  if (password.length < 8) {
    return "Debe ingresar una contraseña mayor a 8 caracteres";
  }

  return "";
}

function confirmPasswordTest(confirmPassword, password) {
  if (confirmPassword !== password) {
    return "Las contraseñas no coinciden";
  }

  return "";
}

export {
  nameInputTest,
  emailInputTest,
  cellphoneTest,
  requiredTestField,
  dateInputTest,
  passwordTest,
  confirmPasswordTest,
};
