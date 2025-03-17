const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/github", (req, res, next) => {
  const accessLevel = req.query.accessLevel || "public"; // Default to public repos

  // Dynamically set the scope based on the access level
  const scope = accessLevel === "public" ? ["user:email"] : ["user:email", "repo"];

  passport.authenticate("github", { scope })(req, res, next);
});

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    const { user, token, accessToken } = req.user;
    if (user.isNewUser) {
      res.redirect(`/intro?token=${token}&accessToken=${accessToken}`);
    } else {
      res.redirect(`/dashboard?token=${token}&accessToken=${accessToken}`);
    }
  }
);

module.exports = router;
