const router = require("express").Router();
const express = require("express")
const path = require("path")
const app = express()

router.get('/upload-code', (req, res, next) => {
    res.render('uploadCode');
});
router.post('/uploadCodeFile', (req, res, next) => {
 let result=JSON.stringify(req.body.code);
 console.log(result);
    res.render('uploadCode');
});
module.exports = router;