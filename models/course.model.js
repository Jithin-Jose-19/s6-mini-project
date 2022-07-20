const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  batchFrom : {
    type: String,
    required: true,
    lowercase: true,
  },
  batchTo : {
    type: String,
    required: true,
    lowercase: true,
  },
  classes : {
    type: [String],
    required: true,
  },
  courseCode : {
    type: String,
    required: true,
    lowercase: true,
  },
  courseName : {
    type: String,
    lowercase: true,
    required : true,
  },
  attendanceTotalMarks : {
    type: String,
    lowercase: true,
    required : true,
  },
  ceTotalMarks : {
    type: String,
    lowercase: true,
    required : true,
  },
  caTotalMarks : {
    type: String,
    lowercase: true,
    required : true,
  },
  vivaTotalMarks : {
    type: String,
    lowercase: true,
    required : true,
  }
});

const Course = mongoose.model('course', CourseSchema);
module.exports = Course;