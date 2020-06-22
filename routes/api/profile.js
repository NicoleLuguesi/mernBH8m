const express = require("express");
const Profile = require("../../models/Profile");
const router = express.Router();
const { check, validationResult } = require("express-validator");


const User = require('../../models/User');

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Profile route'));

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private

router.post('/', [
  // check('ref', 'users is required').not().isEmpty(),
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty()
 ],

async  (req, res) => {
//   const errors = validationResult(req);
//   if(!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//     }
const  {
  bio, 
  city,
  state,
  avatar,
  githubUrl,
  twitterUrl
} = req.body;

// Build profile object
const profileFields = {};
profileFields.user = req.user.id;
if(bio) profileFields.bio = bio;
if(city) profileFields.city = city;
if(state) profileFields.state = state;
if(avatar) profileFields.avatar = avatar;

//Build Social Object
profileFields.social = {}
if(githubUrl) profileFields.social.githubUrl = githubUrl;
if(twitterUrl) profileFields.twitterUrl = twitterUrl;

try {
  let profile = await Profile.findById({ user: req.user.id });

  if(profile) {
    // Update
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields},
      { new: true }
      );

      return res.json(profile);
  }

  // Create
  profile = new Profile(profileFields);

  await profile.save();
  res.json(profile);
  } catch(err) {
  console.error(err.message);
  res.status(500).send('Server Error');
   }
  }
);
  

module.exports = router;
