import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WideNav from "../components/WideNav";
import CategoryCard from "../components/CategoryCard";
import data from "../assets/data.json";
import logo from "../assets/img/logo/logoLetras.png";

function HomePage() {
  const [categories, setCategories] = React.useState(null);

  React.useEffect(() => {
    const tempMap = new Map();
    data.categories.forEach((category) => {
      tempMap.set(category, data.categoryInfo[category]);
    });
    setCategories(tempMap);
  }, []);

  return (
    <>
      <Header initialIsLogin={JSON.parse(localStorage.getItem("login"))} />
      <WideNav />
      <main className="homePageMain">
        <div className="introduction">
          <div className="imgContainer">
            <img src={logo} alt="" />
          </div>
          <div className="text">
            <h1>¡Bienvenido a Arts Delish!</h1>
            <p>
              Con nuestros productos , disfrutarás de delicias artesanales que
              te deleitarán. Desde tartas y pasteles exquisitos hasta galletas y
              cupcakes irresistibles, cada producto está elaborado con
              ingredientes frescos y amor. Haz tu pedido ahora y sumérgete en
              nuestro dulce encanto.
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
