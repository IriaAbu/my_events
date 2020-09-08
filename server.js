const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const http = require("http").createServer(app);
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", { dbName: "my_events" });
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;
const UserSchema = new Schema({ facebookId: Number });
UserSchema.plugin(findOrCreate);
const User = mongoose.model("User", UserSchema);
const sha1 = require("sha1");
// const ImportFacebook = require("./src/components/ImportFacebook");

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "2375336189440539",
      clientSecret: "24755da12be7b42d866cb87efce9a0c9",
      callbackURL: "http://localhost:42069/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.cookie("session", sha1(req.user.facebookId + "my_events_token"));
    res.redirect("/");
  }
);

app.use(
  "/json",
  createProxyMiddleware({
    target: "http://api.eventful.com/",
    changeOrigin: true,
  })
);

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

http.listen(42069, function () {
  console.log("listening on *:" + 42069);
});
