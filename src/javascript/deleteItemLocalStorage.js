function deleteItemLocalStorage(id, initialMap) {
  const tempMap = new Map([...initialMap]);
  const tempCartListObj = JSON.parse(localStorage.getItem("cartList"));
  delete tempCartListObj[id];
  tempMap.delete(id);
  localStorage.setItem("cartList", JSON.stringify(tempCartListObj));

  return tempMap;
}

export default deleteItemLocalStorage;
