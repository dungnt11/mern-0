const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorPostExp = data => {
  let err = {};
  // check feild is not null
  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    err.title = "Title feild is required !";
  }
  if (validator.isEmpty(data.company)) {
    err.company = "Company feild is required !";
  }
  if (validator.isEmpty(data.from)) {
    err.from = "from feild is required !";
  }

  return {
    err,
    isValid: isEmpty(err) // is valid: co gia tri
  };
};
