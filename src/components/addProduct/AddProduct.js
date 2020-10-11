import React from 'react';

const AddProduct = () => {
    return (
        <div>
            <h4>Add a Product</h4>
        <form action="http://localhost:4000/products/addProduct" method="POST">
            <input type="text" placeholder="Enter product name" name="name" required></input>
            <input type="text" placeholder="Enter product price" name="price" required></input>
            <input type="text" placeholder="Enter product description" name="description"></input>
            <input name="condition" id="isNew"type="radio" value="isNew"></input>
            <label htmlFor="isNew">New</label>
            <input name="condition" id="isUsed"type="radio" value="isUsed"></input>
            <label htmlFor="isUsed">Used</label>
            <input type="submit"></input>

           
            </form>

  <h4>Add many products : Upload a excel file</h4> 
 
<form action="http://localhost:4000:/products/addMany" method="POST" encType="multipart/form-data">
    <div >
        <input type="file" name="excel"/>
    <input type="submit" value="Subir Archivo"></input>
    </div>
</form>
           
        </div>

       
    )
}

export default AddProduct;