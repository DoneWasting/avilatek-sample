import React, {Component} from 'react';
import axios from 'axios';
class SearchForm extends Component {

    state = {
                queries: {
                    product:'',
                    page:0,
                    limit:10,
                    maxPrice:1,
                    condition:'isNew'
                }
   }

 

   handleChange = (event) => {

       const queries = {
           ...this.state.queries
       }
       console.log(queries)

       queries.product = event.target.value;
       console.log(queries);
       

       console.log(`httt://localhost4000/search?product=${this.state.queries.product}`);
       this.setState({queries});
       

   }

   priceRangeHandle = (event) => {
    const queries = {
        ...this.state.queries
    }

    queries.maxPrice = event.target.value
    console.log(queries);

    console.log(event.target.value);

    this.setState({queries});
   }

   conditionHandle = (event) => {
       const queries = {
           ...this.state.queries
       }

       queries.condition = event.target.value

       console.log(queries);

       console.log(event.target.value);

       this.setState({queries});
   }
    
   componentDidUpdate() {
         axios.get(`http://localhost4000/search?product=${this.state.queries.product}&maxPrice=${this.state.queries.maxPrice}`)
                 .then(response => {
                    console.log
                 })
        
        
    }
 
    render() {
        return (
            <div>
                <form>
                    
                    <input onChange={this.handleChange} type="text" placeholder="Search a Product"></input>
                    <p>Condition</p>
                    <input onChange={this.conditionHandle}  name="condition" id="isNew"type="radio" value="isNew"></input>
                    <label htmlFor="isNew">New</label>
                    <input onChange={this.conditionHandle} name="condition" id="isUsed"type="radio" value="isUsed"></input>
                    <label htmlFor="isUsed">Used</label>
                    <p>Price range</p>
                    <input onChange={this.priceRangeHandle} name="price-range" id="isNew"type="radio" value="1"></input>
                    <label htmlFor="isNew">1+$</label>
                    <input onChange={this.priceRangeHandle} name="price-range" id="isUsed"type="radio" value="10"></input>
                    <label htmlFor="isUsed">10+$</label>
                    <input onChange={this.priceRangeHandle} name="price-range" id="isUsed"type="radio" value="25"></input>
                    <label htmlFor="isUsed">25+$</label>
    
    
                </form>
            </div>
        )
    }

    
}

export default SearchForm;