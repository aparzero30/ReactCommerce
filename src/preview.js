import "./preview.css";
import { ProductContext } from "./App";
import React, { useState, useContext, useReducer, useEffect } from "react";

const initialState = { count: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      if (state.count === 1) {
        return { count: 1 };
      }
      return { count: state.count - 1 };
    case "setCount":
      if (action.payload < 1) {
        return { count: 1 };
      }
      return { count: action.payload };

    default:
      throw new Error();
  }
}

function Preview() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { selectedProduct } = useContext(ProductContext);

  const { cart, setCart } = useContext(ProductContext);

  const [currentId, setCurrentId] = useState(1); // initialize the ID to 1

  const handleQuantityChange = (event) => {
    // setQuantity(event.target.value);
    // console.log(quantity);
    dispatch({ type: "setCount", payload: event.target.value });
    console.log(state.count);
  };

  const addToCart = (item, quantity) => {
    const newId = currentId + 1; // generate a new ID
    setCart([...cart, { id: newId, product: item, quantity: quantity }]);
    setCurrentId(newId); // update the current ID to the new ID
    console.log(cart);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]); // run this effect when state.count changes

  return (
    <div className="preview">
      {selectedProduct && (
        <div className="prev-card">
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <div className="prev-body">
            <h4 className="prev-title">{selectedProduct.title}</h4>
            <h3 className="prev-price">Price: ${selectedProduct.price}</h3>
            <div className="checkout-field">
              <label>QUANTITY</label>
              <div
                onClick={() => dispatch({ type: "increment" })}
                className="alter"
              >
                +
              </div>

              <input
                type="number"
                id="quantity"
                name="quantity"
                value={state.count}
                className="quant"
                onChange={handleQuantityChange}
              />
              <div
                onClick={() => dispatch({ type: "decrement" })}
                className="alter"
              >
                -
              </div>

              <span
                className="material-symbols-outlined"
                onClick={() => addToCart(selectedProduct, state.count)}
              >
                shopping_cart
              </span>
            </div>
            <p className="prev-desc">{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Preview;
