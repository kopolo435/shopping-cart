function getCartListTotal(cartList) {
  let totalPrice = 0;
  let taxValue = 0;
  const itemsPriceArray = Array.from(cartList.values()).map((item) => ({
    price: item.price,
    quantity: item.quantity,
  }));
  totalPrice = itemsPriceArray.reduce((accumulator, currentItem) => {
    const value =
      Number(currentItem.price) * Number(currentItem.quantity) + accumulator;
    return value;
  }, 0);
  taxValue = Number(totalPrice) * 0.07;
  taxValue = Math.round((taxValue + Number.EPSILON) * 100) / 100;
  totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;

  return [totalPrice, taxValue];
}

export default getCartListTotal;
