const router = require("express").Router();
const express = require("express");
const path = require("path");
const app = express();
const request = require("request");

router.get("/upload-code", (req, res, next) => {
  res.render("uploadCode");
});

router.post("/upload-code", (req, res, next) => {
  let code = req.body.code;
  let program = {
    script: code,
    language: "c",
    stdin:"3 5",
    versionIndex: "0",
    clientId: "10b08afe3f797dcd5f7df7af153f8b01",
    clientSecret:
      "383e2dfeefc95027783c6ec540d551b031d685d7f574132c110025efec5a407b",
  };

  console.log(program);

  request(
    {
      url: "https://api.jdoodle.com/v1/execute",
      method: "POST",
      json: program,
    },
    (error, response, body) => {
      console.log("Error:", error);
      console.log("StatusCode:", response && response.statusCode);
      console.log("Body:", body);
    }
  );
  res.render("uploadCode");
});

module.exports = router;
