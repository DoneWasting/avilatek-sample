import React from 'react';

const InputFilters = (props) => {
    return (
        <div>
            

        <p>Condition</p>
        <input name="condition" id="isNew"type="radio" value="isNew"></input>
        <label htmlFor="isNew">New</label>
        <input name="condition" id="isUsed"type="radio" value="isUsed"></input>
        <label htmlFor="isUsed">Used</label>
      
        </div>
    )
}

export default InputFilters;