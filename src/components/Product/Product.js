import React from 'react';
import "./Product.css";
import cartIcon from '../../images/cart.png';

const Product = (props) => {
    const { img, name, price, seller, ratings } = props.product;
    const handleAddToCart = props.handleAddToCart;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <p id='title'>{name}</p>
            <p id='price'>Price: ${price}</p>

            <div className='seller-and-ratting'>
                <p>Manufacturer: {seller}</p>
                <p>Ratting: {ratings} stars</p>
            </div>

            <button id='addToCartBtn' onClick={() => handleAddToCart(props.product)}>
                <p>Add to Cart</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="cart-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>


            </button>
        </div>
    );
};

export default Product;