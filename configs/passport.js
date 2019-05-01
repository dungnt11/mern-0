var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
let User = mongoose.model("users");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretJWT;
module.exports = passport => {
  return passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, jwt_payload);
          }
          return done(null, false);
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
