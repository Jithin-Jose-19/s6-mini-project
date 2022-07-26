const router = require("express").Router();
const Course = require("../models/course.model");
const Experiment = require("../models/experiment.model");
const UploadedCodeModel = require("../models/UploadedCode.model");
const User = require("../models/user.model");


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
  let testCase1 = "";
  let testCase2 = "";
  let testCase3 = "";
  let output1 = "";
  let output2 = "";
  let output3 = "";
  try {
    const docs = await Experiment.find({
      courseCode: req.query.courseCode,
    });
    docs.forEach((doc) => {
      doc["experiments"].forEach((exp) => {
        if (exp["experimentNumber"] == req.query.experimentNumber) {
          testCase1 = exp["testCase1"];
          testCase2 = exp["testCase2"];
          testCase3 = exp["testCase3"];

          output1 = exp["expectedOutput1"];
          output2 = exp["expectedOutput2"];
          output3 = exp["expectedOutput3"];
        }
      });
    });
  } catch (error) {}
  console.log("testCase1 : " + testCase1);
  console.log("testCase2 : " + testCase2);
  console.log("testCase3 : " + testCase3);

  console.log("Output1 : " + output1);
  console.log("Output2 : " + output2);
  console.log("Output3 : " + output3);

  res.render("facultyTestCaseInput", {
    courseCode: req.query.courseCode,
    expNum: req.query.experimentNumber,
    test1input: testCase1,
    test2input: testCase2,
    test3input: testCase3,
    test1Output: output1,
    test2Output: output2,
    test3Output: output3,
  });
});

router.post("/testcasesetup/updatetestcases", async (req, res, next) => {
  console.log(req.body);

  const response = await Experiment.updateOne(
    {
      courseCode: req.body["courseCode"],
      "experiments.experimentNumber": req.body["expNum"],
    },
    {
      "experiments.$.testCase1": req.body["tin1"],
      "experiments.$.expectedOutput1": req.body["tout1"],
      "experiments.$.testCase2": req.body["tin2"],
      "experiments.$.expectedOutput2": req.body["tout2"],
      "experiments.$.testCase3": req.body["tin3"],
      "experiments.$.expectedOutput3": req.body["tout3"],
    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully updated.");
      }
    }
  );
  res.render("/faculty/home");
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

router.get("/submitted-students", async (req, res, next) => {
  console.log("Batch : " + req.query.batchFrom);
  console.log("Class : " + req.query.class);
  console.log("Course Code : " + req.query.courseCode.split("-")[0]);
  console.log("Exp Num : " + req.query.expNum);

  try {
    const docs = await UploadedCodeModel.find({
      courseCode: req.query.courseCode.split("-")[0],
      experimentNumber: req.query.expNum,
      className: req.query.class,
      batchFrom: req.query.batchFrom,
    });

    docs.forEach((doc) => {
      console.log(doc);
    });
    res.render("submittedStudentsPage", { expStuds: docs });
  } catch (error) {
    console.log(error);
    res.render("submittedStudentsPage");
  }
});

router.get("/submitted-students/view-code", async (req, res, next) => {
  try {
    const doc = await UploadedCodeModel.findById(req.query.id);
    console.log(doc);
    res.render("viewCodePage", { codeDet: doc , success : '' });
  } catch (error) {
    console.log(error);
    res.render("viewCodePage",{success : ''});
  }
});

router.post(
  "/submitted-students/view-code/update-marks",
  async (req, res, next) => {
    console.log(req.body);

    await UploadedCodeModel.updateOne(
      { _id: req.body["programId"] },
      {
        vivaMark: req.body["vivaMark"],
        outputMark: req.body["outputMark"],
        recordSubmissionMark: req.body["recordSubmissionMark"],
      },
      async function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log("Marks updated succesfully!");
        }
        const doc2 = await UploadedCodeModel.findById(`${req.body["programId"]}`)
        res.render("viewCodePage",{codeDet : doc2 , success:'Mark updated successfully'});
      }
    );
  }
);

router.get("/home/report-download", async (req, res, next) => {
  console.log(req.query);
  try {
    let avgVivaMarks=0.0;
    let avgOutputMarks=0.0;
    let avgRecordSubmissionMarks=0.0;
    const course=await Experiment.find({courseCode:req.query.courseCode});
    const numOfExperiments=course[0]['experiments'].length;
    const students=await User.find({batchFrom:req.query.batchFrom,className:req.query.className});
    let report=[];
    students.forEach((student)=>{
      let studentDetails={};
      studentDetails.name=student.username;
      studentDetails.email=student.email;
      studentDetails.avgVivaMarks=0.0;
      studentDetails.avgOutputMarks=0.0;
      studentDetails.avgRecordSubmissionMarks=0.0;
      report.push(studentDetails);
    })
    const codes = await UploadedCodeModel.find({
      courseCode: req.query.courseCode,
      batchFrom: req.query.batchFrom,
      className: req.query.className,
    });

    
    report.forEach((student) => {
      codes.forEach((code) => {
        if(code['email']==student.email){
          let index=report.findIndex((stu=>stu.email==student.email))
          report[index].avgVivaMarks+=parseFloat(code['vivaMark']);
          report[index].avgOutputMarks+=parseFloat(code['outputMark']);
          report[index].avgRecordSubmissionMarks+=parseFloat(code['recordSubmissionMark']);
        }
      });
    });
    console.log(report);
   
  } catch (error) {}
});
module.exports = router;
