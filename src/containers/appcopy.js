import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Products from '../components/Products/Products'
import AddProduct from '../components/addProduct/AddProduct';

import FavoriteProducts from '../components/FavoriteProducts/FavoriteProducts';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import SearchForm from '../components/SearchForm/SearchForm';
import FullProduct from '../components/FullProduct/FullProduct';

import './App.css';


class App extends Component {

  state = {
    products: [],
}



  componentDidMount() {
    axios.get(`http://localhost:4000/products`)
         .then(response => {
            // console.log(response.data);
            // console.log(this.state.queries);
             this.setState({products: response.data})
            
         });
}

  


  

  render() {

    let products = null;
    let search = (
      <SearchForm products={this.state.products}></SearchForm>
    )

    if(this.state.products.length >= 0) {
      products = ( 
        <Products products={this.state.products} />
      );
    }

    return (
      <BrowserRouter>
        <div className="App">
        <Navbar></Navbar>
        
        <Route path="/" exact render={() => search}/> 
        <Route path="/" exact render={() => products}/>
        <Route path="/users/login" exact component={LoginForm}/>
        <Route path="/users/register" exact component={RegisterForm}/>
        <Route path="/products/favorites" exact component={FavoriteProducts}/>
        <Route path="/products/addProduct" exact component={AddProduct}/>
        <Route path="/fullProduct/:id" component={FullProduct}/>
       
        
     
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
