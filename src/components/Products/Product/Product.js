import React from 'react';
import './Product.css';
import {Link} from 'react-router-dom';

const Product = (props) => {
     let itemId = `http://localhost:4000/fullProduct/${props.id}/favorite`;
     let condition = '';
     
     if(props.new) {
        condition = 'Nuevo'
     } else {
         condition = 'Usado'
     }
        return (
          
            <div className="product">
            <h4>{props.name}</h4>
            <h5>{props.price}$</h5>
            <h6>{condition}</h6>
            <p>{props.description}</p>
     
            <p className="Author">creado por {props.user}</p>
            <Link to={{
                pathname: `/fullProduct/${props.id}`
            }}>Ver producto</Link>
            <form action={itemId} method="POST">
                <button type="submit">Like a Product!</button>
            </form>
       
            <hr></hr>
        </div>
       
            
        )
}


export default Product;