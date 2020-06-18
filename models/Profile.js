const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },
  fName: {
    type: String
  },
  lName: {
    type: String
  },
  Name: {
    type: Number
  },
  City: {
    type: String
  },
  State: {
    type: String
  },
  Avatar: {
    type: String
  },
  githubUrl: {
    type: String
  },
  twitterUrl: {
    type: String
  },
  bio: {
    type: String
  }
});

module.exports = Profile = moongoose.model('profile', ProfileSchema)