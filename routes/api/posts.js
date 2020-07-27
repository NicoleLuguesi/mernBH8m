// Add Posts, comment, like

const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator")

const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");

// @route GET api/posts/test  
// @desc Test Route
// @access  Public

router.get("/test", (req, res) => {
  res.json({msg: "It worked!"})
});

// @route POST api/posts/
// @desc Create a new post
// @access  Private

// create the post route, authenticate the user and respond with the data they sent.

// authorize user
// accept post data
// if valid - how do we know if data is valid ? express- validator
// Post model -> post to Post model
// return the new Post

router.post(
  "/", 
  auth,
[
  check("author", "Valid author required").notEmpty(),
  check("skillLevel", "Need skill").notEmpty(),
  check("skillLevel", "Select from dropdown").isIn([
    "Beginner",
    "Intermediate",
    "Advanced",
    "Associate",
    "Junior",
    "Senior",
    "Lead",
  ]),
  check("title", "Need title").notEmpty(),
  check("summary", "Need summary").notEmpty(),
],
 (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()} );
    }
  return res.json(req.body);
  }
);

// @route GET one post by id
// GET all posts

// @route GET api/posts/
// @desc GET all post
// @access  Public

// get and return to request all posts

router.get('/', async (req, res)=>{
  // access DB with Post Model
  try {
  const posts = await Post.find({ deleted: false }).populate(
    "poster",
    "avatar name firstName"
  );
  // send data to requester
  res.json(posts);
} catch (error) {
  // if not, return 
  console.error(error);
  return res.status(500).json(error);
  }
});

// @route GET api/posts/:postId
// @desc  get a single post by the id
// @access  public
router.get('/:postId', async (req, res) => {
  // get a sinlge post and return to the requester
  try {
    // access data base via post model to get a single post
  const post = await Post.findById(req.params.postId);  
  if(!post) {
    return res.status(404).json({message:"post not found"})
  }
  //send it back to requester
  res.json(post)
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
})


// handle errors

//send it back to requester








module.exports = router;
