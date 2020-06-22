const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const { check, validationResult } = require("express-validator");
const isEmpty = require("../../utils/isEmpty");
const auth = require("../../middleware/auth");

router.get("/", auth, (req, res) => {
  console.log(req.user);
  res.json({ message: "test route" });
});

//Basic post route. Expects an entire profile in JSON.
// @route		POST api/profiles
// @desc		create profile for logged in user
// @access	private
router.post(
  "/",
  auth,
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("githubUrl", "Valid URL Required").optional().isURL(),
    check("twitterUrl", "Valid URL Required").optional().isURL(),
  ],
  async (req, res) => {
    console.log("POST request received:");
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        fName,
        lName,
        name,
        city,
        state,
        githubUrl,
        twitterUrl,
        bio,
      } = req.body;
      const userId = req.user.id;

      // Build profile object
      const profileFields = {
        fName,
        lName,
        name,
      };
      profileFields.user = userId;
      if (bio) profileFields.bio = bio;
      if (city) profileFields.city = city;
      if (state) profileFields.state = state;

      //Build Social Object
      profileFields.social = {};
      if (githubUrl) profileFields.social.githubUrl = githubUrl;
      if (twitterUrl) profileFields.social.twitterUrl = twitterUrl;

      try {
        let profile = await Profile.findById(userId);

        if (!isEmpty(profile)) {
          //Update
          profile = await Profile.findByIdAndUpdate(
            userId,
            { $set: profileFields },
            { new: true }
          );
          return res.json(profile);
        }

        //Create

        profile = await Profile.create(profileFields);
        res.json(profile);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// @route  GET api/profile
// @desc    GET all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
});

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user'})
    }

    res.json(profile);

  }catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route		GET api/
// @desc		Get logged in users profile
// @access	Private

// @route		Get api/
// @desc		get all profiles - hacker 1.0 do not send down city and state 2.0 do not include logged in user in results - 1.0 projection 2.0 queries
// @access	Private

module.exports = router;