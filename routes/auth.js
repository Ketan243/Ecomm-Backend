const express = require('express')
const User = require('../model/User')
var router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerVal,loginVal} = require('../validation/val')

router.post('/register', async (req, res)=>{
    //Validation
    const {error} = registerVal(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Checking if user already exists
    const emailExist = await User.findOne({email:req.body.email});
    
    if(emailExist) return res.status(400).send('Email already exists'); 
    

    //Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //Adding new User
    const user = new User({
        fname:req.body.fname,
        lname:req.body.lname,
        phone:req.body.phone,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user:user._id});
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res)=>{
    //Validation
    const {error} = loginVal(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Checking if user already exists
    const user = await User.findOne({email:req.body.email});
    
    if(!user) return res.status(400).send('Email does not exists'); 

    //checking pass
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid Password');
    
    //Create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.SECRET_TOKEN)
    res.header('auth-token',token).send(token);

});

module.exports = router;