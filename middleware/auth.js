module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            console.log('auth passed!')
            return next();
        }
       
        console.log('auth failed');
       
        res.redirect('http://localhost:3000/users/login');
    }
}