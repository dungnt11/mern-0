const express = require("express");
const routerUser = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
mongoose.set("useFindAndModify", false);

// Model Schema
const ProlifeSchema = require("../../models/Prolife");
const User = require("../../models/user");
const validatorProfile = require("../../validators/profile");

// check profile api/profile
let checkValidatorProfile = (req, res, next) => {
  const { err, isValid } = validatorProfile(req.body);
  //validator request
  if (!isValid) {
    // khong loi
    return res.status(400).json(err);
  }
  next();
};

/**
 * @route   GET api/prolife
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
      .populate("user", ["name", "avatar"])
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

/**
 * @route   POST api/prolife
 * @desc    Create or Edit prolife user
 * @access  Private
 */

routerUser.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkValidatorProfile,
  (req, res) => {
    let err = {};
    let profileFeild = {};
    profileFeild.user = req.user.id;
    if (req.body.handle) profileFeild.handle = req.body.handle;
    if (req.body.company) profileFeild.company = req.body.company;
    if (req.body.website) profileFeild.website = req.body.website;
    if (req.body.location) profileFeild.location = req.body.location;
    if (req.body.status) profileFeild.status = req.body.status;
    if (req.body.bio) profileFeild.bio = req.body.bio;
    if (req.body.githubUsername)
      profileFeild.githubUsername = req.body.githubUsername;

    // check skill
    if (typeof req.body.skills !== "undefined") {
      profileFeild.skills = req.body.skills.split(",");
    }

    profileFeild.social = {};
    if (req.body.youtube) profileFeild.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFeild.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFeild.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFeild.social.instagram = req.body.instagram;

    // find by id and update
    ProlifeSchema.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update profile
        ProlifeSchema.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFeild },
          { new: true } // new: true return new data rather than  the origin
        ).then(profile => res.status(200).json(profile));
      } else {
        // create profile
        ProlifeSchema.findOne({ handle: profileFeild.handle }).then(profile => {
          if (profile) {
            err.handle = "That handle already exist !";
            res.status(400).json(err);
          }

          new ProlifeSchema(profileFeild)
            .save()
            .then(profile => res.status(200).json(profile));
        });
      }
    });
  }
);

module.exports = routerUser;
