import React from 'react';
import Test from './Test/Test';
const favoriteProducts = (props) =>   props.favoriteProducts.map(product => {
        return <Test key={product._id} name={product.name} /> 
    });
    



export default favoriteProducts;