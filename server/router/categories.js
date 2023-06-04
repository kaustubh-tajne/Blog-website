const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../model/userSchema");
const Post = require("../model/Post");
const Category = require('../model/Category');

// Create Categories

router.post('/', async (req,res) => {
    const newCat = new Category(req.body);
    try {
        const createCat = await newCat.save();

        res.status(201).json({mess: createCat});
    } catch (error) {
        res.status(400).json({err: error});
    }
})

// Get Categories

router.get('/', async (req,res) => {
    try {
        const categories = await Category.find();

        res.status(201).json(categories);
    } catch (error) {
        res.status(400).json({err: error});
    }
})

module.exports = router;
