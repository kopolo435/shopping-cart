function saveCreditCard(values) {
  const creditCardInfo = {
    owner: values.get("owner"),
    number: values.get("ccNumber"),
    pin: values.get("ccPin"),
    address: values.get("ccAdress"),
    monthExpiration: values.get("monthExpiration"),
    yearExpiration: values.get("yearExpiration"),
  };
  localStorage.setItem("creditCard", JSON.stringify(creditCardInfo));
}

export default saveCreditCard;
