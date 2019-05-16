const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorLogin = data => {
  let err = {};
  // check undefined
  if (
    (data.email === void 0 && (err.email = "Email is undefined")) ||
    (data.pwd === void 0 && (err.pwd = "Password is undefined"))
  );
  else {
    // check name, email, pwd not null
    data.email = !isEmpty(data.email) ? data.email : "";
    data.pwd = !isEmpty(data.pwd) ? data.pwd : "";

    if (validator.isEmpty(data.email)) {
      err.email = "Email feild is required !";
    }
    if (validator.isEmpty(data.pwd)) {
      err.pwd = "Password feild is required !";
    }
  }

  return {
    err,
    isValid: isEmpty(err) // is valid: co gia tri
  };
};
