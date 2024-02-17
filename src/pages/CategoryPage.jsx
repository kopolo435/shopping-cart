import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import data from "../assets/data.json";
import CategoryCard from "../components/CategoryCard";
import WideNav from "../components/WideNav";

function CategoryPage() {
  const [info, setInfo] = React.useState(null);
  const [itemMap, setItemMap] = React.useState(new Map());
  const { name } = useParams();
  React.useEffect(() => {
    const tempMap = new Map();
    data.itemList.forEach((item) => {
      tempMap.set(item.id, item);
    });
    setInfo(data.categoryInfo[name]);
    setItemMap(tempMap);
  }, [name]);

  return (
    <>
      <Header initialIsLogin={JSON.parse(localStorage.getItem("login"))} />
      <WideNav />
      {info ? (
        <main className="categoryPageMain">
          <div className="categoryInfo">
            <div className="categoryImg">
              <img src={info.img} alt="" />
            </div>
            <div className="categoryText">
              <h1>{info.pageTitle}</h1>
              <p>{info.longDescription}</p>
            </div>
          </div>
          <hr />
          <h2 className="categoryListTitle">
            Nuestro catalogo de estos productos
          </h2>
          <div className="itemsContainer">
            {info.items.map((itemId) => (
              <CategoryCard key={itemId} data={itemMap.get(itemId)} />
            ))}
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

export default CategoryPage;
