import React from "react";
import data from "../assets/data.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import CardDisplay from "../components/CardDisplay";
import AddCcForm from "../components/AddCcForm";
import CartListDisplay from "../components/CartListDisplay";
import WideNav from "../components/WideNav";
import getCartListTotal from "../javascript/getCartListTota";
import saveCreditCard from "../javascript/saveCreditCard";
import deleteItemLocalStorage from "../javascript/deleteItemLocalStorage";

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
    // Elimina item del map pasado y del localStorage
    const updateMap = deleteItemLocalStorage(id, new Map([...cartList]));
    setCartList(updateMap);
  }

  function saveCreditCardInformation(values) {
    // Guarda datos de la tarjeta en localStorage
    saveCreditCard(values);

    setCreditCardAdded(true);
    setTimeout(() => {
      setCreditCardAdded(false);
    }, 100);
  }

  // Calcular precio total de productos
  if (cartList.size > 0) {
    [totalPrice, taxValue] = getCartListTotal(cartList);
  }

  return (
    <>
      <Header
        initialCartList={cartList}
        initialIsLogin={JSON.parse(localStorage.getItem("login"))}
      />
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
