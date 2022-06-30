const router = require("express").Router();
const express = require("express");
const path = require("path");
const app = express();
const request = require("request");
const uploadedCodeModel = require("../models/UploadedCode.model");
const axios = require('axios').default;

router.get("", (req, res, next) => {
  res.render("studentHome");
});
router.get("/upload-code", (req, res, next) => {
  res.render("uploadCode");
});
router.post("/uploadCodeFile", (req, res, next) => {
  var code = req.body.code;
  //code=code.replace(/(\r\n|\n|\r)/gm,"");
  const ioMap = new Map([
    ["5 3", "8"],
    ["4 2", "6"],
    ["8 6", "14"],
  ]);
  var testCasePassed = [0,0,0];
  var i = 0;
  ioMap.forEach(function (value, key) {
    var program = {
      script: code,
      language: "c",
      stdin: key,
      versionIndex: "0",
      clientId: "10b08afe3f797dcd5f7df7af153f8b01",
      clientSecret:
        "383e2dfeefc95027783c6ec540d551b031d685d7f574132c110025efec5a407b",
    };
    
    axios.post('https://api.jdoodle.com/v1/execute',program).then(function (response){
      console.log(response.data['output']);
      if (response.data['output'] == value) {
        console.log("output : ",response.data['output']);
        console.log("Value : ",value);
       testCasePassed[i] = 1;
      }else 
      testCasePassed[i]=0;
      i++;
      const tMark=new Map([
        [0,"\u274c"],
        [1,"\u2705"],
      ])
      if(i==3){
      var testCaseResult = {
        t1: tMark.get(testCasePassed[0]),
        t2: tMark.get(testCasePassed[1]),
        t3: tMark.get(testCasePassed[2]),
      };
      
      console.log(testCaseResult);
      res.render("uploadCode", { testCaseResult: testCaseResult });
    }
    }).catch(function (error) {
      console.log(error);
    });
    
    
        
      }
     );
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
/*#include <stdio.h>
int main() {    

    int number1, number2, sum;
   
    scanf("%d %d", &number1, &number2);

    // calculating sum
    sum = number1 + number2;      
    
    printf("%d",sum);
    return 0;
}*/
