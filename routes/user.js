const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');



// Description Handle login form
// @Route POST/users/login
router.post('/login', (req, res, next) => {
    console.log('post sent');
    passport.authenticate('local', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect:'http://localhost:3000/users/login',
      
    })(req, res, next);
});

router.get('/all', async (req, res) => {
    const users = await User.find({}).lean();
    res.send(users);
})

router.get('/me', ensureAuthenticated, async (req, res) => {
    const user = await User.findById(req.user.id);
    // console.log(user.email);
    // console.log(req.user);
    res.send(user);
});

router.post('/register', async (req , res) => {
    try {
        const errors = [];
        const {email, password, password2} = req.body;
        // Validating data
        // Check If any input is not filled
        if(!email || !password || !password2) {
            errors.push({ msg: 'Please fill in all fields' });
        }
        // Check If passwords don't match
        if(password !== password2) {
            errors.push( { msg: 'Password do not match'});
        }
        // Check if password is at least 7 characters long
        if(password.length < 7) {
            errors.push( { msg: 'Password must be at least 7 characters long'});
        }

        if(errors.length > 0) {
            console.log(errors);
            res.render('register', {
                errors,
                email,
                password,
                password2
            });
        } else {
                
            //Validation passed
            let user = await User.findOne({ email: email});
            
            //If user already exists
            if(user) {
                errors.push({ msg: 'Email already registered'});
                
                res.render('register', {
                    errors,
                    email,
                    password,
                    password2
                });
            } else {
                // Creating new user
                
                const newUser = await User.create({ email, password, favoriteProducts: []});
                
                // Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, async (err, hash) => {
                        if(err) {
                            console.error(err);
                            res.render('error/500');
                        }
                        newUser.password = hash;
                        await newUser.save();
                        
                        res.redirect('/users/login');
                    });
                });

            }

        }
    }  catch (err) {
        console.log(err);
        res.render('error/500');
}

});

router.get('/logout', ensureAuthenticated, (req, res) => {
    console.log('logout hit');
    req.logout();
    res.redirect('/users/login');
} );

module.exports = router;