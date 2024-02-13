import React from "react";
import data from "../assets/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShoppinCart from "../components/ShoppingCart";
import CardDisplay from "../components/CardDisplay";
import AddCcForm from "../components/AddCcForm";
import CartListDisplay from "../components/CartListDisplay";

function getCartItems(itemMap) {
  const cartList = JSON.parse(localStorage.getItem("cartList"));
  const cartListMap = new Map();

  Object.keys(cartList).forEach((key) => {
    const value = cartList[key];
    const itemData = { ...itemMap.get(key), quantity: value };
    cartListMap.set(key, itemData);
  });

  return cartListMap;
}

function Checkout() {
  const [itemMap, setItemMap] = React.useState(new Map());
  const [cartList, setCartList] = React.useState(new Map());
  const [addCreditCardModal, setAddCreditCardMoldal] = React.useState(false);
  const [creditCardAdded, setCreditCardAdded] = React.useState(false);
  let totalPrice = 0;
  let taxValue = 0;
  React.useEffect(() => {
    const tempMap = new Map();
    data.itemList.forEach((item) => {
      tempMap.set(item.id, item);
    });
    setItemMap(tempMap);
    setCartList(getCartItems(tempMap));
  }, []);

  function showAddCreditCardModal() {
    setAddCreditCardMoldal(true);
  }

  function deleteItem(id) {
    const tempMap = new Map([...cartList]);
    const tempCartListObj = JSON.parse(localStorage.getItem("cartList"));
    delete tempCartListObj[id];
    tempMap.delete(id);
    localStorage.setItem("cartList", JSON.stringify(tempCartListObj));
    setCartList(tempMap);
  }

  function saveCreditCardInformation(values) {
    const creditCardInfo = {
      owner: values.get("owner"),
      number: values.get("ccNumber"),
      pin: values.get("ccPin"),
      address: values.get("ccAdress"),
      monthExpiration: values.get("monthExpiration"),
      yearExpiration: values.get("yearExpiration"),
    };
    localStorage.setItem("creditCard", JSON.stringify(creditCardInfo));
    console.log(localStorage.getItem("creditCard"));
    setCreditCardAdded(true);
    setTimeout(() => {
      setCreditCardAdded(false);
    }, 100);
  }

  if (cartList.size > 0) {
    const itemsPriceArray = Array.from(cartList.values()).map(
      (item) => item.price
    );
    totalPrice = itemsPriceArray.reduce((accumulator, currentItem) => {
      const value =
        Number(currentItem.price) * Number(currentItem.quantity) + accumulator;
      return value;
    });
    taxValue = Number(totalPrice) * 0.07;
  }

  return (
    <>
      <Header />
      {cartList.size > 0 ? (
        <main>
          {addCreditCardModal && (
            <AddCcForm onSubmit={saveCreditCardInformation} />
          )}
          <h1>Articulos en el carro</h1>
          <CartListDisplay cartList={cartList} deleteItem={deleteItem} />
          <CardDisplay
            cardData={JSON.parse(localStorage.getItem("creditCard"))}
            addCardOnclick={() => showAddCreditCardModal()}
          />
          <div className="paymentInfo">
            <h2>Tarjeta de credio a usar</h2>
            <h2>Precio total a pagar</h2>
            <p>
              Productos:
              <span>{` ${totalPrice}`}</span>
            </p>
            <p>
              Impuestos:
              <span>{` ${taxValue}`}</span>
            </p>
            <p>
              Total a pagar:
              <span>{` ${Number(totalPrice) + Number(taxValue)}`}</span>
            </p>
          </div>
        </main>
      ) : (
        <main>Cargando informacion</main>
      )}
      <Footer />
    </>
  );
}

export default Checkout;
