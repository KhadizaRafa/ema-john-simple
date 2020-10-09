import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import funnyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Order = () => {

    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const newCart = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product;
        })
        setCart(newCart)
    },[])

    const handleRemoveButton = (key) =>{
        removeFromDatabaseCart(key);
        const reducedCart = cart.filter(pd => pd.key !== key);
        setCart(reducedCart);
    }
    
    const handleProceedCheckout = () =>{
        // processOrder();
        // setOrderPlaced(true);
        // setCart([]);
        history.push('/shipment')

    }
    let thankYou = orderPlaced ? <img src={funnyImage}/> : null;

    return (
        <div  className="shop-container">
            <div className="product-container">
            { 
                cart.map( pd => <ReviewItems product={pd} key={pd.key} handleRemoveButton={handleRemoveButton}></ReviewItems>)
            }
            {
                thankYou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                   <button className="main-btn" onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>         
            </div>
            
        </div>
    );
};

export default Order;