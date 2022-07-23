const mongoose = require('mongoose');

const UploadedCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
 courseCode:{
    type:String,
    required:true,
    lowercase:true,
 },
 code : {
    type : String,
    required : true,
    lowercase : true
 },
 language : {
    type : String,
    required : true,
    lowercase : true
 },
 experimentNumber : {
    type:String,
    required:true,
    lowercase:true,
 },
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
  className : {
    type: String,
    lowercase: true,
  },
  vivaMark : {
    type: String,
    lowercase: true,
    default : "0"
  },
  outputMark : {
    type: String,
    lowercase: true,
    default : "0"
  },
  recordSubmissionMark : {
    type: String,
    lowercase: true,
    default : "0"
  }
});

const uploadedCodeModel = mongoose.model('uploadedCode',UploadedCodeSchema);
module.exports = uploadedCodeModel;