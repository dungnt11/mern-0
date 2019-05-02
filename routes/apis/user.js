const express = require("express");
const routerUser = express.Router();
const user = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

/**
 * @route GET api/user/register
 * @dect Register username and pwd
 * @access Public
 */
routerUser.post("/register", (req, res) => {
  user.findOne({ email: req.body.email }).then(us => {
    if (us) {
      res.status(400).json({
        msg: "Email already exists"
      });
    } else {
      // lay anh tu website bang email cho truoc
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // create new user
      const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd,
        avatar
      });
      //hash pwd
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.pwd, salt, function(err, hash) {
          if (err) throw err;
          newUser.pwd = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route GET api/user/login
 * @dect Login and return JWT - token
 * @access Public
 */
routerUser.post("/login", (req, res) => {
  const email = req.body.email;
  const pwd = req.body.pwd;
  //find user by email
  user.findOne({ email }).then(us => {
    // check user
    if (!us) {
      return res.status(404).json({ msg: "user email not found !" });
    }
    //check password
    bcrypt.compare(pwd, us.pwd).then(result => {
      if (result) {
        const payload = { id: us.id, name: us.name, avatar: us.avatar };
        jwt.sign(
          payload,
          process.env.secretJWT,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) res.status(500).json({ msg: "error create token" });
            else {
              res.status(200).json({
                success: true,
                token: "Bearer " + token
              });
            }
          }
        ); // expires : 1 hour
      } else {
        res.status(400).json({ msg: "password incorrect" });
      }
    });
  });
});

/**
 * @route GET api/user/current
 * @dect Return current user
 * @access Private
 */

routerUser.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.json({ msg: "success" });
  }
);

module.exports = routerUser;
