import axios from "axios";
/**
 * @route POST api/user/login
 * @desc login api
 * @Access Private
 */
const loginApi = newUser => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user/login", newUser)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};


/**
 * @route POST api/user/register
 * @desc register 
 * @Access Private
 */
const registerApi = newUser => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user/register", newUser)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { loginApi, registerApi };
