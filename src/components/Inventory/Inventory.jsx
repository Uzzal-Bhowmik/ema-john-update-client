import React, { useEffect, useState } from "react";
import Product from "../Product/Product";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`https://ema-john-server-4ysp.onrender.com/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div>
      <h2 style={{ marginLeft: "20px" }}>
        Available Products In The Inventory
      </h2>
      <div
        style={{
          width: "90%",
          marginTop: "50px",
          marginInline: "auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridRowGap: "40px",
        }}
      >
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
