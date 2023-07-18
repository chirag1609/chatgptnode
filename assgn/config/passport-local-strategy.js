const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding the user --> Passport')
                return done(err)
            }
            if(!user || user.password != password){
                console.log('Invalid Username or Password')            
               // return done(null,false)
                return done(null,false,{ message: 'The user email entered is not with our records' })
            }
            return done(null,user)
        })
    }
))

//serialize the user to decide which key is to be present in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id)
    })
//deserialize to find out which user is there (to find which user from the key in cookies)
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Errror in finding the user --> Passport')
            return done(err)}
        return done(null,user)
    })
})


//send data signed in to current user to views and check if user is authenticated

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){ //check if user is sign-in
    return next();
    }
    //if user not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

module.exports = passport