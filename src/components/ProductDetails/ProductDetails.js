import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey)
    
    return (
       
        <div>
            <h1>Product Details</h1>
            <h2>Product Key:  {productKey} </h2>
            <Product product={product} key={product.key}></Product>
        </div>
    );
};

export default ProductDetails;