const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

const configs = require('./configs');
const mongoURI = configs.mongoURL;

const mongoose = require('mongoose');
mongoose.connect(mongoURI,{ useNewUrlParser: true }, () => console.log('connected !')).then(() => console.log(`connect thanh cong`)).catch(err => console.log(err))
//using json for body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config router
const router = require("./routes");
app.use("/", router);
// setup public folder
app.use(express.static(path.join(__dirname, "/public")));

// create server on port
app.listen(port, () => console.log(`server is running on port ${port}`));
