const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },
  author: {
    type: String
  },
  skillLevel: {
    type: [String]
  },
  cohort: {
    type: Number
  },
  title: {
    type: String
  },
  categories: {
    type: String
  },
  resourceLink: {
    type: String
  },
  resourceType: {
    type: String
  },
  date: {
    type: Date.now
  },
  lengthOfVideo: {
    type: Number
  },
  timeToComplete: {
    type: Number
  },
  rating: {
    type: Number
  }
});

module.exports = Profile = moongoose.model('profile', ProfileSchema)