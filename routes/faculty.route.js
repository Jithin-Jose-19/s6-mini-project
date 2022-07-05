const router = require("express").Router();
router.get("/home", (req, res, next) => {
    res.render("facultyhome");
  })
module.exports = router;
