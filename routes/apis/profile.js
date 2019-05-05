const express = require("express");
const routerUser = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
mongoose.set("useFindAndModify", false);

// Model Schema
const ProlifeSchema = require("../../models/Prolife");
const User = require("../../models/user");
const validatorProfile = require("../../validators/profile");
const validatorPostExp = require("../../validators/experience");
const validatorPostEdu = require("../../validators/education");

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
// check validator profile/experience
let checkExpPost = (req, res, next) => {
  const { err, isValid } = validatorPostExp(req.body);
  //validator request
  if (!isValid) {
    // khong loi
    return res.status(400).json(err);
  }
  next();
};
// check validator profile/experience
let checkEduPost = (req, res, next) => {
  const { err, isValid } = validatorPostEdu(req.body);
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

/**
 * @route   GET api/prolife/handle/:handle
 * @desc    Get profile by handle
 * @access  Public
 */

routerUser.get("/handle/:handle", (req, res) => {
  const err = {};
  ProlifeSchema.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        err.noprofile = "not found frofile";
        res.status(404).json(err);
        return;
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   GET api/prolife/user/:user_id
 * @desc    Get profile by handle
 * @access  Public
 */

routerUser.get("/user/:user_id", (req, res) => {
  const err = {};
  ProlifeSchema.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        err.noprofile = "not found frofile";
        res.status(404).json(err);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   GET api/prolife/all
 * @desc    Get all profile
 * @access  Public
 */

routerUser.get("/all", (req, res) => {
  const err = {};
  ProlifeSchema.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        err.noprofile = "list profile is empty";
        res.status(404).json(err);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   POST api/profile/experience
 * @desc    Post experience
 * @access  Private
 */

routerUser.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  checkExpPost,
  (req, res) => {
    const err = {};
    ProlifeSchema.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        err.noprofile = "not found the profile";
        res.status(404).json(err);
      } else {
        let exp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        profile.experience.unshift(exp);
        profile.save().then(profile => res.json(profile));
      }
    });
  }
);
/**
 * @route   POST api/profile/education
 * @desc    Post education
 * @access  Private
 */

routerUser.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  checkEduPost,
  (req, res) => {
    const err = {};
    ProlifeSchema.findOne({ user: req.user.id }).then(profile => {
      if (!profile) {
        err.noprofile = "not found the profile";
        res.status(404).json(err);
      } else {
        let exp = {
          school: req.body.school,
          degree: req.body.degree,
          feildOfStudy: req.body.feildOfStudy,
          from: new Date(req.body.from).toString(),
          to: new Date(req.body.to).toString(),
          current: req.body.current,
          description: req.body.description
        };
        profile.education.unshift(exp);
        profile.save().then(profile => res.json(profile));
      }
    });
  }
);

/**
 * @route   DELETE api/profile/experience/:exp_id
 * @desc    Delete exprience from id
 * @access  Private
 */

routerUser.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const err = {};
    ProlifeSchema.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          err.noprofile = "not found profile";
          res.status(404).json(err);
        } else {
          // get index element by exp_id
          const removeIndex = profile.experience
            .map(e => e.id)
            .indexOf(req.body.exp_id);
          // remove
          profile.experience.splice(removeIndex, 1);
          // save
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @route   DELETE api/profile/education/:edu_id
 * @desc    Delete education from id
 * @access  Private
 */

routerUser.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const err = {};
    ProlifeSchema.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          err.noprofile = "not found profile";
          res.status(404).json(err);
        } else {
          // get index element by edu_id
          const removeIndex = profile.education
            .map(e => e.id)
            .indexOf(req.body.edu_id);
          // remove
          profile.education.splice(removeIndex, 1);
          // save
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @route   DELETE api/profile
 * @desc    Delete user and profile
 * @access  Private
 */

routerUser.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProlifeSchema.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = routerUser;
