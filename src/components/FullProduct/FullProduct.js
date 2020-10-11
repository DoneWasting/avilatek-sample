import React,{Component} from 'react';
import axios from 'axios';
class FullProduct extends Component {
    state ={
        product: {}
    }

    componentDidMount() {
        console.log(this.props);
        if(this.props.match.params.id) {
            axios.get(`http://localhost:4000/fullProduct/${this.props.match.params.id}`)
            .then(response => {
                console.log(response.data);
                this.setState({product: response.data});
             
       }).catch( (error) => {
           console.log('---------');
           
         });
        } 
      
    }
        

    render(){

        let product = null;
        if(this.state.product.name) {
            product = (
                <div>
                    <h2>{this.state.product.name}</h2>
                    <p>{this.state.product.price}$</p>
                    <p>{this.state.product.description}</p>
                </div>
            )
        }
        return(
            <div>   
                  {product}
            </div>
              
            
        )
    }
}

export default FullProduct;