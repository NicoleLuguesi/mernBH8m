const express = require('express');
const router = express.Router();

// route    POST api/users
// @desc    create new user
// @access  public
router.post('/', (req, res) => {
  res.json({body: req.body})
});

module.exports = router;

// validate the body
// must have email and password
// make sure it's a valid email
// min password 6 character