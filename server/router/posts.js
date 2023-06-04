const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { cloudinary } = require("../utils/cloudinary");

const User = require("../model/userSchema");
const Post = require("../model/Post");

// Create Post
router.post("/", async (req, res) => {
  const filStr = req.body.data;
  const { title, desc , username ,categories} = req.body.writeInfo;
  const uploadResponse = await cloudinary.uploader.upload(filStr, {
      upload_preset: "portfolio_projects",
  });

  console.log(uploadResponse);
  const photo = uploadResponse.secure_url;

  // console.log(req.body);
  const newPost = new Post({ title, desc, photo, username, categories });
  // console.log(newPost);

  try {
    const savedPost = await newPost.save();
    console.log(savedPost);
    res.status(201).json({ mess: savedPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message });
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post.username);
    console.log(req.body.data.username);
    if (post.username === req.body.data.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body.data,
          },
          { new: true }
        );

        console.log(updatedPost);
        res.status(201).json({ mess: updatedPost });
      } catch (error) {
        res.status(500).json({ err: error });
      }
    } else {
      console.log('yes');
      res.status(401).json({ err: "You can update only your post" });
    }
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(401).json({ err: "Post not found.." });
    }
    if (post.username === req.body.username) {
      try {
        await post.delete();

        res.status(201).json({ mess: "Post have been deleted.." });
      } catch (error) {
        res.status(500).json({ err: error });
      }
    } else {
      res.status(401).json({ err: "You can delete only your post" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error });
  }
});

// Get Post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    console.log(post);
    res.status(200).json( post );
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

// Get All Post

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;

    if (username) {
      posts = await Post.find({ username: username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
        posts = await Post.find();
    }

    res.status(200).json( posts );
  } catch (error) {
    res.status(400).json({ err: error });
  }
});

module.exports = router;
