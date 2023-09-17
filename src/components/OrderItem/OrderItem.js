import React from 'react';
import "./OrderItem.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const OrderItem = ({ orderedPd, handleDeleteItem }) => {
    const { id, name, img, price, quantity } = orderedPd;

    return (
        <div className='ordered-item'>
            <div className='item-img'>
                <img src={img} alt="" />
            </div>

            <div className='item-details'>
                <div>
                    <h5>{name}</h5>
                    <p>Price: ${price}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            </div>
            <div className="item-delete-btn">
                <button onClick={() => handleDeleteItem(id)}><FontAwesomeIcon icon={faTrashCan} size="2xl" style={{ color: "rgb(235, 87, 87)" }} /></button>
            </div>
        </div>
    );
};

export default OrderItem;