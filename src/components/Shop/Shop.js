import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product'
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import {
    Link
  } from "react-router-dom";


  

const Shop = () => {
    const faketenData = fakeData.slice(0,10);
    const [products , setProducts]=useState(faketenData);
    const [cart,setCart] = useState([])

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const pdkeys = Object.keys(savedCart)
        const prevCart = pdkeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product;
        })
        setCart(prevCart)
    },[])

    const handleClick = (addedProduct)=>{
        const tobeAddedKey = addedProduct.key;
        const sameProduct = cart.find(pd => pd.key === tobeAddedKey)
        let count = 1;
        let newCart;
        if(sameProduct)
        {
            count =  sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== tobeAddedKey)
            newCart = [...others,sameProduct]
        }
        else{
            addedProduct.quantity =  count;
            newCart = [...cart,addedProduct]
        };
        setCart(newCart);
        addToDatabaseCart(addedProduct.key,count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product product={product} key={product.key} handleClick={handleClick}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order"><button className="main-btn">Review Order</button></Link>
                </Cart>         
            </div>
       
        </div>
    );
};

export default Shop;