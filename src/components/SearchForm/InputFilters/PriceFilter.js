import React from 'react';

const PriceFilter = (props) => {
    return (
        <div>
            
        <p>Price range</p>
        <input name="price-range" id="isNew"type="radio" value="isNew"></input>
        <label htmlFor="isNew">1+$</label>
        <input name="price-range" id="isUsed"type="radio" value="isUsed"></input>
        <label htmlFor="isUsed">10+$</label>
        <input name="price-range" id="isUsed"type="radio" value="isUsed"></input>
        <label htmlFor="isUsed">25+$</label>
        </div>
    )
}

export default PriceFilter;





    

