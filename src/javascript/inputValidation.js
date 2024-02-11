function checkCreditCardPin(ccPin) {
  const regex = /\d{4}/;
  if (ccPin.length === 0) {
    return "Debe ingresar el Pin de la tarjeta";
  }
  if (ccPin.length < 4) {
    return "El Pin ingresado es muy corto";
  }
  if (ccPin.length > 4) {
    return "El Pin ingresado es muy largo";
  }
  if (!regex.test(ccPin)) {
    return "El Pin ingresado es incorrecto";
  }
  return "";
}

function checkAddress(address) {
  const regex = /^[A-Za-z0-9 ]+$/;
  if (address.length === 0) {
    return "Debe ingresar su direccion";
  }
  if (!regex.test(address)) {
    return "La direccion ingresada tiene caracteres invalidos";
  }
  return "";
}

function checkMonthExpiration(month) {
  const regex = /[1-9][0-9]?/;

  if (!regex.test(month)) {
    return "El mes ingresado es invalido";
  }

  if (month.length === 0) {
    return "Debe ingresar un mes del 1 al 12";
  }

  if (month < 1) {
    return "Debe ingresar un mes del 1 al 12";
  }

  if (month > 12) {
    return "Debe ingresar un mes del 1 al 12";
  }

  return "";
}

function checkYearExpiration(year) {
  const regex = /\d{4}/;

  if (year.length === 0) {
    return "Debe ingresar un año";
  }

  if (!regex.test(year)) {
    return "Debe ingresar el año en el formato: 1902";
  }

  if (year < 2024) {
    return "Debe ingresar un año mayor o igual a 2024";
  }

  if (year > 2050) {
    return "No debe ingresar un año mayor a 2050";
  }

  return "";
}

function checkCreditCardNumber(ccNumber) {
  const regex = /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/;

  if (ccNumber.length === 0) {
    return "Debe ingresar los numeros de la tarjeta";
  }
  if (ccNumber.length < 16) {
    return "Debe ingresar los 16 numeros de la tarjeta";
  }
  if (!regex.test(ccNumber)) {
    return "Ingreso caracteres invalidos";
  }
  return "";
}

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
  checkCreditCardNumber,
  checkAddress,
  checkMonthExpiration,
  checkYearExpiration,
};
