import React from 'react';
import Product from './Product/Product';
const Products = (props) =>   props.products.map(product => {
        return <Product key={product._id} id={product._id} name={product.name} price={product.price} description={product.description} new={product.new} user={product.user.email} /> 
    });
    



export default Products;