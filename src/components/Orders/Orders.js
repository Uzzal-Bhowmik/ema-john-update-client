import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderItem from '../OrderItem/OrderItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const { products, storedCart } = useLoaderData(); // return { products, storedCart }

    // declare a state so that items can be deleted later
    const [cart, setCart] = useState(storedCart);

    const handleDeleteItem = (id) => {
        const rest = cart.filter(pd => pd.id !== id);
        setCart(rest);
        removeFromDb(id);
    }


    const handleClearCart = () => {
        if (window.confirm("Are you sure?")) {
            setCart([]);
            deleteShoppingCart();
        }
        else {
            return; // do nothing
        }
    }

    return (
        <div className='shop'>
            <div className='order-review' style={{
                display: "flex", justifyContent: "center", alignItems: "center", padding: "50px 0"
            }}>
                <div>
                    {
                        cart.map(pd => <OrderItem
                            key={pd.id}
                            orderedPd={pd}
                            handleDeleteItem={handleDeleteItem}
                        />)
                    }

                    {
                        cart.length === 0 && <h2 style={{ color: "#FF3030" }}>No items Found! Please
                            <Link to="/" style={{ marginLeft: "14px" }}>Shop Here</Link></h2>
                    }
                </div>
            </div>

            <OrderSummary cart={cart}>
                {
                    cart.length ? (
                        <div>
                            <button onClick={handleClearCart} className='clear-cart-btn'>Clear Cart</button>
                            <br />

                            <Link to="/place-order">
                                <button className='place-order-btn text-white'>
                                    Place Order
                                </button>
                            </Link>
                        </div>
                    ) :
                        ""
                }
            </OrderSummary>
        </div>
    );
};

export default Orders;