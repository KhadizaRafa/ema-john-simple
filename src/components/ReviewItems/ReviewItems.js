import React from 'react';

const ReviewItems = (props) => {
    console.log(props)
    const {name,price,seller,quantity,key} = props.product;
    return (
        <div className="product-display">
            <div className="product-details">
                <h5>{name}</h5>
                <p>Price: {price}</p>
                <small>Sold by: {seller}</small>
                <p>Quantity: {quantity}</p>
                <button className="main-btn" onClick= {()=>props.handleRemoveButton(key)} >Remove</button>
            </div>
            
        </div>
    );
};

export default ReviewItems;