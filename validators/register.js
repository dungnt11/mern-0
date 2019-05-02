const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validatorRegister = data => {
  let err = {
    name: [],
    email: [],
    pwd: [],
    pwd1: []
  };
  // check undefined
  if (
    (data.name === void 0 && err.name.push("Name is undefined")) ||
    (data.email === void 0 && err.name.push("Email is undefined")) ||
    (data.pwd === void 0 && err.pwd.push("Password is undefined")) ||
    (data.pwd1 === void 0 && err.pwd1.push("Password1 is undefined"))
  );
  else {
    // check name, email, pwd not null
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.pwd = !isEmpty(data.pwd) ? data.pwd : "";
    data.pwd1 = !isEmpty(data.pwd1) ? data.pwd1 : "";

    // check name 2 ~ 30 ki tu
    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
      if (data.name) {
        err.name.push("Name must be beetwen 2 and 30 characters");
      }
    }

    if (validator.isEmpty(data.name)) {
      err.name.push("Name feild is required !");
    }
    if (validator.isEmpty(data.email)) {
      err.email.push("Email feild is required !");
    }
    if (validator.isEmpty(data.pwd) || validator.isEmpty(data.pwd1)) {
      err.pwd.push("Password feild is required !");
    }
    // check pwd equal pwd1
    let comparePwd = data.pwd !== data.pwd1; // compare pwd and pwd1
    if (comparePwd) {
      err.pwd1.push("Password must match !");
    }

    // check password 6 ~ 30 ki tu
    if (!validator.isLength(data.pwd, { min: 6, max: 30 })) {
      if (data.name) {
        err.pwd.push("Password must be beetwen 6 and 30 characters");
      }
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
