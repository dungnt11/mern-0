import axios from "axios";
/**
 * @route POST api/user/login
 * @desc login api
 * @Private
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

export { loginApi };
