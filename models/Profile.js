const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users'
  },
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String
  },
  Name: {
    type: String
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

module.exports = Profile = moongoose.model('profiles', ProfileSchema)