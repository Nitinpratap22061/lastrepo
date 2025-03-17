const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/github", (req, res, next) => {
  const accessLevel = req.query.accessLevel || "public"; // Default to public repos
  
  // Store the access level in session to pass it through the auth flow
  req.session.accessLevel = accessLevel;
  
  // Dynamically set the scope based on the access level
  const scope = accessLevel === "public" ? ["user:email"] : ["user:email", "repo"];
  
  passport.authenticate("github", { scope })(req, res, next);
});

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const { user, token, accessToken } = req.user;
    const accessLevel = req.session.accessLevel || "public";
    
    if (user.isNewUser) {
      res.redirect(`/intro?token=${token}&accessToken=${accessToken}&accessLevel=${accessLevel}`);
    } else {
      res.redirect(`/dashboard?token=${token}&accessToken=${accessToken}&accessLevel=${accessLevel}`);
    }
  }
);

module.exports = router;
