import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../assets/data.json";

function ItemPage() {
  const [itemMap, setItemMap] = React.useState(new Map());
  const { id } = useParams();
  React.useEffect(() => {
    const tempMap = new Map();
    data.itemList.forEach((item) => {
      tempMap.set(item.id, item);
    });
    setItemMap(tempMap);
  }, []);
  const itemData = itemMap.get(id) ? itemMap.get(id) : null;
  return (
    <>
      <Header />
      {itemData ? (
        <main>
          <div className="itemImg">
            <img src={itemData.img} alt="" />
          </div>
          <div className="itemInformation">
            <h1>{itemData.name}</h1>
            <p>{itemData.description}</p>
          </div>
        </main>
      ) : (
        <main>
          <p>Cargando informacion</p>
        </main>
      )}
      <Footer />
    </>
  );
}

export default ItemPage;
