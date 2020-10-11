const mongoose = require('mongoose');
const User = require('./User');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true,
        lowercase:true
    },
    price: {
        type: Number,
        required:true,
    },
    new:{
        type: Boolean,
        required: true
    },
    description:{
        type: String,
        required:true,
        trim:true,
        lowercase:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }


}, {
    timestamps:true
});

productSchema.index({name:'text', description:'text'});


const Product = mongoose.model('Product', productSchema);




module.exports = Product;