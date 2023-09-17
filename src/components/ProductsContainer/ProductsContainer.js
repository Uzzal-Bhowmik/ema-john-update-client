import React, { useEffect, useState } from 'react';
import "./ProductsContainer.css";
import Product from '../Product/Product';

const ProductsContainer = ({ products, handleAddToCart }) => {
    return (
        <div className='products-con'>
            {
                products.map(product => <Product
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                ></Product>)
            }
        </div>
    );
};

export default ProductsContainer;