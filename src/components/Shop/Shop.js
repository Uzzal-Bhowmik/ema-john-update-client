import React, { useEffect, useState } from 'react';
import "./Shop.css";
import ProductsContainer from '../ProductsContainer/ProductsContainer';
import OrderSummary from '../OrderSummary/OrderSummary';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const Shop = () => {

    // loading products data
    const products = useLoaderData();

    // get the local storage data
    // useEffect is used since function loads data from local-storage/external source.
    useEffect(() => {
        const storedCartLS = getShoppingCart();
        let addedProduct;
        let newStoredCartLS = [];

        for (const id in storedCartLS) {

            addedProduct = products.find(pd => pd.id === id);

            if (addedProduct) {
                addedProduct.quantity = storedCartLS[id];
                newStoredCartLS.push(addedProduct); // added pd obj with new quantity value
            }

        }

        setCart(newStoredCartLS);

    }, [products]) // as the dependency is products which loads only on the reload so this new cart with LS data gets set every-time the page reloads.



    // contains products added to cart 
    const [cart, setCart] = useState([]);

    // event handler for add to cart
    const handleAddToCart = (product) => {

        //updating cart onClick with preValue and adding new value
        if (cart.length) {
            let flag;
            for (const pd of cart) {
                flag = "not matched";
                if (pd.id === product.id) {
                    flag = "matched";
                    // finding other products other than the matching one
                    const rest = cart.filter(pd => pd.id !== product.id)
                    pd.quantity += 1;
                    setCart([...rest, pd]); // updating quantity of the same product, not adding it as a new one;
                    break;
                }
            }

            if (flag === "not matched") {
                // adding product as a new one
                product.quantity = 1;
                setCart([...cart, product]);

            }
        }
        else {
            product.quantity = 1;
            setCart([product]);
        }

        //adding or updating cart in local storage
        addToDb(product.id);
    }

    const navigate = useNavigate();
    const handleReviewOrder = () => {
        navigate("/orders");
    }

    return (
        <div className='shop'>
            {/* Left Part */}
            <ProductsContainer handleAddToCart={handleAddToCart} products={products}></ProductsContainer>


            {/* right part */}
            <OrderSummary cart={cart}>
                <button className='review-order-btn' onClick={handleReviewOrder}>
                    Review Order
                </button>
            </OrderSummary>
        </div>
    );
};

export default Shop;