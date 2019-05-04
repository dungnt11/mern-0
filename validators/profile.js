const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorProfile = data => {
  let err = {
    handle: [],
    status: [],
    skills: [],
    website: []
  };
  // check undefined
  if (
    (data.handle === void 0 && err.handle.push("handle is undefined")) ||
    (data.status === void 0 && err.status.push("status is undefined")) ||
    (data.skills === void 0 && err.skills.push("skills is undefined"))
  );
  else {
    // check name, email, pwd not null
    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
      err.handle.push("Handle needs to between 2 and 40 characters !");
    }

    if (validator.isEmpty(data.status)) {
      err.status.push("Status feild is required !");
    }

    if (validator.isEmpty(data.skills)) {
      err.skills.push("Skills feild is required !");
    }

    // check url is valid
    if (!isEmpty(data.website) && !validator.isURL(data.website)) {
      err.website.push("Not a valid URL !");
    }
    if (!isEmpty(data.youtube) && !validator.isURL(data.youtube)) {
      err.youtube.push("Not a valid URL !");
    }
    if (!isEmpty(data.twitter) && !validator.isURL(data.twitter)) {
      err.twitter.push("Not a valid URL !");
    }
    if (!isEmpty(data.facebook) && !validator.isURL(data.facebook)) {
      err.facebook.push("Not a valid URL !");
    }
    if (!isEmpty(data.instagram) && !validator.isURL(data.instagram)) {
      err.instagram.push("Not a valid URL !");
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
