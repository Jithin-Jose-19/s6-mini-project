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
  avgVivaMark : {
    type: String,
    lowercase: true,
    default : "0"
  },
  avgOutputMark : {
    type: String,
    lowercase: true,
    default : "0"
  },
  avgRecordSubmissionMark : {
    type: String,
    lowercase: true,
    default : "0"
  }
});

const Course = mongoose.model('course', CourseSchema);
module.exports = Course;