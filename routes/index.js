const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User'); 
const {ensureAuthenticated} = require('../middleware/auth');

const router = express.Router();

router.get('/search', async (req, res) => {
    try {
        let allProducts = await Product.find({});
        let products;
        let status;
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10,
            maxPrice: parseInt(req.query.maxPrice, 10) || 0,
            condition: req.query.condition || ''
        } 

        if(!req.query.product){
            console.log(pageOptions.condition);
            console.log(pageOptions.maxPrice)
            if(pageOptions.maxPrice > 1){
                console.log('---------------')
                console.log(pageOptions.condition);
                products = await Product.find({price: {$gte: pageOptions.maxPrice}});
                return res.send(products);
            } else if(pageOptions.condition !== '') {
                console.log('holaaa');
                if(pageOptions.condition === 'isNew') {
                    status = true;
                    products = await Product.find({new:status});
                    
                    return res.send(products);
                }  else {
                    status = false
                    products = await Product.find({new:status});
                    return res.send(products);
                }
            } else if (pageOptions.maxPrice > 1 && pageOptions.condition !== '') {
                if(pageOptions.condition === 'isNew') {
                    status = true;
                    products = await Product.find({price: {$gte: pageOptions.maxPrice}, new:status});
                    console.log(product);
                    return res.send(products);
                }  else {
                    status = false;
                    products = await Product.find({price: {$gte: pageOptions.maxPrice}, new:status});
                    return res.send(products);
                }
            } else {
                return res.send(allProducts);
            }
           
        }

       
        console.log(req.query);
        const regex = new RegExp(req.query.product);

        if(pageOptions.condition === '') {
            products = await Product.find({$text : { $search : regex}, price: {$gte: pageOptions.maxPrice}});
        } else {
            if(pageOptions.condition === 'isNew') {
                status = true;
            } else {
                status = false;
            }
            products = await Product.find({$text : { $search : regex}, price: {$gte: pageOptions.maxPrice} , new:status});
        }

      
        
       
        res.send(products);
    } catch (err) {
        console.error(err);
        res.redirect('http://localhost:3000/');
    }
})


router.get('/fullProduct/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('user').lean();
    res.send(product);
});

router.post('/fullProduct/:id/favorite', ensureAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log(product.name);
        if(!product) {
            console.error('404 product not found');
            res.redirect('http://localhost:3000/');
        } else {
            const user = await User.findById(req.user.id);
            console.log(user);
            await user.like(req.params.id);
            res.redirect('http://localhost:3000/');
        }
        
    } catch (err) {
        console.error(err);
        res.render('index');
    }


    
});


module.exports = router;