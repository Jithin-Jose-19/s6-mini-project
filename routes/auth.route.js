const router = require("express").Router(); 
const passport = require("passport");
const { ensureLoggedOut, ensureLoggedIn } = require("connect-ensure-login");


router.get(
  "/login",
  ensureLoggedOut({ redirectTo: "/" }),
  async (req, res, next) => {
    try{
        res.render("login");
    }catch(err){
        next(err);
    }
  }
);

router.post(
  "/login",
  ensureLoggedOut({ redirectTo: "/" }),
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

router.get(
  "/logout",
  ensureLoggedIn({ redirectTo: "/" }),
  async (req, res, next) => {
    req.logout((error)=>{
      console.log(error);
    });
    res.redirect("/");
  }
);

module.exports = router;
