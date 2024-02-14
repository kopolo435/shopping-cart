import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WideNav from "../components/WideNav";
import HamburguerMenu from "../components/HamburguerMenu";
import ShoppinCart from "../components/ShoppingCart";
import getCartItems from "../javascript/getCartItems";
import CategoryCard from "../components/CategoryCard";
import data from "../assets/data.json";

function HomePage() {
  const [categories, setCategories] = React.useState(null);
  const [cartList, setCartList] = React.useState(null);

  React.useEffect(() => {
    const tempMap = new Map();
    data.categories.forEach((category) => {
      tempMap.set(category, data.categoryInfo[category]);
    });
    setCategories(tempMap);
  }, []);

  React.useEffect(() => {
    const tempMap = new Map();
    data.itemList.forEach((item) => {
      tempMap.set(item.id, item);
    });
    setCartList(getCartItems(tempMap));
  }, []);

  return (
    <>
      <Header />
      <HamburguerMenu />
      {cartList && <ShoppinCart itemList={cartList} />}
      <WideNav />
      <main>
        <div className="introduction">
          <div className="imgContainer" />
          <div className="text">
            <h1>Pasteleria Art Delish</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore,
              corporis!
            </p>
          </div>
        </div>
        <hr />
        <div className="productsCategories">
          {categories ? (
            data.categories.map((categoryName) => (
              <CategoryCard
                key={categoryName}
                data={categories.get(categoryName)}
              />
            ))
          ) : (
            <p>Cargando categorias</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
