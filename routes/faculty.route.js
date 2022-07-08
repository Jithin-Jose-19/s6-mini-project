const router = require("express").Router();
const Course = require("../models/course.model");
const Experiment=require("../models/experiment.model");

router.get("/home", async (req, res, next) => {
  try {
    console.log(req.user);
    const docs = await Course.distinct("batchFrom");
    docs.forEach((doc) => {
      console.log(doc);
    });
    res.render("facultyhome", { batches: docs });
  } catch (error) {
    next(error);
  }
});
router.get("/testcasesetup", (req, res, next) => {
  res.render("facultyTestCaseInput");
});

router.post("/getClass",async(req,res,next)=>{
  try {
    var selectedBatchFrom=req.body['batch'].slice(0,4);
    var selectedBatchTo=req.body['batch'].slice(7,11);
    const docs = await Course.find({
      batchFrom:selectedBatchFrom,
      batchTo: selectedBatchTo,
    });
    docs.forEach((doc) => {
      console.log(doc);
    });
    res.json( docs);
  } catch (error) {
    next(error);
  }
});

router.post("/getCourses",async(req,res,next)=>{
  console.log(req.body)
  try {
    var selectedBatchFrom=req.body['batch'].slice(0,4);
    var selectedBatchTo=req.body['batch'].slice(7,11);
    var selectedClass=req.body['class'];
    const docs = await Course.find({
      batchFrom:selectedBatchFrom,
      batchTo: selectedBatchTo,
      classes:selectedClass
    });
    docs.forEach((doc) => {
      console.log(doc);
    });
    res.json( docs);
  } catch (error) {
    next(error);
  }
});

router.post("/getExperiments",async(req,res,next)=>{
  console.log(req.body)
  try {
    // var selectedBatchFrom=req.body['batch'].slice(0,4);
    // var selectedBatchTo=req.body['batch'].slice(7,11);
    // var selectedClass=req.body['class'];
    var selectedCourseCode=req.body['courseCode'].split('-')[0];
    const docs = await Experiment.find({
      courseCode:selectedCourseCode,
    });
    docs.forEach((doc) => {
      console.log(doc);
    });
    res.json(docs);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
