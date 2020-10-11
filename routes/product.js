const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const getExcelData = require('../utils/getExcelData');

const multer  = require('multer');
const path = require('path');

// MULTER CONFIG
const uploadDirectory = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory)
    },
    filename: function (req, file, cb) {
      
      cb(null, file.fieldname + '.xlsx');
    }
  });
const upload = multer({ storage: storage })
// END MULTER CONFIG

const router = express.Router();

const { ensureAuthenticated } = require('../middleware/auth');



router.get('/',  async (req, res) => {
    try {
        const products = await Product.find({}).lean();
        res.send(products);
    } catch (err) {
        console.error(err);
        res.render('index');
    }
});

router.post('/addProduct', ensureAuthenticated, async (req, res) => {
    try {
        const {name, price, condition, description } = req.body;
        let productCondition;
        const productOwner = await User.findById(req.user.id);
        console.log('addproduct hit')
        console.log(req.user)
     
  

        if(!productOwner) {
            
            res.redirect('http://localhost:3000/users/login')
        } else {
            if(condition === 'isNew') {
                productCondition = true;
            } else {
                productCondition= false;
            }
            await Product.create({name, price, new:productCondition, description, user:productOwner});
            console.log('product created')
            res.redirect('http://localhost:3000/');
        }
    } catch (err) {
        console.error(err);
        res.render('index');
    }
});

router.post('/addMany', [ensureAuthenticated, upload.single('excel')], async(req, res) => {
    try {
        console.log('addManyHitted!')
        let user = await User.findById(req.user.id);
        console.log(user);
        if(!user) {
            res.redirect(`http://localhost:3000/users/login`);
        } else {
            // If there is no file
            console.log(req.file);
            if(!req.file) {
               console.log('no file');
                res.redirect(`http://localhost:3000/products/addMany`);
                
            } else {
                if(req.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                   
                    res.redirect(`http://localhost:3000/products/addMany`);
                } else {
                    const products = await getExcelData(uploadDirectory, req.file.filename);
                    for(item of products){
                        let productCondition;
                        if(item.condition === 'isNew') {
                            productCondition = true;
                        } else {
                            productCondition= false;
                        }
                        await Product.create({name:item.name, price:item.price, new:productCondition, description:item.description, user});
                    }
                  
                    res.redirect(`http://localhost:3000/`);
                }
            }
        }
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
})

router.get('/favorites', ensureAuthenticated,  async(req, res) => {
    console.log('favorites hitted!');
    
    try {
        const user = await User.findById(req.user.id).lean();
       
     
  

        if(!user) {
            res.redirect('http://localhost:3000/users/login')
        } else {
            res.send(user.favoriteProducts);
        }
        
    } catch (err) {
        console.error(err);
        res.render('index');
    }
 
});

// router.get('/editProduct/:productId', ensureAuthenticated, (req, res) => {
//     res.render('index');
// });

// router.post('/editProduct/:productId', ensureAuthenticated, async (req, res) => {
//     try {
//         let product = await Product.findById(req.params.productId);

//         if(!product) {
//             // 404
//             res.render('index');
//         } 
        
//         if(product.user != req.user.id) {
//             // User id doesnt match product owner
//             res.render('index');
//         }
        
//         else {
//             product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
//                 new: true,
//                 runValidators: true
//             });
//         }
        
//     } catch (err) {
//         console.error(err);
//         res.render('index');
//     }
// });

// router.post('/:productId/favorite', ensureAuthenticated, async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.productId);
//         if(!product) {
//             console.error('404 product not found');
//             res.render('index');
//         } else {
//             const user = await User.findById(req.user.id);
//             user.favoritesProducts.push(product);
//             await user.save();
//             console.log(user);
//         }
        
//     } catch (err) {
//         console.error(err);
//         res.render('index');
//     }
// });

router.delete('/:productId', ensureAuthenticated, async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if(product.user != req.user.id) {
            res.render('index');
        }  else {
            await product.remove();
           res.render('index');
        }
    } catch (err) {
        console.error(err);
        res.render('/error/500');
    }
});

router.get('/:productId', async(req, res) => {
    const product = await Product.findById(req.params.productId).populate('user').lean();
    res.send(product)
})




module.exports = router;