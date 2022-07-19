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
    experimentNumber : {type: String,lowercase: true,required : true},
    experimentName : {type: String,lowercase: true,required : true},
    experimentQuestion : {type: String,lowercase: true,required : true},
    testCase1 : {type: String,lowercase: true,default:"null",required : true},
    expectedOutput1 : {type: String,lowercase: true,default:"null",required : true},
    testCase2 : {type: String,lowercase: true,default:"null",required : true},
    expectedOutput2 : {type: String,lowercase: true,default:"null",required : true},
    testCase3 : {type: String,lowercase: true,default:"null",required : true},
    expectedOutput3 : {type: String,lowercase: true,default:"null",required : true},
    _id : false
  }],
});

const Experiment = mongoose.model('experiment', ExperimentSchema);
module.exports = Experiment;