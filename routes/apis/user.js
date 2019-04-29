/**
 * @api/user
 */
const express = require("express");
const routerUser = express.Router();
const user = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
routerUser.post("/register", (req, res) => {
  user.findOne({ email: req.body.name }).then(us => {
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
      console.log(newUser);
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

module.exports = routerUser;
