const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorRegister = data => {
  let err = [];

  // check name, email, pwd not null
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.pwd = !isEmpty(data.pwd) ? data.pwd : "";

  // check name 2 ~ 30 ki tu
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    if (data.name) {
      err.push("Name must be beetwen 2 and 30 characters");
    }
  }

  if (validator.isEmpty(data.name)) {
    err.push("Name feild is required !");
  }
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
