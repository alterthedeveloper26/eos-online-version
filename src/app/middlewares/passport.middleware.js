const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const { JWT_SECRET } = require("../../constant/token");
const userModel = require("../models/User");

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
    secretOrKey: JWT_SECRET,
  },
  async (payload, done) => {
    //callback
    try {
      const user = await userModel.findById(payload.sub);

      if (!user) return done(null, false);

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
);

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    try {
      const user = await userModel.findOne({ email });

      if (!user)
        return done(new Error(`This email hasn't been registered`), false);

      const isValid = await user.validateUser(password);

      if (!isValid) return done(new Error("Password is incorrect!!!"), false);

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
);

passport.use(strategy);
passport.use(localStrategy);

module.exports = passport;
