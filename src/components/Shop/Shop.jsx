import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://ema-john-server-4ysp.onrender.com/products?page=${currentPage}&limit=${productsPerPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    setIsLoading(true);
    const storedCart = getShoppingCart();
    const cartProductIds = Object.keys(storedCart);

    fetch("https://ema-john-server-4ysp.onrender.com/productsById", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cartProductIds),
    })
      .then((res) => res.json())
      .then((data) => {
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
          // step 2: get product from products state by using id
          const addedProduct = data.find((product) => product._id === id);
          if (addedProduct) {
            // step 3: add quantity
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step 4: add the added product to the saved cart
            savedCart.push(addedProduct);
          }
          // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);

        setIsLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    // cart.push(product); '
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  // paginationBar
  const { totalProducts } = useLoaderData();
  let pageNeeded;
  if (totalProducts != undefined) {
    pageNeeded = Math.ceil(totalProducts / productsPerPage);
  } else {
    pageNeeded = Math.ceil(76 / productsPerPage);
  }

  const pageNumbers = [...Array(pageNeeded).keys()];

  const options = [5, 10, 15, 20];

  return (
    <>
      <div className="shop-container">
        {isloading ? (
          <Spinner
            variant="warning"
            animation="border"
            className="d-block mx-auto mt-5"
          ></Spinner>
        ) : (
          <>
            <div className="products-container">
              {products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  handleAddToCart={handleAddToCart}
                ></Product>
              ))}
            </div>
          </>
        )}
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="proceed-link" to="/orders">
              <button className="btn-proceed">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>

      <div className="paginationBar mx-auto w-75">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`${currentPage === number ? "selected" : ""}`}
          >
            {number}
          </button>
        ))}

        <select
          name=""
          id=""
          onChange={(e) => {
            setProductsPerPage(e.target.value);
            setCurrentPage(0);
          }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
