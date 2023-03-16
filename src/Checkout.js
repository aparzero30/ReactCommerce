import "./Checkout.css";
import { useState, useEffect } from "react";

function Checkout() {
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    setDivWidth("150vw");
    setDivHeight("150vh");

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }, []);

  return (
    <div
      className="checkout"
      style={{ width: divWidth, height: divHeight }}
    ></div>
  );
}

export default Checkout;
