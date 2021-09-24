const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const { JWT_SECRET } = require("../../constant/token");
const userModel = require("../models/User");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
  secretOrKey: JWT_SECRET,
};

const strategy = new Strategy(option, async (payload, done) => {
  //callback
  try {
    const user = await userModel.findById(payload.sub);

    if (!user) return done(null, false);

    return done(null, user);
    console.log("ERROR above me!!!");
  } catch (err) {
    return done(err, false);
  }
});

passport.use(strategy);

module.exports = passport;
