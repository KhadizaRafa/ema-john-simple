import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
    Link
  } from "react-router-dom";


const Product = (props) => {
    // console.log(props);
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className="product-display">
            <div className="product-img">
                <img src={img}/>
            </div>
            <div className="product-details">
                <h5><Link to={"/product/"+key}>{name} </Link></h5>
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p>Only {stock} left in stock- Order soon </p>
                { props.handleClick &&
                    <button className="main-btn" onClick={
                        ()=>{
                            props.handleClick(props.product)
                        }
                    }><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;