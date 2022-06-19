const router = require("express").Router();

router.get('/upload-code', (req, res, next) => {
    res.render('uploadCode');
});


module.exports = router;