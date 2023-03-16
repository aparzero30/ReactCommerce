import "./cart.css";
import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "./App";

function Cart() {
  const [open, setOpen] = useState(false);
  const { cart, setCart } = useContext(ProductContext);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const total = cart.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart]; // make a copy of the cart
    updatedCart[index].quantity = newQuantity; // update the quantity of the item at the specified index

    if (newQuantity === 0) {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart); // update the cart state
  };

  const deleteItem = (index, newQuantity) => {
    const updatedCart = [...cart]; // make a copy of the cart
    updatedCart.splice(index, 1);
    setCart(updatedCart); // update the cart state
  };

  return (
    <div
      className="cart"
      style={{
        width: open ? "25vw" : "0",
        flexDirection: cart.length > 5 ? "row" : "column",
      }}
    >
      <div
        className="circle"
        id="circle"
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: open ? "transparent" : "#feb692" }}
      >
        <span className="material-symbols-outlined">shopping_cart</span>

        {cart && cart.length > 0 && (
          <h6 style={{ display: open ? "none" : "" }}>{cart.length}</h6>
        )}
      </div>

      <div className="space">
        {total !== 0 && <h1>${total}</h1>}
        <div className="checkout">CHECKOUT</div>
      </div>

      {cart.map((item, i) => (
        <div className="item" key={item.id}>
          <img src={item.product.image} alt={item.product.title} />
          <div className="frm">
            <div className="title">{item.product.title}</div>
            <div className="price">${item.product.price}</div>
            <div className="qt">
              <div
                className="alter"
                onClick={() => handleQuantityChange(i, item.quantity + 1)}
              >
                +
              </div>
              <div>{item.quantity}</div>

              <div
                className="alter"
                onClick={() => handleQuantityChange(i, item.quantity - 1)}
              >
                -
              </div>

              <div
                className="remove"
                onClick={() => deleteItem(i, item.quantity - 1)}
              >
                <span class="material-symbols-outlined">delete</span>
              </div>
              <h4>Total: ${item.quantity * item.product.price}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
