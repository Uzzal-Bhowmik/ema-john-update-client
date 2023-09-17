import React from 'react';
import giphy from "../../images/giphy.gif";

const PlaceOrder = () => {
    return (
        <div style={{ height: "500px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={giphy} alt="" width="500px" />
        </div>
    );
};

export default PlaceOrder;