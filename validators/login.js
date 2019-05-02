const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorLogin = data => {
  let err = [];

  // check undefined
  if (data.email === void 0 || data.pwd === void 0) {
    err.push("Username or Password is undefined !");
  }
  // check name, email, pwd not null
  data.email = !isEmpty(data.email) ? data.email : "";
  data.pwd = !isEmpty(data.pwd) ? data.pwd : "";

  if (validator.isEmpty(data.email)) {
    err.push("Email feild is required !");
  }
  if (validator.isEmpty(data.pwd)) {
    err.push("Password feild is required !");
  }

  return {
    err,
    isValid: isEmpty(err) // is valid: co gia tri
  };
};
