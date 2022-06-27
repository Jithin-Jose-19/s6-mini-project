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

UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createHttpError.InternalServerError(error.message);
  }
};

const uploadedCode = mongoose.model('uploadedCode',UploadedCodeSchema);
module.exports = uploadedCode;