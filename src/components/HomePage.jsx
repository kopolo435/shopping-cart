import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WideNav from "./WideNav";
import HamburguerMenu from "./HamburguerMenu";
import CategoryCard from "./CategoryCard";
import data from "../assets/data.json";

function HomePage() {
  const [categories, setCategories] = React.useState(null);

  useEffect(() => {
    setCategories(data.categories);
  }, []);

  return (
    <>
      <Header />
      <HamburguerMenu />
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
            categories.map((categoryData) => (
              <CategoryCard key={categoryData.link} data={categoryData} />
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