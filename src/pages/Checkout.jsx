import React from "react";
import data from "../assets/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CardDisplay from "../components/CardDisplay";
import AddCcForm from "../components/AddCcForm";
import CartListDisplay from "../components/CartListDisplay";
import WideNav from "../components/WideNav";

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
  const hola = { hola: 2 };

  if (cartList.size > 0) {
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
  }

  return (
    <>
      <Header initialCartList={cartList} />
      <WideNav />
      <div className={`backdrop ${addCreditCardModal ? "show" : "hide"}`} />
      <main className="checkoutContainer">
        {addCreditCardModal && (
          <div className="addCreditCardModal">
            <h3>Agregar nueva tarjeta de credito</h3>
            <AddCcForm onSubmit={saveCreditCardInformation} />
            <Button
              type="button"
              className=""
              onClick={() => setAddCreditCardMoldal(false)}
            >
              Cancelar
            </Button>
          </div>
        )}
        <div className="cartItems">
          <h1>Articulos en el carro</h1>
          {cartList.size > 0 ? (
            <CartListDisplay cartList={cartList} deleteItem={deleteItem} />
          ) : (
            <div className="emptyCartList">
              <p>No ha agregado articulos</p>
            </div>
          )}
        </div>
        <div className="paymentInfo">
          <div className="paymentInforCard">
            <h2>Tarjeta de credio a usar</h2>
            <CardDisplay
              cardData={JSON.parse(localStorage.getItem("creditCard"))}
              addCardOnclick={() => showAddCreditCardModal()}
            />
          </div>
          <div className="costInformation">
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
          <Button type="button" className="payButton">
            Pagar
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
