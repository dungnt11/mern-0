const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorLogin = data => {
  let err = {
    email: [],
    pwd: []
  };
  // check undefined
  if (
    (data.email === void 0 && err.email.push("Email is undefined")) ||
    (data.pwd === void 0 && err.pwd.push("Password is undefined"))
  );
  else {
    // check name, email, pwd not null
    data.email = !isEmpty(data.email) ? data.email : "";
    data.pwd = !isEmpty(data.pwd) ? data.pwd : "";

    if (validator.isEmpty(data.email)) {
      err.email.push("Email feild is required !");
    }
    if (validator.isEmpty(data.pwd)) {
      err.pwd.push("Password feild is required !");
    }
  }

  // delete element empty in object err
  for (let keyOfErr of Object.keys(err)) {
    if (!err[keyOfErr].length) {
      delete err[keyOfErr];
    }
  }

  return {
    err,
    isValid: isEmpty(err) // is valid: co gia tri
  };
};
