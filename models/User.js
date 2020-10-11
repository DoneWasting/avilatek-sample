const mongoose = require('mongoose');
const Product = require('./Product');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true,
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    favoriteProducts: {
        type: Array,
    }

}, {
    timestamps:true
});

userSchema.methods.like = async function(id)  {
    const product = await Product.findById(id);
    this.favoriteProducts.push(product);
    await this.save();

}


const User = mongoose.model('User', userSchema);


module.exports = User;