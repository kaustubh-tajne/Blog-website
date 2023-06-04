const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { cloudinary } = require("../utils/cloudinary");

const User = require('../model/userSchema');
const Post = require('../model/Post');

// Update
router.put('/:id', async (req,res) => {
    
    if (req.body.writeInfo.userId === req.params.id) {
        const filStr = req.body.data;
        const { username ,email, password} = req.body.writeInfo;
        const uploadResponse = await cloudinary.uploader.upload(filStr, {
            upload_preset: "portfolio_projects",
        });

        // console.log(uploadResponse);
        const profile = uploadResponse.secure_url;
        req.body.writeInfo.profile = profile;
        // console.log(req.body.writeInfo);

        if (req.body.writeInfo.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.writeInfo.password =await bcrypt.hash(req.body.writeInfo.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body.writeInfo
            },{new:true});

            res.status(202).json({mess: updatedUser});
        } catch (error) {
            res.status(500).json({err: "error"});
        } 
    }
    else {
        console.log("You can update only user account");
        res.status(401).json({"err":"You can update only user account"});
    }
})

// Delete
router.delete('/:id', async (req,res) => {
    console.log(req.body.userId);
    console.log(req.params.id);
    // return;
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({err: "User not found"});
            }

            try {
                const ans = await Post.deleteMany({username: user.username});
                console.log(ans);
                const deletedUser = await User.findByIdAndDelete(req.params.id);
    
                res.status(200).json({mess:deletedUser});
            } catch (error) {
                res.status(500).json({err: "error"});
            } 
        } catch (error) {
            res.status(500).json({"err":"Server Error"});
        }
        
    }
    else {
        res.status(401).json({"err":"You can delte only user account"});
    }
})

// Get User

router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;

        res.status(200).json({mess: others});
    } catch (error) {
        res.status(400).json({"err":"Wrong Credentials"});
    }
})

module.exports = router;