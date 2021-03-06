const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const passport = require("passport");

const user = require("./routes/apis/user");
const prolife = require("./routes/apis/prolife");
const posts = require("./routes/apis/posts");
const validatorRegister = require("./validators/register");

//connect mlab database
const connect = require("./database/index.mongoose");
connect();

/**
 *  @route: api/user/
 */
let checkValidatorMd = (req, res, next) => {
  const { err, isValid } = validatorRegister(req.body);
  //validator request
  if (!isValid) {
    // khong loi
    return res.status(400).json(err);
  }
  next();
};

//using json for body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//passport midderware
app.use(passport.initialize());

//config passport
require("./configs/passport")(passport);

//config router
app.use("/api/user", checkValidatorMd, user);
app.use("/api/prolife", prolife);
app.use("/api/posts", posts);

// setup public folder
app.use(express.static(path.join(__dirname, "/public")));

// create server on port
app.listen(port, () => console.log(`server is running on port ${port}`));
