import React from 'react';


const searchForm2 = (props) => {
    return (
        <div>
            <form>
                
                <input onChange={props.text} type="text" placeholder="Search a Product"></input>
                <p>Condition</p>
                <input onChange={props.condition}  name="condition" id="isNew"type="radio" value="isNew"></input>
                <label htmlFor="isNew">New</label>
                <input onChange={props.condition} name="condition" id="isUsed"type="radio" value="isUsed"></input>
                <label htmlFor="isUsed">Used</label>
                <p>Price range</p>
                <input onChange={props.price} name="maxPrice" id="isNew"type="radio" value="1"></input>
                <label htmlFor="isNew">1+$</label>
                <input onChange={props.price} name="maxPrice" id="isUsed"type="radio" value="10"></input>
                <label htmlFor="isUsed">10+$</label>
                <input onChange={props.price} name="maxPrice" id="isUsed"type="radio" value="25"></input>
                <label htmlFor="isUsed">25+$</label>


            </form>
        </div>
    )
}

export default searchForm2;