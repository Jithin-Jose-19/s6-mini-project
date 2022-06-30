const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');

const UploadedCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
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
});

const uploadedCodeModel = mongoose.model('uploadedCode',UploadedCodeSchema);
module.exports = uploadedCodeModel;