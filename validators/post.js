const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = valPost = data => {
  const err = {};
  data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    err.text = "Text is required";
  }

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    err.text = "Post must be beetwen 10 and 300 characters !";
  }
  return {
    err,
    isValid: isEmpty(err) // is valid: co gia tri
  };
};
