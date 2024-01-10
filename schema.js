const mongoose = require('mongoose');

const miniCourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    default: true
  }
});


module.exports = {miniCourseSchema}