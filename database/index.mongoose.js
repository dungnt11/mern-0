const configs = require("../configs");
const mongoURI = configs.mongoURL;

const mongoose = require("mongoose");
const connect = () => mongoose
.connect(mongoURI, { useNewUrlParser: true })
.then(() => console.log(`connect thanh cong`))
.catch(err => console.log(err));

module.exports = connect;