const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorPostEdu = data => {
  let err = {};
  // check feild is not null
  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.feildOfStudy = !isEmpty(data.feildOfStudy) ? data.feildOfStudy : "";

  if (validator.isEmpty(data.school)) {
    err.school = "School feild is required !";
  }
  if (validator.isEmpty(data.degree)) {
    err.degree = "Degree feild is required !";
  }
  if (validator.isEmpty(data.feildOfStudy)) {
    err.feildOfStudy = "Feild of study feild is required !";
  }
  if (validator.isEmpty(data.from)) {
    err.from = "From is required !";
  }

  return {
    err,
    isValid: isEmpty(err) // is valid: co gia tri
  };
};
