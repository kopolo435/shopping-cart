function formatMoneyAmount(amount) {
  // Check if the amount contains decimals
  if (amount.indexOf(".") === -1) {
    // If no decimals found, add .00 to the amount
    return `${amount}.00`;
  }
  // If decimals found, return the original amount
  return amount;
}

export default formatMoneyAmount;
