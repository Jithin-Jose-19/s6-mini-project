const router = require("express").Router();
const Course = require("../models/course.model");
const Experiment = require("../models/experiment.model");

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
router.get("/testcasesetup", async (req, res, next) => {
  console.log("Course Code :" + req.query.courseCode);
  console.log("Experiment Number : " + req.query.experimentNumber);
  let testCase1="";
  let testCase2="";
  let testCase3="";
  let output1="";
  let output2="";
  let output3="";
  try {
    const docs = await Experiment.find({
      courseCode: req.query.courseCode,
    });
    docs.forEach((doc) => {
      doc["experiments"].forEach((exp) => {
        if (exp["experimentNumber"] == req.query.experimentNumber) {
          testCase1=exp['testCase1'];
          testCase2=exp['testCase2'];
          testCase3=exp['testCase3'];

          output1=exp['expectedOutput1'];
          output2=exp['expectedOutput2'];
          output3=exp['expectedOutput3'];

        }
      });
    });
  } catch (error) {}
  console.log("testCase1 : "+testCase1);
  console.log("testCase2 : "+testCase2);
  console.log("testCase3 : "+testCase3);

  console.log("Output1 : "+output1);
  console.log("Output2 : "+output2);
  console.log("Output3 : "+output3);


  res.render("facultyTestCaseInput", { test1input:testCase1 ,test2input:testCase2,test3input:testCase3,test1Output:output1,test2Output:output2,test3Output:output3 });
});

router.post("/getClass", async (req, res, next) => {
  try {
    var selectedBatchFrom = req.body["batch"].slice(0, 4);
    var selectedBatchTo = req.body["batch"].slice(7, 11);
    const docs = await Course.find({
      batchFrom: selectedBatchFrom,
      batchTo: selectedBatchTo,
    });
    docs.forEach((doc) => {
      console.log(doc);
    });
    res.json(docs);
  } catch (error) {
    next(error);
  }
});

router.post("/getCourses", async (req, res, next) => {
  console.log(req.body);
  try {
    var selectedBatchFrom = req.body["batch"].slice(0, 4);
    var selectedBatchTo = req.body["batch"].slice(7, 11);
    var selectedClass = req.body["class"];
    const docs = await Course.find({
      batchFrom: selectedBatchFrom,
      batchTo: selectedBatchTo,
      classes: selectedClass,
    });
    docs.forEach((doc) => {
      console.log(doc);
    });
    res.json(docs);
  } catch (error) {
    next(error);
  }
});

router.post("/getExperiments", async (req, res, next) => {
  console.log(req.body);
  try {
    // var selectedBatchFrom=req.body['batch'].slice(0,4);
    // var selectedBatchTo=req.body['batch'].slice(7,11);
    // var selectedClass=req.body['class'];
    var selectedCourseCode = req.body["courseCode"].split("-")[0];
    const docs = await Experiment.find({
      courseCode: selectedCourseCode,
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
