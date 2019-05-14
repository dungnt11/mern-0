const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const passport = require("passport");

const user = require("./routes/apis/user");
const profile = require("./routes/apis/profile");
const posts = require("./routes/apis/posts");

//connect mlab database
const connect = require("./database/index.mongoose");
connect();

//using json for body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//passport midderware
app.use(passport.initialize());

//config passport
require("./configs/passport")(passport);

//config router
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// setup public folder
app.use(express.static(path.join(__dirname, "/public")));

// create server on port
app.listen(port, () => console.log(`server is running on port ${port}`));
