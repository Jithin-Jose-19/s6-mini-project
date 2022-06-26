const router = require("express").Router();
router.get("/home", (req, res, next) => {
    res.render("faculty");
  })
module.exports = router;
