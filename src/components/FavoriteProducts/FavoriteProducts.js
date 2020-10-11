import React, {Component} from 'react';
import Tests from '../tests/Tests';
import axios from 'axios';




class FavoriteProducts extends Component {
    state = {
        favoriteProducts : [],
        loggedIn:false
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/favorites', {withCredentials:true})
             .then(response => {
                
                 this.setState({favoriteProducts: response.data, loggedIn:true});
              
        }).catch( (error) => {
            console.log('---------');
            this.setState({loggedIn: false});
          });
    }
        

    render() {

    
            let favoriteProducts = null;
            if(this.state.favoriteProducts.length > 0) {
                favoriteProducts = ( 
                  <Tests favoriteProducts={this.state.favoriteProducts} />
                );
              }
        

       

        return (
            <div>
                {favoriteProducts}
            </div>
        )
    }
};



export default FavoriteProducts;