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
import SearchForm2 from '../components/SearchForm/SearchForm2';
import FullProduct from '../components/FullProduct/FullProduct';
import arrayCompare from '../utils/arrayplay';
import './App.css';


class App extends Component {

  state = {
    products: [],
    queries: {
      product:'',
      page:0,
      limit:10,
      maxPrice:1,
      condition:''
  }
}




// Search input text change handler
handleChange = (event) => {

  const queries = {
  ...this.state.queries
  }
  // console.log(queries)

  queries.product = event.target.value;
  


  console.log(`httt://localhost4000/search?product=${this.state.queries.product}`);
  console.log(this.state.queries);
  this.setState({queries});
  console.log(this.state.queries);
}

getDataAfterClick = async () => {
  
}

// Radio price change handler
priceRangeHandle = (event) => {
  const queries = {
  ...this.state.queries
  }

  queries.maxPrice = event.target.value
  // console.log(queries);

  // console.log(event.target.value);

  this.setState({queries});
}

// Condition Radio change handler
conditionHandle = (event) => {
  const queries = {
  ...this.state.queries
  }

  queries.condition = event.target.value
  
  // console.log(event.target.value);

  this.setState({queries});
}

  componentDidMount() {
    axios.get(`http://localhost:4000/search?product=${this.state.queries.product}&maxPrice=${this.state.queries.maxPrice}`)
         .then(response => {
            // console.log(response.data);
            // console.log(this.state.queries);
             this.setState({products: response.data})
            
         });
}



  componentDidUpdate() {
    
    axios.get(`http://localhost:4000/search?product=${this.state.queries.product}&maxPrice=${this.state.queries.maxPrice}&condition=${this.state.queries.condition}`)
    .then(response => {
      // console.log(response.data);
      // console.log(this.state.queries);

      let nextIdArray = response.data.map(product => product._id);
      let currentIdArray = this.state.products.map(product => product._id)

      if(!arrayCompare(nextIdArray,currentIdArray)) {
        this.setState({products:response.data});
      }
     
    
       
    });
  }

  render() {

    let products = null;
    let search = (
      <SearchForm2 text={this.handleChange} price={this.priceRangeHandle} condition={this.conditionHandle}></SearchForm2>
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
