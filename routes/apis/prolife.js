const express = require("express");
const routerUser = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Model Schema
const ProlifeSchema = require("../../models/Prolife");
const User = require("../../models/user");

/**
 * @route   api/prolife
 * @desc    Prolife user
 * @access  Public
 */

routerUser.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let err = {};
    // tim kiem profile theo id duoc cung cap boi jwt
    ProlifeSchema.findOne({ user: req.user.id })
      .then(prolife => {
        if (!prolife) {
          err.noprofile = "There is no prolife for this user";
          return res.status(404).json(err);
        }
        res.status(200).json(prolife);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = routerUser;
