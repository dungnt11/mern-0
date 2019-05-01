const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorRegister = data => {
  let err = {};

  // check name 2 ~ 30 ki tu
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    err.name = "Name must be beetwen 2 and 30 characters";
  }

  return {
    err,
    isValid: isEmpty(err) // is valid: co gia tri
  };
};
