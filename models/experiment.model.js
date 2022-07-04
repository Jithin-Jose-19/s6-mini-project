const mongoose = require('mongoose');

const ExperimentSchema = new mongoose.Schema({
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
  experiments : [{
    experimentNumber : String,
    experimentName : String,
    experimentQuestion : String,
    testCase1 : String,
    expectedOutput1 : String,
    testCase2 : String,
    expectedOutput2 : String
  }]
});

const Experiment = mongoose.model('experiment', ExperimentSchema);
module.exports = Experiment;