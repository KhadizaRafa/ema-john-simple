import React from 'react';


const Cart = (props) => {

    const cart = props.cart;
    let total = cart.reduce((total,pd)=>total+pd.price * pd.quantity,0)

    let shipping = 0;
    if(total > 15)
        shipping = 4.99;
    else if(total > 0)
        shipping = 12.99;
    else if(total > 35)
        shipping = 0;


    return (
        <div>
            <h4>Order Summary</h4>
            <p>Number of Items ordered: {cart.length} </p>
            <p><small>shipping cost ; $ {shipping}</small></p>
            <p>Product Price $ {total} </p>
            <p>Total ${total+shipping}</p>
            { 
                props.children
            }
            
        </div>
    );
};

export default Cart;