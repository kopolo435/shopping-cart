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
import { wrapTabOrder, setModalFocus } from "../javascript/modalAccesibility";
import SpanIcon from "../components/SpanIcon";

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
  const [addCcModalStatus, setAddCcModalStatus] = React.useState("hide");
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

  function closeCreditCardModal() {
    setAddCcModalStatus("hiding");
    setTimeout(() => {
      setAddCcModalStatus("hide");
    }, 500);
  }

  function openCreditCardModal() {
    setAddCcModalStatus("showing");
    setTimeout(() => {
      setAddCcModalStatus("show");
      const shoppingCartModal = document.querySelector(".addCreditCardModal");
      setModalFocus(shoppingCartModal);
      shoppingCartModal.addEventListener("keydown", (event) => {
        wrapTabOrder(event, shoppingCartModal);
      });
    }, 100);
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
      <div className={`backdrop ${addCcModalStatus}`} />
      <main className="checkoutContainer">
        <div className={`addCreditCardModal ${addCcModalStatus}`}>
          <Button
            type="button"
            className="closeAddCreditCard"
            label="Cerrar pestaña de agregar tarjeta"
            onClick={() => closeCreditCardModal()}
          >
            <SpanIcon iconName="close" />
          </Button>
          <h3>Agregar nueva tarjeta de credito</h3>
          <p>Los campos marcados con (*) son requeridos</p>
          <AddCcForm onSubmit={saveCreditCardInformation} />
        </div>
        <div className="cartItems">
          <h1>Articulos en el carro</h1>
          {cartList.size > 0 ? (
            <div className="listContainer">
              <div className="cartItemsListContainer">
                <CartListDisplay cartList={cartList} deleteItem={deleteItem} />
              </div>
            </div>
          ) : (
            <div className="emptyCartList">
              <p>No ha agregado articulos</p>
            </div>
          )}
        </div>
        <div className="paymentInfo">
          <div className="paymentInforCard">
            <h2>Tarjeta de credito a usar</h2>
            <CardDisplay
              cardData={JSON.parse(localStorage.getItem("creditCard"))}
              addCardOnclick={() => openCreditCardModal()}
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
            <SpanIcon iconName="payments" />
            Pagar
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
