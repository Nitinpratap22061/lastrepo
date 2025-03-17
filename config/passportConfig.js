const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://lastrepo-6nm3.onrender.com/auth/github/callback",
      scope: ["user:email"], // Default scope (only public repos)
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          user = new User({
            githubId: profile.id,
            username: profile.username,
            name: profile.displayName,
            email: profile.emails?.[0]?.value || "",
            avatarUrl: profile.photos?.[0]?.value || "",
            isNewUser: true,
          });
          await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return done(null, { user, token, accessToken });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user,

 done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
