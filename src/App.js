import "./App.css";
import Card from "./card.js";
import Preview from "./preview.js";
import Cart from "./Cart.js";
import React, { useState, useEffect } from "react";

const ProductContext = React.createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(null);
  console.log(searchText);
  console.log(filter);

  const handleSearch = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(searchText);
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(text)
    );
    setSearchText(text);
    setFilter(filteredProducts);
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // const handleCardClick = (product) => {
  //   setSelectedProduct(product);
  // };

  return (
    <ProductContext.Provider
      value={{ selectedProduct, setSelectedProduct, cart, setCart }}
    >
      <div className="App">
        <Cart />
        <Preview />
        <div className="wrapper">
          <div className="productlist">
            <input
              center
              placeholder="Type to Search....."
              onChange={handleSearch}
            />
          </div>
          {/* {products.map((product, i) => (
            <Card
              key={product.id}
              product={product}
              onClick={() => setSelectedProduct(product)}
            />
          ))} */}
          {searchText === ""
            ? products.map((product, i) => (
                <Card
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))
            : filter.map((product, i) => (
                <Card
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
        </div>
      </div>
    </ProductContext.Provider>
  );
}
export { ProductContext };
export default App;
