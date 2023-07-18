const User = require('../models/user')

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile/')
    }
    return res.render('sign-up',{
        title: 'Sign Up'
    })
}

module.exports.create = async function(req,res){
    try{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    }
    let user = await User.findOne({email: req.body.email})
        // if(err){console.log("Error in Finding the User"); return}
        if(!user){
            let user = await User.create(req.body, function(err,user){
                // if(err){
                //     console.log('Error in creating the user')
                //     return
                // }
                return res.redirect('/users/sign-in')
            })
        }else{
            return res.redirect('back')
        }
    }catch(err){
        console.log('Error',err)
    }
}

module.exports.createSession = function(req,res){
    return res.redirect('/')
}
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile/')
    }
    return res.render('sign-in',{
        title: "Sign-In"
    })
}

module.exports.signOut = function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect('/')
    })
}   

module.exports.profile = async function(req,res){
    try{
    let user = await User.findById(req.params.id)
        return res.render('user_profile',{
            title: 'User Profile Page',
            profile_user : user
        })
    }catch(err){
        console.log('Error',err)
    }
}
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
       let user = await User.findByIdAndUpdate(req.params.id)
        console.log(req.file)
        user.name = req.body.name
        user.email = req.body.email
         user.save()
         return res.redirect('back')
        }else{
        return res.status(401).send("Unauthorized")
    }
}
