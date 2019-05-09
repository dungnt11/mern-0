const express = require("express");
const routerUser = express.Router();
const passport = require("passport");

const postAction = require("../../models/Post");
const valPost = require("../../validators/post");
const ProlifeSchema = require("../../models/Prolife");

/**
 * route POST @api/posts
 * desc post
 * access Private
 */

routerUser.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { err, isValid } = valPost(req.body);
    if (!isValid) {
      // khong loi
      return res.status(400).json(err);
    }
    const newPost = new postAction({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    // create new post
    newPost.save().then(post => res.json(post));
  }
);

/**
 * route GET @api/posts
 * desc post
 * access Public
 */

routerUser.get("/", (req, res) => {
  postAction
    .find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ msg: "no profile" }));
});

/**
 * route GET @api/posts/:id_user
 * desc post by id
 * access Public
 */

routerUser.get("/:id", (req, res) => {
  postAction
    .findById(req.params.id)
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ msg: "no profile" }));
});

/**
 * route DELETE @api/posts/:id_user
 * desc delete by id
 * access Private
 */
routerUser.delete(
  "/:id_post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProlifeSchema.findOne({ user: req.user.id })
      .then(profile => {
        postAction.findById(req.params.id_post).then(post => {
          if (!post) {
            // check find post not undefined
            res.status(404).json({ msg: "cannot find post by id" });
          } else {
            if (post.user.toString() !== req.user.id) {
              // check user === id jwt
              return res
                .status(401)
                .json({ notauthorized: "User not Authorized" });
            } else {
              postAction
                .findOneAndRemove({ _id: req.params.id_post })
                .then(result => res.json({ msg: "success", result }));
            }
          }
        });
      })
      .catch(() => res.status(500).json({ msg: "Not found profile" }));
  }
);

/**
 * route POST like @api/posts/like/:id
 * desc like post
 * access Private
 */

routerUser.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProlifeSchema.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // tim xem user da like chua
          postAction.findById(req.params.id).then(post => {
            // neu da like
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadylike: "user already liked this post" });
            }
            // add id user to array
            post.likes.unshift({ user: req.user.id });
            //save
            post.save().then(like => res.json(like));
          });
        } else {
          res
            .status(401)
            .json({ msg: "You need update profile before like this" });
        }
      })
      .catch(() => res.status(404).json({ msg: "no profile" }));
  }
);

/**
 * route POST unlike @api/posts/like/:id
 * desc like post
 * access Private
 */
routerUser.delete(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProlifeSchema.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // tim xem user da like chua
          postAction.findById(req.params.id).then(post => {
            // neu da like
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              // add id user to array
              post.likes.shift({ user: req.user.id });
              //save
              post.save().then(like => res.json(like));
            } else {
              res.status(404).json({ unliked: "You are not like this post" });
            }
          });
        } else {
          res
            .status(401)
            .json({ msg: "You are not update profile and not like this post" });
        }
      })
      .catch(() => res.status(404).json({ msg: "no profile" }));
  }
);

/**
 * route POST comment @api/posts/comment/:id
 * desc comment post
 * access Private
 */
routerUser.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { err, isValid } = valPost(req.body);
    if (!isValid) {
      // khong loi
      return res.status(400).json(err);
    }
    postAction
      .findById(req.params.id)
      .then(post => {
        console.log(req.user);
        const newComment = {
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnofound: "no post found" }));
  }
);

/**
 * route DELETE comment @api/posts/comment/:id
 * desc comment post
 * access Private
 */
routerUser.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    postAction
      .findById(req.params.id)
      .then(result => {
        if (
          !result.comments.filter(e => e.user.toString() === req.user.id).length
        ) {
          let index = result.comments
            .map(e => e._id.toString())
            .indexOf(req.params.comment_id);

          result.comments.splice(index, 1);
          result
            .save()
            .then(cmt => res.json(cmt))
            .catch(() => res.json({ msg: "cannot delete comment" }));
        } else {
          res.status(404).json({ msg: "You are not delete comment" });
        }
      })
      .catch(() => res.status(404).json({ msg: "Null id post" }));
  }
);
module.exports = routerUser;
