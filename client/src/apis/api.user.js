import axios from "axios";
/**
 * route POST api/user/register
 * Private
 */
const postRegister = userRegister => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/user/register", JSON.parse(userRegister))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export { postRegister };
