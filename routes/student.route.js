const router = require("express").Router();
const request = require("request");
const uploadedCodeModel = require("../models/uploadedCode.model");
const Course = require("../models/course.model");
const Experiment = require("../models/experiment.model");
const axios = require("axios").default;

router.get("", (req, res, next) => {
  res.render("studentHome");
});
router.get("/upload-code", (req, res, next) => {
  console.log(req.query);
  res.render("uploadCode", { obj: req.query  , success : ''});
});

router.get("/course-select", async (req, res, next) => {
  try {
    console.log(req.user);
    const docs = await Course.find({
      batchFrom: req.user.batchFrom,
      batchTo: req.user.batchTo,
      classes: `${req.user.className}`,
    });
    docs.forEach((doc) => {
      console.log(doc.courseCode + " - " + doc.courseName);
    });
    res.render("course-select", { docs });
  } catch (error) {
    next(error);
  }
});

router.post("/course-select", async (req, res, next) => {
  try {
    console.log(req.body);
    const doc = await Experiment.findOne({
      courseCode: `${req.body.category.trim()}`,
    });
    const doc2 = await Course.findOne({
      courseCode: `${req.body.category.trim()}`,
    });
    doc.experiments.forEach((experiment) => {
      console.log(experiment.experimentName);
    });
    res.render("student-experiment-select", {
      experiments: doc.experiments,
      selectedCourseCode: doc2.courseCode,
      selectedCourseName: doc2.courseName,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/uploadCodeFile", async(req, res, next) => {
  console.log(req.body);
  let obj = {};
  obj["experimentNumber"] = req.body.experimentNumber.trim();
  obj["courseCode"] = req.body.selectedCourse.trim();
  obj["code"] = req.body.code.trim();
  obj["language"] = req.body.language;
  obj["email"] = req.user.email;
  obj["batchFrom"] = req.user.batchFrom;
  obj["batchTo"] = req.user.batchTo;
  obj["className"] = req.user.className;
  console.log(obj);

  try {
   await Experiment.findOne(
      { courseCode: obj['courseCode']},
      function (err, doc) {
        if (err) {
          console.log(err);
        } else {
         
          const ioMap = new Map([
            [ doc["experiments"][parseInt(obj['experimentNumber'])-1]['testCase1'],  doc["experiments"][parseInt(obj['experimentNumber'])-1]['expectedOutput1']],
            [ doc["experiments"][parseInt(obj['experimentNumber'])-1]['testCase2'],  doc["experiments"][parseInt(obj['experimentNumber'])-1]['expectedOutput2']],
            [ doc["experiments"][parseInt(obj['experimentNumber'])-1]['testCase3'],  doc["experiments"][parseInt(obj['experimentNumber'])-1]['expectedOutput3']],
          ]);

          var code = req.body.code;
          
          var testCasePassed = [0, 0, 0];
          var i = 0;
          ioMap.forEach(function (value, key) {
            var program = {
              script: code,
              language: obj["language"],
              stdin: key,
              versionIndex: "0",
              clientId: "10b08afe3f797dcd5f7df7af153f8b01",
              clientSecret:
                "383e2dfeefc95027783c6ec540d551b031d685d7f574132c110025efec5a407b",
            };

            axios
              .post("https://api.jdoodle.com/v1/execute", program)
              .then(async function (response) {
                console.log(response.data["output"]);

                if (response.data["output"] == value) {
                  console.log("output : ", response.data["output"]);
                  console.log("Value : ", value);
                  testCasePassed[i] = 1;
                } else testCasePassed[i] = 0;
                i++;
                const tMark = new Map([
                  [0, "\u274c"],
                  [1, "\u2705"],
                ]);
                if (i == 3) {
                  var testCaseResult = {
                    t1: tMark.get(testCasePassed[0]),
                    t2: tMark.get(testCasePassed[1]),
                    t3: tMark.get(testCasePassed[2]),
                  };
                  if (
                    testCasePassed[0] == 1 &&
                    testCasePassed[1] == 1 &&
                    testCasePassed[2] == 1
                  ) {
                    const doc = await uploadedCodeModel.findOne({email : req.user.email , courseCode : obj["courseCode"] , experimentNumber : obj["experimentNumber"]})
                    if(!doc){
                      const codeObj = new uploadedCodeModel(obj);
                      codeObj.save();
                    }else{
                      await uploadedCodeModel.updateOne({email : req.user.email , courseCode : obj["courseCode"] , experimentNumber : obj["experimentNumber"]},
                      { batchFrom : obj["batchFrom"] , 
                        batchTo : obj["batchTo"] , 
                        className : obj["className"] , 
                        code : obj["code"] , 
                        language : obj["language"]})
                    }
                  }
                  console.log(testCaseResult);
                  let obj1 = {};
                  obj1["selectedCourse"] = req.body.selectedCourse.trim();
                  obj1["experimentNumber"] = req.body.experimentNumber.trim();
                  res.render("uploadCode", {
                    testCaseResult: testCaseResult,
                    obj: obj1,
                    success : 'Code submitted successfully'
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        }
      }
    );
  } catch (error) {}
});

//uploading code to database

// var uploadedCodeData = new uploadedCodeModel({
//   email: "19cs201@mgist.ac.in",
//   courseCode: "CST-301",
//   code: code,
//   language: "c",
//   experimentNumber: "1",
//   batchFrom: "2019",
//   batchTo: "2023",
//   className: "CSE",
// });

// uploadedCodeData.save((err, doc) => {
//   if (!err) {
//     req.flash("success", "Code uploaded successfully!");
//   } else console.log("Error during record insertion : " + err);
// });

module.exports = router;

//Trial Code
/*
#include <stdio.h>
int main() {    

    int number1, number2, sum;
   
    scanf("%d %d", &number1, &number2);

    // calculating sum
    sum = number1 + number2;      
    
    printf("%d",sum);
    return 0;
}
*/

// // C program for insertion sort
// #include <math.h>
// #include <stdio.h>

// /* Function to sort an array using insertion sort*/
// void insertionSort(int arr[], int n)
// {
//   int i, key, j;
//   for (i = 1; i < n; i++) {
//     key = arr[i];
//     j = i - 1;

//     /* Move elements of arr[0..i-1], that are
//     greater than key, to one position ahead
//     of their current position */
//     while (j >= 0 && arr[j] > key) {
//       arr[j + 1] = arr[j];
//       j = j - 1;
//     }
//     arr[j + 1] = key;
//   }
// }

// // A utility function to print an array of size n
// void printArray(int arr[], int n)
// {
//   int i;
//   for (i = 0; i < n; i++)
//     printf("%d ", arr[i]);
// }

// /* Driver program to test insertion sort */
// int main()
// {
//   int n=5, arr[10];
//   for(int i=0;i<n;i++){
//       scanf("%d",&arr[i]);
//   }
//   insertionSort(arr, n);
//   printArray(arr, n);
//   return 0;
// }
