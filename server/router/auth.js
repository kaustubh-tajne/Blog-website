const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { cloudinary } = require("../utils/cloudinary");

const User = require('../model/userSchema');

router.get('/', (req,res) => {
    res.send("hello bro router");
})

// Registration
router.post('/register', async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const {username, email, password} = req.body;
    
        const isUserEmail = await User.findOne({email : email});
        const isUserUsername = await User.findOne({username:username});

        if (isUserEmail || isUserUsername) {
            return res.status(409).json( "User already exits");
        }

        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({username, email, password:hashedPass});
        const response = await newUser.save();

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json( error);
    }    
})

// Login
router.post('/login', async (req,res) => {
    try {
        const isUserEmail = await User.findOne({email : req.body.email});
        
        !isUserEmail && res.status(400).json({err: "Wrong Credentials"});
        console.log(isUserEmail);
        
        const validate = await bcrypt.compare(req.body.password, isUserEmail.password);
        console.log(req.body.password);
        console.log(isUserEmail.password);
        console.log(validate);
        
        !validate && res.status(400).json({err: "Wrong Credentials"});
       

        const {password , ...others} = isUserEmail._doc;
        console.log("other");
        console.log(others);
        res.status(200).json(others);
    } catch (error) {
        console.log(error);
        res.status(500).json({err: error});
    }
})

router.get('/logout', (req,res) => {
    res.send("hello logout");
})


module.exports = router;